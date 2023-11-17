function inicial() {
  nome_do_usuario.innerHTML = sessionStorage.NOME_USER;
  nome_da_empresa.innerHTML = sessionStorage.NOME_FANTASIA;

  chartArea.innerHTML = ``;
  chartArea.innerHTML = `<canvas id="GraficoDeLinha"></canvas>`;

  const dash = document.getElementById("GraficoDeLinha");

  chartArea2.innerHTML = ``;
  chartArea2.innerHTML = `<canvas id="GraficoDeLinha2"></canvas>`;

  const dash2 = document.getElementById("GraficoDeLinha2");

  new Chart(dash, {
    type: "line",
    data: {
      labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
      datasets: [
        {
          label: "# of Votes",
          data: [12, 19, 3, 5, 2, 3],
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

  new Chart(dash2, {
    type: "line",
    data: {
      labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
      datasets: [
        {
          label: "# of Votes",
          data: [12, 19, 3, 5, 2, 3],
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

inicial();
