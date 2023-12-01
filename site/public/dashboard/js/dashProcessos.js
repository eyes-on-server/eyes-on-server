// Definição de componentes e kpis

var temCPU;
var temRAM;
var temDisco;
var servidorAtual;
var memoryData = []
// Seus dados para os conjuntos de dados
var cpuData = [];
// var memoryData = [30, 50, 90, 40, 60, 70, 80, 10, 55, 20];
var diskData = [65, 35, 5, 45, 55, 15, 25, 75, 95, 70];
var dataRegistro = []

function buscarServidores() {

    var fk = sessionStorage.FK_EMPRESA


    // Comando a ser realizado no banco de dados
    var query = `SELECT id_servidor, nome_servidor FROM Eyes_On_Server.Servidor WHERE fk_empresa = "${fk}";`;

    // Limpar as options quando trocar de setor
    select_servidores.innerHTML = `<option value="" selected disabled>Servidores</option>`;

    fetch("/otavioRoute/buscarInformacoes", {
        method: "POST",
        headers: {
            "Content-type": "application/json",
        },
        body: JSON.stringify({
            selectServer: query,
        }),
    })
        .then(function (resposta) {
            if (resposta.status == 200) {
                console.log(`chegou no feach`)
                resposta.json().then((json) => {
                    // Criamos um vetor para conferir se aquele servidor já foi inserido no HTML
                    var servidores = [];
                    // Esse for roda todo o json de resposta da query e insere o nome dos setores no select do HTML
                    select_servidores.innerHTML = `<option value="">Selecionar Servidor</option>`;
                    for (var i = 0; i < json.length; i++) {
                        if (!servidores.includes(json[i].nome_servidor)) {
                            var id_servidor = json[i].id_servidor;
                            var servidor = json[i].nome_servidor;

                            select_servidores.innerHTML += `<option value="${id_servidor}">${servidor}</option>`;

                            console.log(`esse é ${id_servidor} e o ${servidor}`)

                        }
                    }
                });
            } else {
                console.log(
                    "Erro ao realizar a busca dos servidores <function buscarServidores>"
                );
                resposta.text().then((texto) => {
                    console.log(resposta);
                });
            }
        })
        .catch((erro) => {
            console.log("Erro ao realizar a busca: " + erro);
        });
}




function setDados() {

    var intervaloEmMilissegundos = 10000; // Por exemplo, a cada 60 segundos
    console.log(select_servidores.options[select_servidores.selectedIndex].text)
    servidorAtual = select_servidores.options[select_servidores.selectedIndex].text

    clearInterval(setInterval(graficoReal, intervaloEmMilissegundos))
    clearInterval(setInterval(graficoRealCPU, intervaloEmMilissegundos))
    clearInterval(setInterval(graficoRealDisco, intervaloEmMilissegundos))

    // Comando a ser realizado no banco de dados
    var query = `select Tipo, servidor from Eyes_On_Server.view_componentes_servidores  
                     where servidor = "${servidorAtual}";`;

    fetch("/otavioRoute/setDados", {
        method: "POST",
        headers: {
            "Content-type": "application/json",
        },
        body: JSON.stringify({
            selectServer: query,
        }),
    })
        .then(function (resposta) {
            if (resposta.status == 200) {
                console.log(`chegou no feach`)
                resposta.json().then((json) => {


                    temCPU = false
                    temRAM = false
                    temDisco = false


                    for (var i = 0; i < json.length; i++) {

                        var dados = json[i];

                        if (!temCPU) {
                            temCPU = dados.Tipo == "USO_PORCENTAGEM_CPU";
                        }

                        if (!temRAM) {
                            temRAM = dados.Tipo == "USO_MEMORIA_PORCENTAGEM";
                        }

                        if (!temDisco) {
                            temDisco = dados.Tipo == "USO_DISCO_PORCENTAGEM";
                        }


                        // console.log(temCPU, temRAM, temDisco)
                        console.log(dados.Tipo)

                    }



                    graficoReal()
                    graficoRealCPU()
                    graficoRealDisco()


                    setInterval(graficoReal, intervaloEmMilissegundos);
                    setInterval(graficoRealCPU, intervaloEmMilissegundos);
                    setInterval(graficoRealDisco, intervaloEmMilissegundos);

                });
            } else {
                console.log(
                    "Erro ao realizar a busca dos servidores <function buscarServidores>"
                );
                resposta.text().then((texto) => {
                    console.log(resposta);
                });
            }
        })
        .catch((erro) => {
            console.log("Erro ao realizar a busca: " + erro);
        });
}




