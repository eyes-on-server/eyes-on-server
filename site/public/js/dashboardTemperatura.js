const ctxGraficoCpu = document.getElementById('graficoCpu')

function gerarGrafico(ctx, dados) {
    return new Chart(ctx, {
        type: 'line',
        data: {
            labels: ['21/11', '22/11', '23/11', '24/11', '25/11', '26/11', '27/11'],
            datasets: [{
                label: 'Temperatura',
                data: [12, 19, 3, 5, 2, 3, 90],
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    })
}

gerarGrafico(ctxGraficoCpu, [])