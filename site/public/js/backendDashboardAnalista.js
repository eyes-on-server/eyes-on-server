// Configuração inicial da página
nome_do_usuario.innerHTML = sessionStorage.NOME_USER;
nome_da_empresa.innerHTML = sessionStorage.NOME_FANTASIA;

var atualizacao;

// Variáveis para receber os dados do gráfico
var valoresUsoCPU = [];
var valoresUsoDisco = [];
var valoresUsoMemoria = [];
var momentoDosRegistros = [];

// Variáveis para as recomendações
var resgitradoCPU = false;
var registradoDisco = false;
var registradoMemoria = false;

// Configuração dos selects de filtragem

function buscarSetores() {
  // Comando a ser realizado no banco de dados
  var query = `SELECT local_servidor, nome_fantasia FROM Servidor AS s JOIN Empresa AS e ON e.id_Empresa = ${sessionStorage.FK_EMPRESA};`;

  // Limpar as options quando a função limpar for acionada
  select_setores.innerHTML = `<option value="" selected disabled>Setores</option>`;

  fetch("/graficosAnalista/buscarInformacoes", {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify({
      selectServer: query,
    }),
  })
    .then(function (resposta) {
      if (resposta.status == 200) {
        var setores = [];
        resposta.json().then((json) => {
          // Esse for roda todo o json de resposta da query e insere o nome dos setores no select do HTML
          for (var i = 0; i < json.length; i++) {
            if (!setores.includes(json[i].local_servidor)) {
              var setor = json[i].local_servidor;
              select_setores.innerHTML += `<option value="${setor}">${setor}</option>`;
              setores.push(json[i].local_servidor);
            }
          }
        });
      } else {
        console.log(
          "Erro ao realizar a busca dos setores <function buscarSetores>"
        );
        resposta.text().then((texto) => {
          console.log(resposta);
        });
      }
    })
    .catch((erro) => {
      console.log("Erro ao realizar a busca: " + erro);
    });
}

function buscarServidores(valueSelectHTML) {
  // Comando a ser realizado no banco de dados
  var query = `SELECT id_servidor, nome_servidor FROM Servidor WHERE local_servidor = "${valueSelectHTML}";`;

  // Limpar as options quando trocar de setor
  select_servidores.innerHTML = `<option value="" selected disabled>Servidores</option>`;

  fetch("/graficosAnalista/buscarInformacoes", {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify({
      selectServer: query,
    }),
  })
    .then(function (resposta) {
      if (resposta.status == 200) {
        resposta.json().then((json) => {
          // Criamos um vetor para conferir se aquele servidor já foi inserido no HTML
          var servidores = [];
          // Esse for roda todo o json de resposta da query e insere o nome dos setores no select do HTML
          for (var i = 0; i < json.length; i++) {
            if (!servidores.includes(json[i].nome_servidor)) {
              var servidor = json[i].nome_servidor;
              var id_servidor = json[i].id_servidor;
              select_servidores.innerHTML += `<option value="${id_servidor}">${servidor}</option>`;
            }
          }
        });
      } else {
        console.log(
          "Erro ao realizar a busca dos servidores <function buscarServidores>"
        );
        resposta.text().then((texto) => {
          console.log(resposta);
        });
      }
    })
    .catch((erro) => {
      console.log("Erro ao realizar a busca: " + erro);
    });
}

function limparFiltros() {
  chartArea.innerHTML = ``;
  chartArea.innerHTML = `<canvas id="GraficoDeLinha"></canvas>`;
  buscarSetores();
  atualizarGraficoDeLinha();
  previsao.innerHTML = "";
  recomendacoesHTML.innerHTML = "";
  quantidadeDeAlertas.innerHTML = "";
  dadosAoVivoHTML.innerHTML = `
  <p id="aoVivoCPU">Uso da CPU: </p>
  <hr>
     <p id="aoVivoCPUfrequencia">Frequência da CPU: </p>
  <hr>
     <p id="aoVivoMemoria">Uso da memória: </p>
  <hr>
     <p id="aoVivoDisco">Uso do disco: </p>
  <hr>
     <p id="aoVivoRedeRecebidos">bytes recebidos: </p>
  <hr>
     <p id="aoVivoRedeEnviados">bytes enviados:</p>
  <hr>
  `;
  informacoesServidorHTML.innerHTML = `<p id="nomeServidor">Nome do servidor: </p>
  <hr>
     <p id="nomeSetor">Setor do servidor: </p>
  <hr>
     <p id="ipv6Servidor">IPV6 do servidor: </p>
  <hr>
     <p id="macAddressServidor">Mac address: </p>
  <hr>
     <p id="soServidor">Sistema operacional: </p>
  <hr>`;

  select_servidores.innerHTML = `<option value="null">Servidor</option>`;
}