function definirKpis() {

    if (!temCPU) {
        document.getElementById("kpiCpu").style.display = "none";
    } else {
        document.getElementById("kpiCpu").style.display = "block";
    }

    if (!temRAM) {
        document.getElementById("kpiRam").style.display = "none";
    } else {
        document.getElementById("kpiRam").style.display = "block";
    }

    if (!temDisco) {
        document.getElementById("kpiDisco").style.display = "none";
    } else {
        document.getElementById("kpiDisco").style.display = "block";
    }



}







function graficoReal() {

    console.log(select_servidores.options[select_servidores.selectedIndex].text)

    var combo = document.getElementById("select_servidores");
    var fk = combo.value

    console.log('vsi prfv ' + fk)

    // Obter o valor selecionado


    fetch("/otavioRoute/grafico", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            fkEmpresa_html: fk
        })
    }).then(function (resposta) {

        if (resposta.ok) {
            resposta.json().then(json => {
                console.log(JSON.stringify(json))

                // var cpuData = []
                memoryData = []
                // var diskData = []


                for (let i = 0; i < json.length; i++) {
                    var dados = json[i]

                    // console.log(dados.Valor)

                    memoryData.push(dados.Valor)

                }

                // console.log(temCPU, temRAM, temDisco)
                console.log(servidorAtual)
                console.log(memoryData)
                console.log(fk)
                definirKpis()
                situacao()
                loadData()

            });
        } else {
            throw ("Houve um erro ao tentar listar os servidores!");
        }
    }).catch(function (resposta) {
        console.log(`#ERRO AO LISTAR: ${resposta}`);
    });
    return false;
}





function graficoRealCPU() {

    console.log(select_servidores.options[select_servidores.selectedIndex].text)

    var combo = document.getElementById("select_servidores");
    var fk = combo.value

    console.log('vsi prfv ' + fk)

    // Obter o valor selecionado


    fetch("/otavioRoute/graficoCPU", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            fkEmpresa_html: fk
        })
    }).then(function (resposta) {

        if (resposta.ok) {
            resposta.json().then(json => {
                console.log(JSON.stringify(json))

                cpuData = []
                dataRegistro = []

                for (let i = 0; i < json.length; i++) {
                    var dados = json[i]

                    cpuData.push(dados.Valor)
                    dataRegistro.push(dados.Horario_Captura)

                }

                // console.log(temCPU, temRAM, temDisco)
                console.log(servidorAtual)
                console.log("aaaaaaa")

                console.log(cpuData)
                console.log(dataRegistro)
                console.log(fk)
                definirKpis()
                situacao()
                loadData()

            });
        } else {
            throw ("Houve um erro ao tentar listar os servidores!");
        }
    }).catch(function (resposta) {
        console.log(`#ERRO AO LISTAR: ${resposta}`);
    });
    return false;
}




function graficoRealDisco() {

    console.log(select_servidores.options[select_servidores.selectedIndex].text)

    var combo = document.getElementById("select_servidores");
    var fk = combo.value

    console.log('vsi prfv ' + fk)

    // Obter o valor selecionado


    fetch("/otavioRoute/graficoDisco", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            fkEmpresa_html: fk
        })
    }).then(function (resposta) {

        if (resposta.ok) {
            resposta.json().then(json => {
                console.log(JSON.stringify(json))

                diskData = []
                dataRegistro = []

                for (let i = 0; i < json.length; i++) {
                    var dados = json[i]

                    diskData.push(dados.Valor)
                    dataRegistro.push(dados.Horario_Captura)

                }

                // console.log(temCPU, temRAM, temDisco)
                console.log(servidorAtual)
                console.log("bbbbbbbbbbbbb")

                console.log(diskData)
                console.log(dataRegistro)
                console.log(fk)
                definirKpis()
                situacao()
                loadData()


            });
        } else {
            throw ("Houve um erro ao tentar listar os servidores!");
        }
    }).catch(function (resposta) {
        console.log(`#ERRO AO LISTAR: ${resposta}`);
    });
    return false;
}


