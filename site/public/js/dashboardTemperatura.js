nome_do_usuario.innerHTML = sessionStorage.NOME_USER;
nome_da_empresa.innerHTML = sessionStorage.NOME_FANTASIA;

let temperatura = [];
let usoCpu = [];
let usoRam = [];
let usoDisco = [];
let cpuAlerts = 0;
let discAlerts = 0;
let memoryAlerts = 0;

let opcoes = [usoCpu, usoRam, usoDisco];

let escolhaGrafico = 0;

// Calcule a correlação entre os dados
let correlationCpu = calculateCorrelation(temperatura, usoCpu);
let correlationRam = calculateCorrelation(temperatura, usoRam);
let correlationDisco = calculateCorrelation(temperatura, usoDisco);

function buscarServidores() {
  // Limpar as options quando trocar de setor
  select_servidores.innerHTML = `<option value="" selected disabled>Servidores</option>`;

  fetch(`/temperatura/servidoresPorEmpresa/${sessionStorage.FK_EMPRESA}`, {
    method: "GET",
    headers: {
      "Content-type": "application/json",
    },
  })
    .then(function (resposta) {
      if (resposta.status == 200) {
        resposta.json().then((json) => {
          // Criamos um vetor para conferir se aquele servidor já foi inserido no HTML
          let servidores = [];
          // Esse for roda todo o json de resposta da query e insere o nome dos setores no select do HTML
          select_servidores.innerHTML = `<option value="">Selecionar Servidor</option>`;
          for (let i = 0; i < json.length; i++) {
            if (!servidores.includes(json[i].nome_servidor)) {
              let id_servidor = json[i].id_servidor;
              let servidor = json[i].nome_servidor;

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

function buscarAlertas(idServidor) {
  //busca os alertas de cada componente de acordo com o servidor
  fetch(`/alertas/coletarTodosAlertas/${idServidor}`).then((resultado) => {
    resultado.json().then((resultado) => {
      cpuAlerts = resultado[0].totalAlertasCpu;
      memoryAlerts = resultado[0].totalAlertasMemoria;
      discAlerts = resultado[0].totalAlertasDisco;
      console.log(resultado);
    });
  });

  document.getElementById("qtdAlertasCpu").innerHTML = cpuAlerts;
  document.getElementById("qtdAlertasMem").innerHTML = memoryAlerts;
  document.getElementById("qtdAlertasDisco").innerHTML = discAlerts;
}

function buscarDadosServidor(idServidor) {
  temperatura = [];
  usoCpu = [];
  usoRam = [];
  usoDisco = [];
  //busca os dados do servidor escolhido
  fetch(`/temperatura/dadosTemperaturaPorServidor/${idServidor}`).then(
    (resultado) => {
      resultado.json().then((resultado) => {
        console.log(resultado);
        resultado.map((dado) => {
          temperatura.push(Number(dado.Valor));
        });
      });
    }
  );
  fetch(`/temperatura/dadosUsoCpuPorServidor/${idServidor}`).then(
    (resultado) => {
      resultado.json().then((resultado) => {
        resultado.map((dado) => {
          usoCpu.push(Number(dado.Valor));
        });
      });
    }
  );
  fetch(`/temperatura/dadosUsoMemPorServidor/${idServidor}`).then(
    (resultado) => {
      resultado.json().then((resultado) => {
        resultado.map((dado) => {
          usoRam.push(Number(dado.Valor));
        });
      });
    }
  );
  fetch(`/temperatura/dadosUsoDiscoPorServidor/${idServidor}`).then(
    (resultado) => {
      resultado.json().then((resultado) => {
        resultado.map((dado) => {
          usoDisco.push(Number(dado.Valor));
        });
      });
    }
  );

  opcoes = [usoCpu, usoRam, usoDisco];
}

function selecionarServidor(idServidor) {
  buscarAlertas(idServidor);
  buscarDadosServidor(idServidor);
  criarGrafico();
  definirCorrelacoes();
}

function selecionarGrafico(escolha) {
  escolhaGrafico = escolha;
  atualizarGrafico();

  switch (escolha) {
    case 0:
      document.getElementById("tituloGrafico").innerHTML =
        "Temperatura X Cpu (%)";
      break;
    case 1:
      document.getElementById("tituloGrafico").innerHTML =
        "Temperatura X Memória (%)";
      break;
    case 2:
      document.getElementById("tituloGrafico").innerHTML =
        "Temperatura X Disco (%)";
      break;
  }
}

function criarGrafico() {
  const ctx = document.getElementById("graficoCorrelacao").getContext("2d");
  let regressionLine = calculateLinearRegression(
    temperatura,
    opcoes[escolhaGrafico]
  );
  // Configurações do gráfico
  const config = {
    data: {
      datasets: [
        {
          type: "scatter",
          label: "Dispersão",
          data: temperatura.map((value, index) => ({
            x: value,
            y: opcoes[escolhaGrafico][index],
          })),
          borderColor: "#0000FF", // Cor de fundo
          borderWidth: 2,
        },
        {
          label: "Linha de Regressão",
          type: "line",
          data: [
            {
              x: Math.min(...temperatura),
              y: regressionLine(Math.min(...temperatura)),
            },
            {
              x: Math.max(...temperatura),
              y: regressionLine(Math.max(...temperatura)),
            },
          ],
          borderColor: "red",
          borderWidth: 4,
          fill: false,
        },
      ],
    },
    // options: {
    //   scales: {
    //     x: {
    //       type: "linear",
    //       position: "bottom",
    //       title: {
    //         display: true,
    //         text: "Temperatura",
    //       },
    //     },
    //     y: {
    //       type: "linear",
    //       position: "left",
    //       title: {
    //         display: true,
    //         text: "Uso de CPU",
    //       },
    //     },
    //   },
    //   plugins: {
    //     title: {
    //       display: true,
    //       text: "Gráfico de Correlação",
    //     },
    //   },
    // },
  };

  return new Chart(ctx, config);
}

function atualizarGrafico() {
  console.log(opcoes[escolhaGrafico]);
  chart.data.labels.pop();
  chart.data.datasets.forEach((dataset) => {
    dataset.data.pop();
  });
  chart.update();

  let regressionLine = calculateLinearRegression(
    temperatura,
    opcoes[escolhaGrafico]
  );

  // Adicionar a linha de regressão linear ao gráfico
  chart.data.datasets.push({
    label: "Linha de Regressão",
    type: "line",
    data: [
      {
        x: Math.min(...temperatura),
        y: regressionLine(Math.min(...temperatura)),
      },
      {
        x: Math.max(...temperatura),
        y: regressionLine(Math.max(...temperatura)),
      },
    ],
    borderColor: "red",
    borderWidth: 4,
    fill: false,
  });
  chart.data.datasets.push({
    type: "scatter",
    data: {
      label: "Dispersão",
      data: temperatura.map((value, index) => ({
        x: value,
        y: opcoes[escolhaGrafico][index],
      })),
      borderColor: "#0000FF", // Cor de fundo
      borderWidth: 2,
    },
  });
  chart.update();
}

// Função para calcular a correlação
function calculateCorrelation(x, y) {
  if (x.length !== y.length) {
    throw new Error("Os arrays devem ter o mesmo comprimento");
  }

  const n = x.length;
  const meanX = calculateMean(x);
  const meanY = calculateMean(y);

  let numerator = 0.0;
  let sumSquaredXDiff = 0.0;
  let sumSquaredYDiff = 0.0;

  for (let i = 0; i < n; i++) {
    const xDiff = x[i] - meanX;
    const yDiff = y[i] - meanY;

    numerator += xDiff * yDiff;
    sumSquaredXDiff += xDiff * xDiff;
    sumSquaredYDiff += yDiff * yDiff;
  }

  const denominator = Math.sqrt(sumSquaredXDiff * sumSquaredYDiff);
  return numerator / denominator;
}

// Função para calcular a média de um array
function calculateMean(array) {
  const sum = array.reduce((acc, value) => acc + value, 0);
  return sum / array.length;
}

// Função para calcular a regressão linear manualmente
function calculateLinearRegression(x, y) {
  if (x.length !== y.length) {
    throw new Error("Os arrays devem ter o mesmo comprimento");
  }

  const n = x.length;
  const meanX = calculateMean(x);
  const meanY = calculateMean(y);

  let numerator = 0.0;
  let denominator = 0.0;

  for (let i = 0; i < n; i++) {
    numerator += (x[i] - meanX) * (y[i] - meanY);
    denominator += Math.pow(x[i] - meanX, 2);
  }

  const m = numerator / denominator; // Coeficiente angular
  const b = meanY - m * meanX; // Interceptação y

  // Retornar a função da linha de regressão
  return (inputX) => m * inputX + b;
}

buscarServidores();
const chart = criarGrafico();

function definirCorrelacoes() {
  correlationCpu = calculateCorrelation(temperatura, usoCpu);
  correlationRam = calculateCorrelation(temperatura, usoRam);
  correlationDisco = calculateCorrelation(temperatura, usoDisco);

  document.getElementById("correlacaoCPU").textContent = `CPU: ${(
    correlationCpu * 100
  ).toFixed(1)}%`;
  document.getElementById("correlacaoMemoria").textContent = `RAM: ${(
    correlationRam * 100
  ).toFixed(1)}%`;
  document.getElementById("correlacaoDisco").textContent = `Disco: ${(
    correlationDisco * 100
  ).toFixed(1)}%`;
}
