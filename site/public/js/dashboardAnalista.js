//-- Configurações pessoais da página --\\
user_name.innerHTML = sessionStorage.NOME_USER;
company_name.innerHTML = sessionStorage.NOME_FANTASIA;

//-- Variáveis para os selects --\\
setores = [];
servidores = [];

//-- Configuração da data --\\
var now = new Date();

dataSistema = formatDate(now, "yy-mm-dd");

function formatDate(date, format) {
  const map = {
    mm: date.getMonth() + 1,
    dd: date.getDate(),
    yy: date.getFullYear(),
  };

  return format.replace(/mm|dd|yy|yyy/gi, (matched) => map[matched]);
}

//-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------\\
function buscarServer() {
  var select = `SELECT id_servidor, nome_servidor, local_servidor FROM Servidor WHERE fk_empresa = (select id_empresa from Empresa where nome_fantasia = "${sessionStorage.NOME_FANTASIA}");
  `;
  fetch(`/graficosAnalista/buscarInformacoes`, {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify({
      selectServer: select,
    }),
  })
    .then(function (resposta) {
      if (resposta.status == 200) {
        resposta.json().then((json) => {
          for (var i = 0; i < json.length; i++) {
            if (!setores.includes(json[i].local_servidor)) {
              setores.push(json[i].local_servidor);
              value = json[i].local_servidor;
              localServerSelect.innerHTML += `<option value="${value}">${value}</option>`;
            }
          }
        });
      } else {
        console.log("Erro ao realizar busca!");

        resposta.text().then((texto) => {
          console.error(texto);
        });
      }
    })
    .catch((erro) => {
      console.log("Erro ao realizar a busca: " + erro);
    });
}

function buscarAlertas() {
  var select = `SELECT fk_servidor, tipoAlerta FROM Alertas WHERE data_hora_abertura LIKE "${dataSistema}%"`;
  fetch(`/graficosAnalista/buscarInformacoes`, {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify({
      selectServer: select,
    }),
  })
    .then(function (resposta) {
      if (resposta.status == 200) {
        resposta.json().then((json) => {
          alert(json.length);
          alertas.innerHTML = json.length;

          var qtdDeServidoresCriticos = [];
          var qtdDeServidoresEmAlertas = [];

          for (var i = 0; i < json.length; i++) {
            if (
              !qtdDeServidoresCriticos.includes(json[i].fk_servidor) &&
              json[i].tipoAlerta == "Emergência"
            ) {
              qtdDeServidoresCriticos.push(json[i].fk_servidor);
            }

            if (
              !qtdDeServidoresEmAlertas.includes(json[i].fk_servidor) &&
              json[i].tipoAlerta == "Prevenção"
            ) {
              qtdDeServidoresEmAlertas.push(json[i].fk_servidor);
            }

            criticos.innerHTML = qtdDeServidoresCriticos.length;
            alertasDiv.innerHTML = qtdDeServidoresEmAlertas.length;
          }
        });
      } else {
        console.log("Erro ao realizar busca!");

        resposta.text().then((texto) => {
          console.error(texto);
        });
      }
    })
    .catch((erro) => {
      console.log("Erro ao realizar a busca: " + erro);
    });

  var select = `
      SELECT fk_servidor, nome_servidor, COUNT(fk_servidor) AS total_repeticoes
      FROM Alertas
      join servidor
      on fk_servidor = id_servidor
      GROUP BY fk_servidor
      ORDER BY total_repeticoes DESC
      LIMIT 1; 
  `;
  fetch(`/graficosAnalista/buscarInformacoes`, {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify({
      selectServer: select,
    }),
  })
    .then(function (resposta) {
      if (resposta.status == 200) {
        resposta.json().then((json) => {
          alertas.innerHTML = json.length;
          maquinaDestaque.innerHTML = json[0].nome_servidor;
        });
      } else {
        console.log("Erro ao realizar busca!");

        resposta.text().then((texto) => {
          console.error(texto);
        });
      }
    })
    .catch((erro) => {
      console.log("Erro ao realizar a busca: " + erro);
    });
}

function selectSetor(selectedValue) {
  var select = `SELECT id_servidor, nome_servidor FROM Servidor WHERE local_servidor = "${selectedValue}"`;
  nameServerSelect.innerHTML = `<option value="Servidor">Servidor</option>`;
  servidores = [];

  fetch(`/graficosAnalista/buscarInformacoes`, {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify({
      selectServer: select,
    }),
  })
    .then(function (resposta) {
      if (resposta.status == 200) {
        resposta.json().then((json) => {
          for (var i = 0; i < json.length; i++) {
            if (!servidores.includes(json[i].nome_servidor)) {
              servidores.push(json[i].nome_servidor);
              value = json[i].nome_servidor;
              nameServerSelect.innerHTML += `<option value="${json[i].id_servidor}">${value}</option>`;
            }
          }
        });
      } else {
        console.log("Erro ao realizar busca!");

        resposta.text().then((texto) => {
          console.error(texto);
        });
      }
    })
    .catch((erro) => {
      console.log("Erro ao realizar a busca: " + erro);
    });
}

