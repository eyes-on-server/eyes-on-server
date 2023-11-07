function inicial() {
  nome_do_usuario.innerHTML = sessionStorage.NOME_USER;
  nome_da_empresa.innerHTML = sessionStorage.NOME_FANTASIA;

  chartArea.innerHTML = ``;
  chartArea.innerHTML = `<canvas id="GraficoDeLinha"></canvas>`;

  const dash = document.getElementById("GraficoDeLinha");

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
}

inicial();
