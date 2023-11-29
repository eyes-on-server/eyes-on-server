const ctxGraficoCpu = document.getElementById("graficoCpu");

function gerarGrafico(ctx, dados) {
  return new Chart(ctx, {
    type: "line",
    data: {
      labels: ["21/11", "22/11", "23/11", "24/11", "25/11", "26/11", "27/11"],
      datasets: [
        {
          label: "Temperatura",
          data: [12, 19, 3, 5, 2, 3, 90],
          borderWidth: 1,
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

function calcularRegressaoLinear(dadosDataHora, temperatura) {
  dadosDataHora = dadosDataHora.map(function (valor) {
    return parseFloat(valor);
  });

  temperatura = temperatura.map(function (valor1) {
    return parseFloat(valor1);
  });

  // Calcular a média de x e y
  var xSum = 0;
  var ySum = 0;
  for (var i = 0; i < dadosDataHora.length; i++) {
    xSum += dadosDataHora[i];
    ySum += temperatura[i];
  }
  console.log(xSum, ySum);
  var xMean = xSum / dadosDataHora.length;
  var yMean = ySum / dadosDataHora.length;
  console.log(xMean, ySum);

  // Calcular os coeficientes da regressão:
  // O numerador é a soma dos produtos dos desvios de X em relação à média de X e dos desvios de Y em relação à média de Y
  // para cada par de dados (X - X̄) * (Y - Ȳ)
  // A variável denominator é usada para calcular a soma dos quadrados dos desvios de x em relação à sua média.
  // X (X - X̄)^2
  //CALCULAR A INCLINAÇÃO a = Σ((X - X̄)(Y - Ȳ)) / Σ((X - X̄)²)

  var numerator = 0;
  var denominator = 0;
  for (var i = 0; i < dadosDataHora.length; i++) {
    numerator += (dadosDataHora[i] - xMean) * (temperatura[i] - yMean);
    denominator += ((dadosDataHora[i] - xMean) * (dadosDataHora[i] - xMean)) ^ 2;
    console.log(numerator, denominator);
  }
  //Inclinação (Beta)
  var a = numerator / denominator;
  //var a = 0.04
  //Interceptação (Alfa)
  var b = yMean - a * xMean;
  //var b = 91.7

  console.log(a, b);

  var r = RSquared(yMean, a, b, dadosDataHora, temperatura);
  var Rsq = r.Rsq;
  console.log("R");
  console.log(Rsq);

  return { a, b, Rsq };
}

function criarGraficoLinha(ctx, dadosDataHora, temperatura) {
  // Calcula os coeficientes da regressão linear
  var coeficientes = calcularRegressaoLinear(dadosDataHora, temperatura);
  var a = coeficientes.a;
  var b = coeficientes.b;
  var Rsq = coeficientes.Rsq;

  // Pega o valor de a e b do calcularRegressaoLinear e faz o calculo
  //com base no x (dados do dadosDataHora)
  // filtrar por máquina e no filtro mostrar o tipo dela
  var labels = dadosDataHora;
  var valoresRegressao = dadosDataHora.map(function (x) {
    // alfa + beta * x formula da regressão linear
    // b + x * a seguindo as variaveis da função calcularRegressaoLinear
    return b + x * a;
  });

  var ctx = document.getElementById("graficoCpu").getContext("2d");
  var chart = new Chart(ctx, {
    type: "line",
    data: {
      labels: temperatura,
      datasets: [
        {
          label: "temperatura Original",
          data: temperatura,
          backgroundColor: "blue",
          borderColor: "transparent",
          fill: false,
        },
        {
          label: "Regressão Linear",
          data: valoresRegressao,
          borderColor: "red",
          backgroundColor: "red",
          pointRadius: 0,
          fill: false,
        },
      ],
    },
  });

  regressaoLinear.innerHTML = `${Rsq.toFixed(2)}%`;
}

function RSquared(yMean, a, b, dadosDataHora, temperatura) {
  // formula: Rsq = 1 - (SSE / SSTO)

  // Calcular a soma dos quadrados totais (SSTO)
  var SSTO = 0;
  for (var i = 0; i < dadosDataHora.length; i++) {
    SSTO += Math.pow(temperatura[i] - yMean, 2);
  }

  // Calcular a soma dos quadrados dos erros (SSE)
  var SSE = 0;
  for (var i = 0; i < dadosDataHora.length; i++) {
    SSE += Math.pow(temperatura[i] - (a * dadosDataHora[i] + b), 2);
  }

  // Calcular o R-quadrado múltiplo
  var Rsq = 1 - SSE / SSTO;
  Rsq = Rsq * 100;

  return { Rsq };
}

criarGraficoLinha(ctxGraficoCpu, [1, 2, 3, 4, 5, 6, 7], [10, 20, 30, 40, 50, 60, 70]);