function setarDados(id_servidor) {
  // Verificação para que o id_server não passe para outras funções como null
  if (id_servidor != "null") {
    if (atualizacao) {
      clearInterval(atualizacao);
    }

    // inserir set time out
    atualizacao = setInterval(() => {
      graficoDeLinha(id_servidor);
      console.log("atualizou");
    }, 5000);

    graficoDeLinha(id_servidor);
    dadosAoVivo(id_servidor);
    informacoesServidor(id_servidor);
  }
}

// Gráfico de linha
function graficoDeLinha(id_servidor) {
  // Limpar as recomendações
  recomendacoesHTML.innerHTML = `<p id="recomendacaoCPU"></p> <p id="recomendacaoDisco"></p> <p id="recomendacaoMemoria"></p>`;
  previsao.innerHTML = `<p id="previsaoCPU"></p><p id="previsaoDisco"></p><p id="previsaoMemoria"></p>`;

  var query = `
  SELECT nome_componente, nome_medida, valor_registro, momento_registro
	  FROM Registro as r
      JOIN Componente as C on c.id_componente = r.fk_componente
      JOIN Medida as m on m.id_medida = r.fk_medida
      WHERE fk_servidor = ${id_servidor} AND nome_medida = "PorcentagemUso"
      ORDER BY momento_registro DESC
      LIMIT 30;`;

  fetch("/graficosAnalista/buscarInformacoes", {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify({
      selectServer: query,
    }),
  })
    .then(function (resposta) {
      if (resposta.status == 200) {
        resposta.json().then((json) => {
          for (var i = 0; i < json.length; i++) {
            // Conversão do horário
            var horarioBrasileiro = converterHorario(json[i].momento_registro);
            // Verificação dos momento dos registros
            if (
              !momentoDosRegistros.includes(horarioBrasileiro) &&
              horarioBrasileiro != "Data e hora inválidas"
            ) {
              momentoDosRegistros.unshift(horarioBrasileiro);
            }

            if (json[i].nome_componente == "Cpu") {
              if (parseFloat(json[i].valor_registro) > 100.0) {
                var valorRegistro = 100;
                valoresUsoCPU.unshift(valorRegistro);
                recomendacoes(parseFloat(json[i].valor_registro), "CPU");
              } else {
                valoresUsoCPU.unshift(parseFloat(json[i].valor_registro));
                recomendacoes(parseFloat(json[i].valor_registro), "CPU");
              }
            }

            if (json[i].nome_componente == "Disco") {
              if (parseFloat(json[i].valor_registro) > 100.0) {
                var valorRegistro = 100;
                valoresUsoDisco.unshift(valorRegistro);
                recomendacoes(parseFloat(json[i].valor_registro), "Disco");
              } else {
                valoresUsoDisco.unshift(parseFloat(json[i].valor_registro));
                recomendacoes(parseFloat(json[i].valor_registro), "Disco");
              }
            }

            if (json[i].nome_componente == "Memoria") {
              if (parseFloat(json[i].valor_registro) > 100.0) {
                var valorRegistro = 100;
                valoresUsoMemoria.unshift(valorRegistro);
                recomendacoes(parseFloat(json[i].valor_registro), "Memoria");
              } else {
                valoresUsoMemoria.unshift(parseFloat(json[i].valor_registro));
                recomendacoes(parseFloat(json[i].valor_registro), "Memoria");
              }
            }
          }
        });
      } else {
        console.log(
          "Erro ao realizar a busca dos dados para o gráfico de linha <function graficoDeLinha>"
        );
        resposta.text().then((texto) => {
          console.log(resposta);
        });
      }
    })
    .catch((erro) => {
      console.log("Erro ao realizar a busca: " + erro);
    });

  recomendacoes(valoresUsoCPU, valoresUsoDisco, valoresUsoMemoria);
  atualizarAlertas(id_servidor);
  atualizarGraficoDeLinha(
    momentoDosRegistros,
    valoresUsoCPU,
    valoresUsoMemoria,
    valoresUsoDisco
  );
}

