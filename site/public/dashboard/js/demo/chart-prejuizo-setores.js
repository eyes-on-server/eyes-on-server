// Set new default font family and font color to mimic Bootstrap's default styling
(Chart.defaults.global.defaultFontFamily = "Nunito"),
  '-apple-system,system-ui,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif';
Chart.defaults.global.defaultFontColor = "black";

// Pie Chart Example
var ctx = document.getElementById("graficoPrejuizoSetores");
var graficoPrejuizoSetores = new Chart(ctx, {
  type: "polarArea",
  data: {
    labels: ["Setor A", "Setor B", "Setor C", "Setor D", "Setor E"],
    datasets: [
      {
        data: [55, 30, 15, 23, 12],
        backgroundColor: ["#722f37", "#d16f2e", "#c29836", "#ab23aa", "12fe78"],
        hoverBackgroundColor: [
          "#963e48",
          "#f78336",
          "#f0ba3e",
          "#ab23aa",
          "12fe78",
        ],
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
      display: true,
      position: "left",
    },
    cutoutPercentage: 80,
  },
});