// Função para carregar dados no gráfico
function loadData() {
    chartReal.data.labels = dataRegistro;

    // Adiciona ou remove o conjunto de dados com base nas condições
    chartReal.data.datasets = [];

    if (temCPU) {
        chartReal.data.datasets.push({
            label: 'Uso da CPU (%)',
            data: cpuData,
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 2,
            fill: false,
            lineTension: 0
        });
    }

    if (temRAM) {
        chartReal.data.datasets.push({
            label: 'Uso da Memória (%)',
            data: memoryData,
            borderColor: 'rgba(128, 0, 128, 1)',
            borderWidth: 2,
            fill: false,
            lineTension: 0
        });
    }

    if (temDisco) {
        chartReal.data.datasets.push({
            label: 'Uso do Disco (%)',
            data: diskData,
            borderColor: 'rgba(255, 0, 0, 1)',
            borderWidth: 2,
            fill: false,
            lineTension: 0
        });
    }

    chartReal.update();
    chamarDados()
}

// Configuração inicial do gráfico
var ctx = document.getElementById('chartReal').getContext('2d');
var chartReal = new Chart(ctx, {
    type: 'line',
    data: {
        labels: dataRegistro,
        datasets: []
    },
    options: {
        scales: {
            x: [{
                type: 'linear',
                position: 'bottom',
                reverse: false
            }],
            y: [{
                ticks: {
                    beginAtZero: true,
                    max: 100
                }
            }]
        }
    }
});







// Função para encontrar o valor mínimo em um vetor
function encontrarMinimo(vetor) {
    return Math.min.apply(null, vetor);
}

// Função para encontrar o valor máximo em um vetor
function encontrarMaximo(vetor) {
    return Math.max.apply(null, vetor);
}

function fazerMedia(vetor) {
    var soma = 0;
    for (let i = 0; i < vetor.length; i++) {
        soma += vetor[i];
    }
    return soma / vetor.length;

}

// Função para imprimir o mínimo e máximo de um vetor em uma div
function imprimirMinEMax(titulo, id, vetor) {
    var div = document.getElementById("analysis");
    div.innerHTML += `<h5>${titulo}</h5>
                Mínimo: ${encontrarMinimo(vetor)}%&nbsp&nbsp&nbsp&nbsp Máximo: ${encontrarMaximo(vetor)}%<br/>
                Média ${id}: ${fazerMedia(vetor)}%<br/><br/>`;
}

function chamarDados() {

    var div = document.getElementById("analysis");
    div.innerHTML = ``;
    // Chamando a função para cada vetor
    imprimirMinEMax('Dados da CPU', 'da CPU', cpuData);
    imprimirMinEMax('Dados da Memória', 'da Memória', memoryData);
    imprimirMinEMax('Dados do Disco', 'do Disco', diskData);

    // Convertendo strings para objetos de data
    var datas = dataRegistro.map(converterParaData);

    // Chamando a função para o vetor de datas
    imprimirMenorEMaior('result', datas);
}


function converterParaData(horario) {
    var partes = horario.split(':');
    return new Date(2000, 0, 1, partes[0], partes[1], partes[2]);
}

// Função para encontrar o menor valor em um vetor de datas
function encontrarMenor(data) {
    return new Date(Math.min.apply(null, data));
}

// Função para encontrar o maior valor em um vetor de datas
function encontrarMaior(data) {
    return new Date(Math.max.apply(null, data));
}

// Função para imprimir o menor e o maior valor em uma div
function imprimirMenorEMaior(id, data) {
    var div = document.getElementById("analysis");
    div.innerHTML += `Horário contemplado: ${encontrarMenor(data).toLocaleTimeString()} a ${encontrarMaior(data).toLocaleTimeString()}`;
}

// Convertendo strings para objetos de data
// var datas = dataRegistro.map(converterParaData);

// // Chamando a função para o vetor de datas
// imprimirMenorEMaior('result', datas);






var controle = 1
document.getElementById("texto").innerHTML = "Resumo dos dados do gráfico"