function atualizarGraficoDeLinha(
  vetorDeHorarios,
  vetorDaCPU,
  vetorDaMemoria,
  vetorDoDisco
) {
  // Toda vez que chamamos essa função temos que limpar a area do gráfico, para evitar sobreposição dos gráficos
  chartArea.innerHTML = ``;
  chartArea.innerHTML = `<canvas id="GraficoDeLinha"></canvas>`;

  const ctx = document.getElementById("GraficoDeLinha");
  new Chart(ctx, {
    type: "line",
    data: {
      labels: vetorDeHorarios,
      datasets: [
        {
          label: "Uso da CPU",
          data: vetorDaCPU,
          fill: false,
          borderColor: "#0000ff",
          tension: 0.1,
        },
        {
          label: "Uso da Memória",
          data: vetorDaMemoria,
          fill: false,
          borderColor: "#32bcad",
          tension: 0.1,
        },
        {
          label: "Uso do Disco",
          data: vetorDoDisco,
          fill: false,
          borderColor: "#2271b5",
          tension: 0.1,
        },
      ],
    },
    options: {
      scales: {
        y: {
          beginAtZero: true,
        },
      },
    },
  });
}

// KPI´s
function atualizarAlertas(id_servidor) {
  var query = `SELECT count(id_Alertas) AS alertas FROM Alertas WHERE fk_servidor = ${id_servidor};`;

  fetch("/graficosAnalista/buscarInformacoes", {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify({
      selectServer: query,
    }),
  })
    .then(function (resposta) {
      if (resposta.status == 200) {
        resposta.json().then((json) => {
          quantidadeDeAlertas.innerHTML = json[0].alertas;
        });
      } else {
        console.log(
          "Erro ao realizar a busca dos dados para o gráfico de linha <function atualzarAlertas>"
        );
        resposta.text().then((texto) => {
          console.log(resposta);
        });
      }
    })
    .catch((erro) => {
      console.log("Erro ao realizar a busca: " + erro);
    });
}

function recomendacoes(valor, componente) {
  // Verificações da CPU
  if (valor > 90.0 && componente == "CPU") {
    recomendacaoCPU.innerHTML =
      "<b>Sobre sua CPU, notamos um uso maior que 90%, recomendamos que ela seja melhorada!</b>";
    previsaoCPU.innerHTML =
      "<b>Com o percentual de mais de 90% de uso da sua CPU, estimamos que uma falha poderá ocorrer em 1 semana!</b>";
  }

  // Verificações do Disco
  if (valor > 90.0 && componente == "Disco") {
    recomendacaoDisco.innerHTML =
      "<b>Sobre seu Disco, notamos um uso maior que 90%, recomendamos que ele seja melhorado</b>";
    previsaoCPU.innerHTML =
      "<b>Com o percentual de mais de 90% de uso do seu Disco, estimamos que uma falha poderá ocorrer em 1 semana!</b>";
  }

  // Verificações da memória
  if (valor > 90.0 && componente == "Memoria") {
    recomendacaoMemoria.innerHTML =
      "<b>Sobre sua Memoria, notamos um uso maior que 90%, recomendamos que ela seja melhorada</b>";
    previsaoCPU.innerHTML =
      "<b>Com o percentual de mais de 90% de uso da sua Memória, estimamos que uma falha poderá ocorrer em 1 semana!</b>";
  }
}

// Dados ao vivo
function dadosAoVivo(id_servidor) {
  var query = `
  SELECT nome_componente, nome_medida, valor_registro, momento_registro
	  FROM Registro as r
      JOIN Componente as C on c.id_componente = r.fk_componente
      JOIN Medida as m on m.id_medida = r.fk_medida
      WHERE fk_servidor = ${id_servidor}
      ORDER BY momento_registro DESC
      LIMIT 6;`;

  fetch("/graficosAnalista/buscarInformacoes", {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify({
      selectServer: query,
    }),
  })
    .then(function (resposta) {
      if (resposta.status == 200) {
        resposta.json().then((json) => {
          for (var i = 0; i < json.length; i++) {
            if (
              json[i].nome_componente == "Cpu" &&
              json[i].nome_medida == "PorcentagemUso"
            ) {
              aoVivoCPU.innerHTML = `Uso da CPU: ${json[i].valor_registro}%`;
            }

            if (
              json[i].nome_componente == "Cpu" &&
              json[i].nome_medida == "Frequencia"
            ) {
              aoVivoCPUfrequencia.innerHTML = `Frequência da CPU: ${parseFloat(
                json[i].valor_registro
              ).toFixed(2)} GHz`;
            }

            if (json[i].nome_componente == "Disco") {
              aoVivoDisco.innerHTML = `Uso do Disco: ${json[i].valor_registro}%`;
            }

            if (json[i].nome_componente == "Memoria") {
              aoVivoMemoria.innerHTML = `Uso da memória: ${json[i].valor_registro}%`;
            }

            if (json[i].nome_medida == "bytesEnviados") {
              aoVivoRedeEnviados.innerHTML = `bytes enviados: ${(
                parseFloat(json[i].valor_registro) / 10000000
              ).toFixed(2)} Gb`;
            }

            if (json[i].nome_medida == "bytesRecebidos") {
              aoVivoRedeRecebidos.innerHTML = `bytes enviados: ${(
                parseFloat(json[i].valor_registro) / 100000000
              ).toFixed(2)} Gb`;
            }
          }
        });
      } else {
        console.log(
          "Erro ao realizar a busca dos servidores <function dadosAoVivo>"
        );
        resposta.text().then((texto) => {
          console.log(resposta);
        });
      }
    })
    .catch((erro) => {
      console.log("Erro ao realizar a busca: " + erro);
    });
}

