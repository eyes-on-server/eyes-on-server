// definição das variaveis globais

var temCPU;
var temRAM;
var temDisco;
var servidorAtual;

var nomeProcessos = []
var numeroProcessos = []

var memoryData = []
var cpuData = [];
var diskData = []
var dataRegistro = []


function buscarServidores() {

    var fk = sessionStorage.FK_EMPRESA


    // Comando a ser realizado no banco de dados
    var query = `SELECT id_servidor, nome_servidor FROM Servidor WHERE fk_empresa = ${fk};`;

// Mysql: SELECT id_servidor, nome_servidor FROM Servidor WHERE fk_empresa = "${fk}";

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

                            // console.log(`esse é ${id_servidor} e o ${servidor}`)

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

    var intervaloEmMilissegundos = 10000; 
    // console.log(select_servidores.options[select_servidores.selectedIndex].text)
    servidorAtual = select_servidores.options[select_servidores.selectedIndex].text

    clearInterval(setInterval(graficoReal, intervaloEmMilissegundos))
    clearInterval(setInterval(graficoRealCPU, intervaloEmMilissegundos))
    clearInterval(setInterval(graficoRealDisco, intervaloEmMilissegundos))
    clearInterval(setInterval(processos, intervaloEmMilissegundos))

    // Comando a ser realizado no banco de dados
    var query = `
        SELECT Tipo, servidor 
        FROM view_componentes_servidores  
        WHERE servidor = '${servidorAtual}';`;

// Mysql: select Tipo, servidor from view_componentes_servidores  
//                      where servidor = "${servidorAtual}";

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


                    }


                    processos()
                    graficoReal()
                    graficoRealCPU()
                    graficoRealDisco()


                    setInterval(graficoReal, intervaloEmMilissegundos);
                    setInterval(graficoRealCPU, intervaloEmMilissegundos);
                    setInterval(graficoRealDisco, intervaloEmMilissegundos);
                    setInterval(processos, intervaloEmMilissegundos);

                });
            } else {
                resposta.text().then((texto) => {

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


    var combo = document.getElementById("select_servidores");
    var fk = combo.value



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


                memoryData = []



                for (let i = 0; i < json.length; i++) {
                    var dados = json[i]

                    

                    memoryData.push(dados.Valor)

                }

                

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

    var combo = document.getElementById("select_servidores");
    var fk = combo.value

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


                cpuData = []
                dataRegistro = []

                for (let i = 0; i < json.length; i++) {
                    var dados = json[i]

                    cpuData.push(dados.Valor)
                    dataRegistro.push(dados.Horario_Captura)

                }

                

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


    var combo = document.getElementById("select_servidores");
    var fk = combo.value

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


                diskData = []
                dataRegistro = []

                for (let i = 0; i < json.length; i++) {
                    var dados = json[i]

                    diskData.push(dados.Valor)
                    dataRegistro.push(dados.Horario_Captura)

                }


                diskData[diskData.length - 1] += 1
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
    chartReal.data.labels = dataRegistro.reverse();

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




    chamarDados(cpuData, memoryData, diskData, temCPU, temRAM, temDisco)

    
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
                reverse: true
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
    // console.log(vetor);

    var soma = 0;

    for (let i = 0; i < vetor.length; i++) {
        soma += parseFloat(vetor[i]);
    }

    // console.log(soma);

    return (soma / vetor.length).toFixed(2);
}

// Função para imprimir o mínimo e máximo de um vetor em uma div
function imprimirMinEMax(titulo, id, vetor) {
    var div = document.getElementById("analysis");
    div.innerHTML += `<h5>${titulo}</h5>
                Mínimo: ${encontrarMinimo(vetor)}%&nbsp&nbsp&nbsp&nbsp Máximo: ${encontrarMaximo(vetor)}%<br/>
                Média ${id}: ${fazerMedia(vetor)}%<br/><br/>`;
}

function chamarDados(dadoCpu, dadoMemoria, dadoDisco, temCPU, temRAM, temDisco) {

    var div = document.getElementById("analysis");
    div.innerHTML = ``;


    // Chamando a função para cada vetor
    if (temCPU) {
        imprimirMinEMax('Dados da CPU', 'da CPU', dadoCpu);
    } else { }
    if (temRAM) {
        imprimirMinEMax('Dados da Memória', 'da Memória', dadoMemoria);
    } else { }

    if (temDisco) {
        imprimirMinEMax('Dados do Disco', 'do Disco', dadoDisco);
    } else { }

    // Convertendo strings para objetos de data
    var datas = dataRegistro.map(converterParaData);

    // Chamando a função para o vetor de datas
    imprimirMenorEMaior('result', datas);

    verificarExibirCorrelacaoCPURAM()
    verificarExibirCorrelacaoRAMDisco()
    verificarExibirCorrelacaoCPUDisco()
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



function calcularCorrelacaoPearson(x, y) {
    var n = x.length;

    // Média de x e y
    var mediaX = math.mean(x);
    var mediaY = math.mean(y);

    // Desvio padrão de x e y
    var desvioPadraoX = math.std(x);
    var desvioPadraoY = math.std(y);

    // Covariância
    var covariancia = math.dot(x.map((xi, i) => xi - mediaX), y.map((yi, i) => yi - mediaY)) / n;

    // Coeficiente de correlação de Pearson
    var correlacao = covariancia / (desvioPadraoX * desvioPadraoY);

    return correlacao;
}

// Função para exibir a correlação em uma determinada div
function exibirCorrelacao(div, dadosX, dadosY, nomeX, nomeY) {
    if (dadosX.length === 0 || dadosY.length === 0) {
        div.innerHTML = `<h5>Não há dados suficientes para calcular a correlação entre ${nomeX} e ${nomeY}</h5>`;
    } else {
        var correlacao = calcularCorrelacaoPearson(dadosX, dadosY);
        div.innerHTML = `<h5>Correlação entre ${nomeX} e ${nomeY}: ${correlacao.toFixed(2)}</h5><br/>`;
    }
}



function verificarExibirCorrelacaoCPURAM() {
    var div1 = document.getElementById('div1');
    if (temCPU && temRAM) {
        exibirCorrelacao(div1, cpuData, memoryData, 'CPU', 'RAM');
    } else {
        div1.style.display = "none";
    }
}

// Função para verificar e exibir correlação entre RAM e Disco
function verificarExibirCorrelacaoRAMDisco() {
    var div2 = document.getElementById('div2');
    if (temRAM && temDisco) {
        // console.log(diskData)
        exibirCorrelacao(div2, memoryData, diskData, 'RAM', 'Disco');
    } else {
        div2.style.display = "none";
    }
}

// Função para verificar e exibir correlação entre CPU e Disco
function verificarExibirCorrelacaoCPUDisco() {
    var div3 = document.getElementById('div3');
    if (temCPU && temDisco) {
        exibirCorrelacao(div3, cpuData, diskData, 'CPU', 'Disco');
    } else {
        div3.style.display = "none";
    }
}






function processos() {

    var combo = document.getElementById("select_servidores");
    var fk = combo.value

    fetch("/otavioRoute/processos", {
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


                nomeProcessos = []
                numeroProcessos = []


                for (let i = 0; i < json.length; i++) {
                    var dados = json[i]

                    // console.log(dados.Valor)

                    nomeProcessos.push(dados.nome_processos)
                    numeroProcessos.push(dados.quantidade)

                }
                gerarTagCloud()

            });
        } else {
            throw ("Houve um erro ao tentar listar os servidores!");
        }
    }).catch(function (resposta) {
        console.log(`#ERRO AO LISTAR: ${resposta}`);
    });
    return false;
}



