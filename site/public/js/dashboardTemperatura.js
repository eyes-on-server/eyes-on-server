// Dados de exemplo (substitua pelos seus próprios dados)
const temperatura = [25.0, 28.0, 30.0, 22.0, 27.0];
const usoCpu = [0.1, 0.2, 0.3, 0.1, 0.25];

// Calcule a correlação entre os dados
const correlation = calculateCorrelation(temperatura, usoCpu);
console.log("Correlação entre Temperatura e Uso de CPU:", correlation);

// Obtendo o contexto do canvas
const ctx = document.getElementById("graficoCpu").getContext("2d");

// Configurações do gráfico
const config = {
  type: "scatter",
  data: {
    datasets: [
      {
        label: "Correlação",
        data: temperatura.map((value, index) => ({
          x: value,
          y: usoCpu[index],
        })),
        backgroundColor: "rgba(75, 192, 192, 0.5)", // Cor de fundo
      },
    ],
  },
  options: {
    scales: {
      x: {
        type: "linear",
        position: "bottom",
        title: {
          display: true,
          text: "Temperatura",
        },
      },
      y: {
        type: "linear",
        position: "left",
        title: {
          display: true,
          text: "Uso de CPU",
        },
      },
    },
    plugins: {
      title: {
        display: true,
        text: "Gráfico de Correlação",
      },
    },
  },
};

// Crie o gráfico
const chart = new Chart(ctx, config);

// Adicione a linha de regressão linear
const regressionData = calculateLinearRegression(temperatura, usoCpu);
const regressionLine = regressionData.equation;
chart.data.datasets.push({
  label: "Linha de Regressão",
  data: [
    { x: Math.min(...temperatura), y: regressionLine(temperatura[0]) },
    {
      x: Math.max(...temperatura),
      y: regressionLine(Math.max(...temperatura)),
    },
  ],
  borderColor: "red", // Cor da linha
  borderWidth: 2, // Largura da linha
  fill: false, // Não preencher a área sob a linha
});
chart.update();

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

function calculateMean(array) {
  const sum = array.reduce((acc, value) => acc + value, 0);
  return sum / array.length;
}

// Função para calcular a linha de regressão linear usando a biblioteca regression-js
function calculateLinearRegression(x, y) {
  if (x.length !== y.length) {
    throw new Error("Os arrays devem ter o mesmo comprimento");
  }

  const data = x.map((value, index) => [value, y[index]]);
  const result = regression.linear(data);
  return result;
}