// Informação do servidor
function informacoesServidor(id_servidor) {
  var query = `
  SELECT * FROM  Servidor WHERE id_servidor = ${id_servidor};`;

  fetch("/graficosAnalista/buscarInformacoes", {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify({
      selectServer: query,
    }),
  })
    .then(function (resposta) {
      if (resposta.status == 200) {
        resposta.json().then((json) => {
          nomeServidor.innerHTML = `Nome do servidor: ${json[0].nome_servidor}`;
          nomeSetor.innerHTML = `Nome do setor: ${json[0].local_servidor}`;
          ipv6Servidor.innerHTML = `IPV6 do servidor: ${json[0].ipv6_servidor}`;
          macAddressServidor.innerHTML = `Mac address: ${json[0].mac_address}`;
          soServidor.innerHTML = `Sistema operacional: ${json[0].so_servidor}`;
        });
      } else {
        console.log(
          "Erro ao realizar a busca dos servidores <function informacoesServidor>"
        );
        resposta.text().then((texto) => {
          console.log(resposta);
        });
      }
    })
    .catch((erro) => {
      console.log("Erro ao realizar a busca: " + erro);
    });
}

// Função para converter a hora que vem do banco de dados
function converterHorario(horario) {
  const dataHoraUTC = new Date(horario);

  if (isNaN(dataHoraUTC)) {
    return "Data e hora inválidas";
  }

  const dataHoraBrasil = dataHoraUTC.toLocaleTimeString("pt-BR", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });

  return dataHoraBrasil;
}

function calendario() {
  var el = document.querySelector(".dias");
  var now = new Date();
  var dia = now.getDay();
  var mes = now.getMonth();

  for (let i = 1; i <= 30; i++) {
    if (i < 10) {
      let data = `2023-${mes + 1}-0${i}T00:00:00`;
      var now = new Date(data);
    } else {
      let data = `2023-${mes + 1}-${i}T00:00:00`;
      var now = new Date(data);
    }

    var dia = now.getDay();
    var mes = now.getMonth();

    if (i == 1) {
      if (dia == 6) {
        el.innerHTML += `<span class="diaDoCalendario">${i}</span>`;
      } else if (dia == 0) {
        el.innerHTML += `<span class="diaDoCalendario">${i}</span>`;
      } else if (dia == 1) {
        el.innerHTML += `<span class="diaDoCalendario vazio"></span>`;
        el.innerHTML += `<span class="diaDoCalendario">${i}</span>`;
      } else if (dia == 2) {
        el.innerHTML += `<span class="diaDoCalendario vazio"></span>`;
        el.innerHTML += `<span class="diaDoCalendario vazio"></span>`;
        el.innerHTML += `<span class="diaDoCalendario">${i}</span>`;
      } else if (dia == 3) {
        el.innerHTML += `<span class="diaDoCalendario vazio"></span>`;
        el.innerHTML += `<span class="diaDoCalendario vazio"></span>`;
        el.innerHTML += `<span class="diaDoCalendario vazio"></span>`;
        el.innerHTML += `<span class="diaDoCalendario">${i}</span>`;
      } else if (dia == 4) {
        el.innerHTML += `<span class="diaDoCalendario vazio"></span>`;
        el.innerHTML += `<span class="diaDoCalendario vazio"></span>`;
        el.innerHTML += `<span class="diaDoCalendario vazio"></span>`;
        el.innerHTML += `<span class="diaDoCalendario vazio"></span>`;
        el.innerHTML += `<span class="diaDoCalendario">${i}</span>`;
      } else if (dia == 5) {
        el.innerHTML += `<span class="diaDoCalendario vazio"></span>`;
        el.innerHTML += `<span class="diaDoCalendario vazio"></span>`;
        el.innerHTML += `<span class="diaDoCalendario vazio"></span>`;
        el.innerHTML += `<span class="diaDoCalendario vazio"></span>`;
        el.innerHTML += `<span class="diaDoCalendario vazio"></span>`;
        el.innerHTML += `<span class="diaDoCalendario">${i}</span>`;
      }
    } else {
      el.innerHTML += `<span class="diaDoCalendario">${i}</span>`;
    }
  }
}

// Funções iniciais
atualizarGraficoDeLinha();
buscarSetores();
calendario();
