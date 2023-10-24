// Set new default font family and font color to mimic Bootstrap's default styling
(Chart.defaults.global.defaultFontFamily = "Nunito"),
  '-apple-system,system-ui,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif';
Chart.defaults.global.defaultFontColor = "black";

// Pie Chart Example
var ctx = document.getElementById("graficoTipoProblemas");
var graficoTipoProblemas = new Chart(ctx, {
  type: "doughnut",
  data: {
    labels: ["Emergência", "Perigo", "Prevenção"],
    datasets: [
      {
        data: [55, 30, 15],
        backgroundColor: ["#722f37", "#d16f2e", "#c29836"],
        hoverBackgroundColor: ["#963e48", "#f78336", "#f0ba3e"],
        hoverBorderColor: "rgba(234, 236, 244, 1)",
      },
    ],
  },
  options: {
    maintainAspectRatio: false,
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
      caretPadding: 10,
    },
    legend: {
      display: false,
    },
    cutoutPercentage: 80,
  },
});