function graficoIncidentesPorDia(selectedValue) {
  chartArea.innerHTML = "";
  chartArea.innerHTML = `<canvas id="myAreaChart"></canvas>`;

  var hora03 = [];
  var hora06 = [];
  var hora09 = [];
  var hora12 = [];
  var hora15 = [];
  var hora18 = [];
  var hora21 = [];
  var hora00 = [];

  var selectHTMLValue = selectedValue;
  graficoDePizza(selectHTMLValue);

  if (selectedValue == undefined || selectedValue == "Servidor") {
    var select = `SELECT fk_servidor, data_hora_abertura, tipoAlerta, descricao_Alerta FROM Alertas WHERE data_hora_abertura LIKE "${dataSistema}%"`;
  } else {
    var select = `SELECT fk_servidor, data_hora_abertura, tipoAlerta, descricao_Alerta FROM Alertas WHERE fk_servidor = ${selectedValue} AND data_hora_abertura LIKE "${dataSistema}%";`;
    tabelaAoVivo(selectHTMLValue);
  }

  fetch(`/graficosAnalista/buscarInformacoes`, {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify({
      selectServer: select,
    }),
  })
    .then(function (resposta) {
      if (resposta.status == 200) {
        resposta.json().then((json) => {
          for (var i = 0; i < json.length; i++) {
            var dataHoraAbertura = new Date(json[i].data_hora_abertura);

            var rangePeriodo01 = new Date(dataHoraAbertura);
            var rangePeriodo02 = new Date(dataHoraAbertura);
            var rangePeriodo03 = new Date(dataHoraAbertura);
            var rangePeriodo04 = new Date(dataHoraAbertura);
            var rangePeriodo05 = new Date(dataHoraAbertura);
            var rangePeriodo06 = new Date(dataHoraAbertura);
            var rangePeriodo07 = new Date(dataHoraAbertura);
            var rangePeriodo08 = new Date(dataHoraAbertura);

            rangePeriodo01.setHours(3, 0, 0, 0);
            rangePeriodo02.setHours(6, 0, 0, 0);
            rangePeriodo03.setHours(9, 0, 0, 0);
            rangePeriodo04.setHours(12, 0, 0, 0);
            rangePeriodo05.setHours(15, 0, 0, 0);
            rangePeriodo06.setHours(18, 0, 0, 0);
            rangePeriodo07.setHours(21, 0, 0, 0);

            if (
              dataHoraAbertura < rangePeriodo01 &&
              !hora00.includes(json[i].descricao_Alerta)
            ) {
              hora00.push(json[i].descricao_Alerta);
            } else if (
              dataHoraAbertura < rangePeriodo02 &&
              !hora03.includes(json[i].descricao_Alerta)
            ) {
              hora03.push(json[i].descricao_Alerta);
            } else if (
              dataHoraAbertura < rangePeriodo03 &&
              !hora06.includes(json[i].descricao_Alerta)
            ) {
              hora06.push(json[i].descricao_Alerta);
            } else if (
              dataHoraAbertura < rangePeriodo04 &&
              !hora09.includes(json[i].descricao_Alerta)
            ) {
              hora09.push(json[i].descricao_Alerta);
            } else if (
              dataHoraAbertura < rangePeriodo05 &&
              !hora12.includes(json[i].descricao_Alerta)
            ) {
              hora12.push(json[i].descricao_Alerta);
            } else if (
              dataHoraAbertura < rangePeriodo06 &&
              !hora15.includes(json[i].descricao_Alerta)
            ) {
              hora15.push(json[i].descricao_Alerta);
            } else if (
              dataHoraAbertura < rangePeriodo07 &&
              !hora18.includes(json[i].descricao_Alerta)
            ) {
              hora18.push(json[i].descricao_Alerta);
            } else if (
              dataHoraAbertura < rangePeriodo08 &&
              !hora21.includes(json[i].descricao_Alerta)
            ) {
              hora21.push(json[i].descricao_Alerta);
            }
          }

          atualizarGraficoPrincipal(
            hora00.length,
            hora03.length,
            hora06.length,
            hora09.length,
            hora12.length,
            hora15.length,
            hora18.length,
            hora21.length
          );
        });
      } else {
        console.log("Erro ao realizar busca!");

        resposta.text().then((texto) => {
          console.error(texto);
        });
      }
    })
    .catch((erro) => {
      console.log("Erro ao realizar a busca: " + erro);
    });
}

