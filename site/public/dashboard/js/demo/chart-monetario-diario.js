// Set new default font family and font color to mimic Bootstrap's default styling
(Chart.defaults.global.defaultFontFamily = "Nunito"),
  '-apple-system,system-ui,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif';
Chart.defaults.global.defaultFontColor = "black";

// Area Chart Example
var ctxChartMonetarioDiario = document.getElementById("graficoMonetarioDiario");
var graficoMonetarioDiario = new Chart(ctxChartMonetarioDiario, {
  type: "line",
  data: {
    labels: [
      "Segunda-Feira",
      "Terça-Feira",
      "Quarta-Feira",
      "Quinta-Feira",
      "Sexta-Feira",
      "Sábado",
      "Domingo",
    ],
    datasets: [
      {
        label: "Quantidade de Incidentes",
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
        data: [12, 15, 8, 9, 9, 5, 10],
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
