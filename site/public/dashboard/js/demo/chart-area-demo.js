// Set new default font family and font color to mimic Bootstrap's default styling
Chart.defaults.global.defaultFontFamily = 'Nunito', '-apple-system,system-ui,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif';
Chart.defaults.global.defaultFontColor = '#858796';

// Area Chart Example
var ctx = document.getElementById("myAreaChart");
var myLineChart = new Chart(ctx, {
  type: 'bar',
  data: {
    labels: ["BAM-12", "BAM-11", "BAM-12", "BAM-12", "BAM-12", "BAM-12", "BAM-12", "BAM-12",],
    datasets: [{
      label: "Incidentes",
      backgroundColor: [
        "rgba(78, 165, 230, 0.5)",
        "rgba(78, 165, 230, 0.5)",
        "rgba(78, 165, 230, 0.5)",
        "rgba(78, 165, 230, 0.5)",
        "rgba(78, 165, 230, 0.5)",
        "rgba(78, 165, 230, 0.5)",
        "rgba(78, 165, 230, 0.5)",
        "rgba(78, 165, 230, 0.5)",
        "rgba(78, 165, 230, 0.5)",
        "rgba(78, 165, 230, 0.5)",
        "rgba(78, 165, 230, 0.5)",
      ],
      borderColor: [
        "rgba(78, 115, 223, 1)",
        "rgba(78, 115, 223, 1)",
        "rgba(78, 115, 223, 1)",
        "rgba(78, 115, 223, 1)",
        "rgba(78, 115, 223, 1)",
        "rgba(78, 115, 223, 1)",
        "rgba(78, 115, 223, 1)",
        "rgba(78, 115, 223, 1)",
        "rgba(78, 115, 223, 1)",
        "rgba(78, 115, 223, 1)",
        "rgba(78, 115, 223, 1)",
      ],
      data: [20, 10, 25, 31, 35, 20, 25, 31,],
    },]
  },
  options: {
    scales: {
      y: {
        beginAtZero: true
      },
    },
    maintainAspectRatio: false,
    layout: {
      padding: {
        left: 10,
        right: 25,
        top: 25,
        bottom: 0
      }
    },
    legend: {
      display: false
    },
    tooltips: {
      backgroundColor: "rgb(255,255,255)",
      bodyFontColor: "#858796",
      titleMarginBottom: 10,
      titleFontColor: '#6e707e',
      titleFontSize: 14,
      borderColor: '#dddfeb',
      borderWidth: 1,
      xPadding: 15,
      yPadding: 15,
      displayColors: false,
      intersect: false,
      mode: 'index',
      caretPadding: 10,
    }
  }
});