function atualizarGraficoPrincipal(
  hr00,
  hr03,
  hr06,
  hr09,
  hr12,
  hr15,
  hr18,
  hr21
) {
  const ctx = document.getElementById("myAreaChart");

  new Chart(ctx, {
    type: "bar",
    data: {
      labels: [
        "00:00",
        "03:00",
        "06:00",
        "09:00",
        "12:00",
        "15:00",
        "18:00",
        "21:00",
      ],
      datasets: [
        {
          label: "Incidentes",
          data: [hr00, hr03, hr06, hr09, hr12, hr15, hr18, hr21],
          borderWidth: 1,
          backgroundColor: "#32bcad",
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

function graficoDePizza(selectValue) {
  var cpu = [];
  var disco = [];
  var rede = [];
  var memoria = [];

  doughnut.innerHTML = "";
  doughnut.innerHTML = `<canvas id="myPieChart"></canvas>`;

  if (selectValue == undefined || selectValue == "Servidor") {
    var select = `
    SELECT tipoAlerta, descricao_Alerta, nome_componente 
    FROM Alertas a 
      JOIN Componente c 
      on a.fk_componente = c.id_componente;`;
  } else {
    var select = `
    SELECT tipoAlerta, descricao_Alerta, nome_componente 
      FROM Alertas a 
      JOIN Componente c 
      on a.fk_componente = c.id_componente
      WHERE fk_servidor = ${selectValue};`;
  }

  fetch(`/graficosAnalista/buscarInformacoes`, {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify({
      selectServer: select,
    }),
  })
    .then(function (resposta) {
      if (resposta.status == 200) {
        resposta.json().then((json) => {
          alertas.innerHTML = json.length;

          for (var i = 0; i < json.length; i++) {
            if (
              json[i].nome_componente == "Cpu" &&
              !cpu.includes(json[i].descricao_Alerta)
            ) {
              cpu.push(json[i].descricao_Alerta);
            } else if (
              json[i].nome_componente == "Disco" &&
              !disco.includes(json[i].descricao_Alerta)
            ) {
              disco.push(json[i].descricao_Alerta);
            } else if (
              json[i].nome_componente == "Rede" &&
              !rede.includes(json[i].descricao_Alerta)
            ) {
              rede.push(json[i].descricao_Alerta);
            } else if (
              json[i].nome_componente == "Memoria" &&
              !memoria.includes(json[i].descricao_Alerta)
            ) {
              memoria.push(json[i].descricao_Alerta);
            }
          }

          atualizarGraficoDoughnut(
            cpu.length,
            rede.length,
            disco.length,
            memoria.length
          );
        });
      } else {
        console.log("Erro ao realizar busca!");

        resposta.text().then((texto) => {
          console.error(texto);
        });
      }
    })
    .catch((erro) => {
      console.log("Erro ao realizar a busca: " + erro);
    });
}

function atualizarGraficoDoughnut(
  cpuValue,
  redeValue,
  discoValue,
  memoriaValue
) {
  const ctx = document.getElementById("myPieChart");

  new Chart(ctx, {
    type: "doughnut",
    data: {
      labels: ["CPU", "Rede", "Disco", "Memória"],
      datasets: [
        {
          label: "Incidentes",
          data: [cpuValue, redeValue, discoValue, memoriaValue],
          backgroundColor: ["#1ec98b", "#32bcad", "#36b9cc", "#2271b5"],
          hoverOffset: 4,
        },
      ],
    },
    options: {
      layout: {
        width: 5000,
      },
    },
  });
}

function tabelaAoVivo(selectValue) {
  var select = `
  SELECT
    s.nome_servidor "Servidor",
      r.momento_registro "Momento",
      r.valor_registro "Valor",
      c.nome_componente "Componente",
      m.nome_medida "Medida"
  FROM Eyes_On_Server.Registro r
    join Eyes_On_Server.Componente c on c.id_componente = r.fk_componente
    join Eyes_On_Server.Medida m on m.id_medida = r.fk_medida
      join Eyes_On_Server.Servidor s on s.id_servidor = r.fk_servidor and s.id_servidor = ${selectValue}
  ORDER BY Momento
  limit 6;
  `;

  fetch(`/graficosAnalista/buscarInformacoes`, {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify({
      selectServer: select,
    }),
  })
    .then(function (resposta) {
      if (resposta.status == 200) {
        resposta.json().then((json) => {
          alertas.innerHTML = json.length;

          celulaServidor.innerHTML = json[0].Servidor;
          celulaHorario.innerHTML = json[0].Momento[(10, 18)];
          celulaFrequenciaCPU.innerHTML = json[0].Valor;
          celulaUsoCPU.innerHTML = json[1].Valor;
          celulaUsoDisco.innerHTML = json[2].Valor;
          celulaUsoMemoria.innerHTML = json[3].Valor;
          celulaBytesEnviados.innerHTML = json[4].Valor;
          celulaBytesRecebidos.innerHTML = json[5].Valor;
        });
      } else {
        console.log("Erro ao realizar busca!");

        resposta.text().then((texto) => {
          console.error(texto);
        });
      }
    })
    .catch((erro) => {
      console.log("Erro ao realizar a busca: " + erro);
    });
}

buscarServer();
buscarAlertas();
graficoIncidentesPorDia();
atualizarGraficoDoughnut();
