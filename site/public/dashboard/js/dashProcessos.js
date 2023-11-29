// Definição de componentes e kpis

var temCPU;
var temRAM;
var temDisco;
var servidorAtual;

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
    console.log(select_servidores.options[select_servidores.selectedIndex].text)
    servidorAtual = select_servidores.options[select_servidores.selectedIndex].text


    // Comando a ser realizado no banco de dados
    var query = `select tipo, servidor from Eyes_On_Server.view_componentes_servidores
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
                    definirKpis()
                    situacao()
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




// Busca os nomes na sessionStorage
function nomes() {

    var fk = sessionStorage.FK_EMPRESA
    nome_do_usuario.innerHTML = sessionStorage.NOME_USER;
    nome_da_empresa.innerHTML = sessionStorage.NOME_FANTASIA;

}



function situacao() {

    var cpuData = [10, 30, 50, 70, 40, 20, 60, 80, 90, 45];
    var memoryData = [30, 50, 90, 40, 60, 70, 80, 10, 55, 20];
    var diskData = [65, 35, 5, 45, 55, 15, 25, 75, 95, 70];
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
    for (var key in resultados) {
        console.log(`${key}: ${resultados[key].toFixed(2)}%`);
    }

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






