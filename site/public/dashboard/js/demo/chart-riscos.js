// Set new default font family and font color to mimic Bootstrap's default styling
(Chart.defaults.global.defaultFontFamily = "Nunito"),
  '-apple-system,system-ui,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif';
Chart.defaults.global.defaultFontColor = "black";

// Area Chart Example
var ctxChartRiscos = document.getElementById("graficoRiscos");
var graficoRiscos = new Chart(ctxChartRiscos, {
  type: "horizontalBar",
  data: {
    labels: [
      "Risco Máximo",
      "Risco Muito Alto",
      "Risco Alto",
      "Risco Médio",
      "Risco Baixo",
      "Risco Muito Baixo",
      "Sem Riscos",
    ],
    datasets: [
      {
        label: "Porcentagem de Servidores",
        backgroundColor: [
          "#32bcad",
          "#32bcad",
          "#32bcad",
          "#32bcad",
          "#32bcad",
          "#32bcad",
          "#32bcad",
        ],
        borderColor: [
          "rgba(78, 115, 223, 1)",
          "rgba(78, 115, 223, 1)",
          "rgba(78, 115, 223, 1)",
          "rgba(78, 115, 223, 1)",
          "rgba(78, 115, 223, 1)",
          "rgba(78, 115, 223, 1)",
          "rgba(78, 115, 223, 1)",
        ],
        data: [30, 25, 20, 15, 10, 5, 9],
      },
    ],
  },
  options: {
    scales: {
      yAxes: [
        {
          ticks: {
            fontColor: "black",
            fontStyle: "bold",
            fontSize: 11,
            stepSize: 1,
            beginAtZero: true,
          },
        },
      ],
      xAxes: [
        {
          ticks: {
            fontColor: "black",
            fontStyle: "bold",
            fontSize: 15,
            stepSize: 1,
            beginAtZero: true,
          },
        },
      ],
    },
    maintainAspectRatio: false,
    layout: {
      padding: {
        left: 10,
        right: 25,
        top: 25,
        bottom: 0,
      },
    },
    legend: {
      display: false,
      position: "top",
    },
    tooltips: {
      backgroundColor: "rgb(255,255,255)",
      bodyFontColor: "black",
      bodyFontSize: 20,
      titleMarginBottom: 10,
      titleFontColor: "black",
      titleFontSize: 18,
      borderColor: "#dddfeb",
      borderWidth: 1,
      xPadding: 15,
      yPadding: 15,
      displayColors: false,
      intersect: false,
      mode: "index",
      caretPadding: 10,
    },
  },
});