function trocarCards() {

    if (controle == 1) {
        var analysis = document.getElementById("analysis");
        analysis.style.display = "none";

        var correlacao = document.getElementById("correlacao");
        correlacao.style.display = "block";

        document.getElementById("texto").innerHTML = "Corelação entre os dados do gráfico"
        controle++
        corelacao()


    } else {
        var correlacao = document.getElementById("correlacao");
        correlacao.style.display = "none";

        var analysis = document.getElementById("analysis");
        analysis.style.display = "block";

        document.getElementById("texto").innerHTML = "Resumo dos dados do gráfico"
        controle--

    }
}



















// Busca os nomes na sessionStorage
function nomes() {

    var fk = sessionStorage.FK_EMPRESA
    nome_do_usuario.innerHTML = sessionStorage.NOME_USER;
    nome_da_empresa.innerHTML = sessionStorage.NOME_FANTASIA;

}



function situacao() {

    var valorPosicaoVetorCpu = cpuData[cpuData.length - 1];
    var valorPosicaoVetorRam = memoryData[memoryData.length - 1];
    var valorPosicaoVetorDisco = diskData[diskData.length - 1];

    // Variável para armazenar o título e descrição
    var tituloCpu;
    var descricaocpu;

    var tituloRam;
    var descricaoram;

    var tituloDisco;
    var descricaodisco;

    var divCpuT = document.getElementById("situacaocpu");
    var divCpuD = document.getElementById("abbrCpu");

    var divRamT = document.getElementById("situacaoram");
    var divRamD = document.getElementById("abbrRam");

    var divDiscoT = document.getElementById("situacaoDisco");
    var divDiscoD = document.getElementById("abbrDisco");

    // Verifica a condição

    if (temCPU) {
        if (valorPosicaoVetorCpu < 75) {

            tituloCpu = "Ideal";
            descricaoCpu = "Registro abaixo de 75%"

            divCpuT.innerHTML = `${tituloCpu}`;
            divCpuD.title = `${descricaoCpu}`;

        } else if (valorPosicaoVetorCpu >= 75 && valorPosicaoVetorCpu < 85) {

            tituloCpu = "Prevenção";
            descricaoCpu = "Registro entre 75% e 84%"

            divCpuT.innerHTML = `${tituloCpu}`;
            divCpuD.title = `${descricaoCpu}`;

        } else if (valorPosicaoVetorCpu >= 85 && valorPosicaoVetorCpu < 95) {

            tituloCpu = "Perigo";
            descricaoCpu = "Registro entre 85% e 94%"

            divCpuT.innerHTML = `${tituloCpu}`;
            divCpuD.title = `${descricaoCpu}`;

        } else if (valorPosicaoVetorCpu >= 95) {

            tituloCpu = "Emergência";
            descricaoCpu = "Registro entre 75% e 85%"

            divCpuT.innerHTML = `${tituloCpu}`;
            divCpuD.title = `${descricaoCpu}`;

        }
    }
    if (temRAM) {
        if (valorPosicaoVetorRam < 85) {

            tituloRam = "Ideal";
            descricaoram = "Registro abaixo de 85%"

            divRamT.innerHTML = `${tituloRam}`;
            divRamD.title = `${descricaoram}`;

        } else if (valorPosicaoVetorRam >= 85 && valorPosicaoVetorRam < 90) {

            tituloRam = "Prevenção";
            descricaoram = "Registro entre 85% e 89%"

            divRamT.innerHTML = `${tituloRam}`;
            divRamD.title = `${descricaoram}`;

        } else if (valorPosicaoVetorCpu >= 90 && valorPosicaoVetorCpu < 95) {

            tituloRam = "Perigo";
            descricaoram = "Registro entre 90% e 94%"

            divRamT.innerHTML = `${tituloRam}`;
            divRamD.title = `${descricaoram}`;

        } else if (valorPosicaoVetorCpu >= 95) {

            tituloRam = "Emergência";
            descricaoram = "Registro maior que 95%"

            divRamT.innerHTML = `${tituloRam}`;
            divRamD.title = `${descricaoram}`;

        }
    }

    if (temDisco) {
        if (valorPosicaoVetorDisco < 70) {

            tituloDisco = "Ideal";
            descricaodisco = "Registro abaixo de 70%"

            divDiscoT.innerHTML = `${tituloDisco}`;
            divDiscoD.title = `${descricaodisco}`;

        } else if (valorPosicaoVetorDisco >= 70 && valorPosicaoVetorDisco < 75) {

            tituloDisco = "Prevenção";
            descricaodisco = "Registro entre 70% e 74%"

            divDiscoT.innerHTML = `${tituloDisco}`;
            divDiscoD.title = `${descricaodisco}`;

        } else if (valorPosicaoVetorDisco >= 75 && valorPosicaoVetorDisco < 80) {

            tituloDisco = "Perigo";
            descricaodisco = "Registro entre 75% e 80%"

            divDiscoT.innerHTML = `${tituloDisco}`;
            divDiscoD.title = `${descricaodisco}`;

        } else if (valorPosicaoVetorDisco >= 80) {

            tituloDisco = "Emergência";
            descricaodisco = "Registro acima de 80%"

            divDiscoT.innerHTML = `${tituloDisco}`;
            divDiscoD.title = `${descricaodisco}`;

        }
    }
}