var chart;

function gerarTagCloud() {
    anychart.onDocumentReady(function () {


        // Combine os dados em um array de objetos
        var data = [];
        for (var i = 0; i < nomeProcessos.length; i++) {
            data.push({ x: nomeProcessos[i], value: numeroProcessos[i] });
        }

        // Calculando a quantidade total de processos
        var totalProcessos = data.reduce(function (sum, item) {
            return sum + item.value;
        }, 0);

        document.getElementById("idQtdprocessosTotal").innerHTML = totalProcessos;

        // Verifique se o gráfico já foi criado
        if (!chart) {
            // Se não existir, crie o gráfico
            chart = anychart.tagCloud(data);

            // Definindo o título com a quantidade total de processos
            chart.title('Total de Processos: ' + totalProcessos);

            // Vamos setar o angulo das palavras e a disposição dentro da nuvem
            chart.angles([0, 0, 0]);

            // Criando e configurando a color scale
            var customColorScale = anychart.scales.linearColor();
            customColorScale.colors(["#4D9B73", "#47A781", "#3D946F", "#348D66",
                "#297954", "#227848", "#145B36", "#0F4F2B"]);

            // Utilizando o color scale criado
            chart.colorScale(customColorScale);

            // Ativando as cores
            chart.colorRange(true);

            // Definindo o range e a transparência das cores
            chart.colorRange().length('95%');

            // Definindo a cor do background
            chart.background().fill({ keys: ["#ddd"], angle: 100 });

            // Montando o gráfico
            chart.container("container");
            chart.draw();

            // Removendo a nota de crédito da AnyChart
            document.getElementsByClassName('anychart-credits')[0].remove();
        } else {
            // Se já existir, atualize os dados e redesenhe
            chart.data(data);
            chart.title('Total de Processos: ' + totalProcessos);
            chart.draw();
        }
    });
}


function definirHorario() {
    // Crie um novo objeto Date
    var dataAtual = new Date();

    // Obtenha as informações desejadas
    var dia = dataAtual.getDate();
    var mes = dataAtual.getMonth() + 1; // Os meses começam do zero, então adicione 1
    var ano = dataAtual.getFullYear();
    var hora = dataAtual.getHours();
    var minuto = dataAtual.getMinutes();

    // Formate a saída adicionando zeros à esquerda quando necessário
    mes = mes < 10 ? '0' + mes : mes;
    dia = dia < 10 ? '0' + dia : dia;
    hora = hora < 10 ? '0' + hora : hora;
    minuto = minuto < 10 ? '0' + minuto : minuto;

    // Exiba a data e hora atual formatadas
    var comeco = 'Início das medições em: ' + ano + '-' + mes + '-' + dia + ' ' + hora + ':' + minuto;

    var divhora = document.getElementById("hora");
    divhora.title = `${comeco}`
}