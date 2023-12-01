const temperatura = [25.0, 28.0, 30.0, 22.0, 27.0];
const usoCpu = [10, 20, 30, 10, 25];

// Calcule a correlação entre os dados
const correlation = calculateCorrelation(temperatura, usoCpu);
console.log('Correlação entre Temperatura e Uso de CPU:', correlation);

const ctx = document.getElementById('graficoCpu').getContext('2d');

// Configurações do gráfico
const config = {
    type: 'scatter',
    data: {
        datasets: [{
            label: 'Dispersão',
            data: temperatura.map((value, index) => ({ x: value, y: usoCpu[index] })),
            borderColor: '#0000FF', // Cor de fundo
            borderWidth: 2
        }]
    },
    options: {
        scales: {
            x: {
                type: 'linear',
                position: 'bottom',
                title: {
                    display: true,
                    text: 'Temperatura'
                }
            },
            y: {
                type: 'linear',
                position: 'left',
                title: {
                    display: true,
                    text: 'Uso de CPU'
                }
            }
        },
        plugins: {
            title: {
                display: true,
                text: 'Gráfico de Correlação'
            }
        }
    }
};

const chart = new Chart(ctx, config);

const regressionLine = calculateLinearRegression(temperatura, usoCpu);

// Adicionar a linha de regressão linear ao gráfico
chart.data.datasets.push({
    label: 'Linha de Regressão',
    type: 'line',
    data: [
        { x: Math.min(...temperatura), y: regressionLine(Math.min(...temperatura)) },
        { x: Math.max(...temperatura), y: regressionLine(Math.max(...temperatura)) }
    ],
    borderColor: 'red',
    borderWidth: 4,
    fill: false
});
chart.update();

// Função para calcular a correlação
function calculateCorrelation(x, y) {
    if (x.length !== y.length) {
        throw new Error('Os arrays devem ter o mesmo comprimento');
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

// Função para calcular a média de um array
function calculateMean(array) {
    const sum = array.reduce((acc, value) => acc + value, 0);
    return sum / array.length;
}

// Função para calcular a regressão linear manualmente
function calculateLinearRegression(x, y) {
    if (x.length !== y.length) {
        throw new Error('Os arrays devem ter o mesmo comprimento');
    }

    const n = x.length;
    const meanX = calculateMean(x);
    const meanY = calculateMean(y);

    let numerator = 0.0;
    let denominator = 0.0;

    for (let i = 0; i < n; i++) {
        numerator += (x[i] - meanX) * (y[i] - meanY);
        denominator += Math.pow(x[i] - meanX, 2);
    }

    const m = numerator / denominator;  // Coeficiente angular
    const b = meanY - m * meanX;        // Interceptação y

    // Retornar a função da linha de regressão
    return (inputX) => m * inputX + b;
}

document.getElementById("correlacaoCPU").textContent = `CPU: ${(correlation * 100).toFixed(1)}%`