function corelacao() {
    var resultados = calcularCorrelacoes(cpuData, memoryData, diskData, temCPU, temRAM, temDisco);

    console.log('Correlações:');


    var div = document.getElementById("correlacao");
    var div1 = document.getElementById("div1");
    var div2 = document.getElementById("div2");
    var div3 = document.getElementById("div3");

    div1.innerHTML = ``
    div2.innerHTML = ``
    div3.innerHTML = ``

    if (temCPU && temRAM) {

        div1.innerHTML = `<h5>Correlação entre CPU e RAM</h5>
    ${resultados['cpuData para memoryData'].toFixed(2)}%<br/><br/>`
    }

    if (temRAM && temDisco) {

        div2.innerHTML = `<h5>Correlação entre RAM e Disco</h5>
    ${resultados['memoryData para diskData'].toFixed(2)}%<br/><br/>`
    }

    if (temCPU && temDisco) {

        div3.innerHTML = `<h5>Correlação entre CPU e Disco</h5>
    ${resultados['cpuData para diskData'].toFixed(2)}%<br/><br/>`;
    }





    // console.log(`${key}: ${resultados[key].toFixed(2)}%`);


}


function calculateCorrelation(vetor1, vetor2) {
    if (vetor1.length !== vetor2.length) {
        throw new Error('Os vetores devem ter o mesmo comprimento');
    }

    var n = vetor1.length;

    // Calcula a média dos elementos nos vetores
    var meanVetor1 = vetor1.reduce(function (acc, val) {
        return acc + val;
    }, 0) / n;

    var meanVetor2 = vetor2.reduce(function (acc, val) {
        return acc + val;
    }, 0) / n;

    // Calcula os termos necessários para o coeficiente de correlação de Pearson
    var numerator = 0;
    var denominatorVetor1 = 0;
    var denominatorVetor2 = 0;

    for (var i = 0; i < n; i++) {
        var diffVetor1 = vetor1[i] - meanVetor1;
        var diffVetor2 = vetor2[i] - meanVetor2;

        numerator += diffVetor1 * diffVetor2;
        denominatorVetor1 += diffVetor1 ** 2;
        denominatorVetor2 += diffVetor2 ** 2;
    }

    // Calcula o coeficiente de correlação de Pearson
    var correlation = (numerator / Math.sqrt(denominatorVetor1 * denominatorVetor2)) * 100;

    // Garante que o resultado esteja dentro do intervalo [-100, 100]
    correlation = Math.min(100, Math.max(-100, correlation));

    return Math.abs(correlation); // Retorna o valor absoluto do resultado
}

function calcularCorrelacoes(cpuData, memoryData, diskData, temCPU, temRAM, temDisco) {
    var resultados = {};

    if (temCPU && temRAM) {
        resultados['cpuData para memoryData'] = calculateCorrelation(cpuData, memoryData);
    }

    if (temRAM && temDisco) {
        resultados['memoryData para diskData'] = calculateCorrelation(memoryData, diskData);
    }

    if (temCPU && temDisco) {
        resultados['cpuData para diskData'] = calculateCorrelation(cpuData, diskData);
    }

    return resultados;


}





// inicio do back de processos

// SELECT nome_processos, COUNT(*) AS quantidade
// FROM Eyes_On_Server.Processos
// GROUP BY nome_processos;
