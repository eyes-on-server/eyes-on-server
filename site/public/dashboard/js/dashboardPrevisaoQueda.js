user_name.innerHTML = sessionStorage.NOME_USER;
company_name.innerHTML = sessionStorage.NOME_FANTASIA;

document.getElementById("graficoCorrelacao").style.display = "none";

// Variáveis Globais
var fkEmpresa = sessionStorage.FK_EMPRESA;
var dataSistema = "";

// Definindo timer ---------------------------
(function getDatetime() {
  setInterval(() => {
    var now = new Date();
    var dataAtual = now.toLocaleString();
    var dia = now.getDay();


    document.getElementById(
      "dataSistema"
    ).innerHTML = `${diasSemana[dia]}, ${dataAtual}`;

    dataSistema = formatDate(now, "yy-mm-dd");
  }, 1000);
})();

function formatDate(date, format) {
  const map = {
    mm: date.getMonth() + 1,
    dd: date.getDate(),
    yy: date.getFullYear(),
  };

  return format.replace(/mm|dd|yy|yyy/gi, (matched) => map[matched]);
}

function dataAtual(){
 var date = new Date()
 const map = {
    "mm": date.getMonth() + 1,
    "dd": date.getDate(),
    "yy": date.getFullYear(),
  };

  var data = `${map.yy}-${map.mm}-${map.dd}`
  return data
}

function dataAnterior(){
  var date = new Date()
  const map = {
     "mm": date.getMonth() + 1,
     "dd": date.getDate() - 1,
     "yy": date.getFullYear(),
   };
 
   var data = `${map.yy}-${map.mm}-${map.dd}`
   return data
 }

function formatDatabaseDate(date) {
  let dataObtida = date.slice(0, 10);
  let splitList = dataObtida.split("-");
  let reversedList = splitList.reverse();
  let newDate = reversedList.join("/");

  return newDate;
}
function popularTabelaQueda() {
  var data = dataAnterior()

  console.log(data)
  document.getElementById("tabela_queda_servidores").innerHTML = "";

  fetch(`/percentQueda/popularTabelaQueda/'${data}'/${fkEmpresa}`)
    .then((resposta) => {
      if (resposta.ok) {
        console.log(JSON.stringify(resposta));

        resposta.json().then((json) => {
          for (var i = 0; i < json.length; i++) {
            document.getElementById("tabela_queda_servidores").innerHTML += `
                  <tr id='item${json[i].id_servidor
              }' class='linha-tabela' onclick='popularGrafico(${json[i].id_servidor
              })'>
                      <td>${json[i].id_servidor}</td>
                      <td>${json[i].local_servidor}</td>
                      <td>${json[i].nome_servidor}</td>
                      <td>${(json[i].chanceDiaria).toFixed(2)}</td>
                     
                  </tr>
              `;
          }
        });
      } else {
        console.error(
          "Não foram encontrados registros para a tabela dos servidores!"
        );
      }
    })
    .catch((erro) => {
      console.log(erro);
    });
}

function popularTabelaQuedaPrevisao() {
  document.getElementById("tabela_previsao_queda_servidores").innerHTML = "";

  var data = dataAtual()

  fetch(`/percentQueda/popularTabelaQuedaPrevisao/'${data}'/${fkEmpresa}`)
    .then((resposta) => {
      if (resposta.ok) {
        console.log(JSON.stringify(resposta));

        resposta.json().then((json) => {
          for (var i = 0; i < json.length; i++) {
            document.getElementById("tabela_previsao_queda_servidores").innerHTML += `
                  <tr id='item${json[i].id_servidor
              }' class='linha-tabela' onclick='popularGraficoPrevisao(${json[i].id_servidor
              })'>
                      <td>${json[i].id_servidor}</td>
                      <td>${json[i].local_servidor}</td>
                      <td>${json[i].nome_servidor}</td>
                      <td>${(json[i].chancePrevisto).toFixed(2)}</td>
                     
                  </tr>
              `;
          }
        });
      } else {
        console.error(
          "Não foram encontrados registros para a tabela dos servidores!"
        );
      }
    })
    .catch((erro) => {
      console.log(erro);
    });
}

function atualizarKPI() {

  fetch(`/percentQueda/atualizarKPI/${fkEmpresa}`)
    .then((resposta) => {
      if (resposta.ok) {
        console.log(JSON.stringify(resposta));
        resposta.json().then((json) => {
          console.log(json)
          for (var i = 0; i < json.length; i++){
            
            document.getElementById("idPercentQueda").innerHTML = `${json[i].chanceQueda}`
            document.getElementById("idPercentPrevisao").innerHTML = `${json[i].chancePrevista}`

          }
        });
        } else {
        console.error(
          "Não foram encontrados registros para a tabela dos servidores!"
        );
      }
    })
    .catch((erro) => {
      console.log(erro);
    });

}





function popularPrimeiroGrafico() {
  let dados = [];
  let labels = [];

  var data = dataAnterior()

  document.getElementById("graficoChanceDeQueda").style.display = "none";

  fetch(`/percentQueda/carregarDadosServidor/'${data}'/${fkEmpresa}`)
    .then((resultado) => {
      if (resultado.ok) {
        console.log(JSON.stringify(resultado));

        resultado.json().then(
          function (json) {
            console.log(json);

            for (var i = 0; i < json.length; i++) {

              dados.push(json[i].chanceDiaria.toFixed(2));
              labels.push(formatDatabaseDate(json[i].dataRegistro));
            }

            graficoChanceDeQueda.data.labels = labels;
            graficoChanceDeQueda.data.datasets[0].data = dados;

            graficoChanceDeQueda.update();

            document.getElementById("graficoChanceDeQueda").style.display =
              "flex";
            document.getElementById("divAguardandoDadosChanceDeQueda").style.display =
              "none";
          });
      } else {
        console.error("Nao foram encontrados registros!");

        document.getElementById("graficoChanceDeQueda").style.display =
          "none";
        document.getElementById("divAguardandoDadosDowntime").style.display =
          "flex";
      }
    })
    .catch((erro) => {
      console.log("Erro no fetch!");
      console.log(erro);
    });
}


function popularGrafico(idServidor) {
  let dados = [];
  let labels = [];

  document.getElementById("graficoChanceDeQueda").style.display = "none";


  fetch(`/percentQueda/carregarDadosServidor2/${idServidor}/${fkEmpresa}`)
    .then((resultado) => {
      if (resultado.ok) {
        console.log(JSON.stringify(resultado));

        resultado.json().then(
          function (json) {
            console.log(json);

            for (var i = 0; i < json.length; i++) {

              dados.push(json[i].chanceDiaria.toFixed(2));
              labels.push(formatDatabaseDate(json[i].dataRegistro));
            }

            graficoChanceDeQueda.data.labels = labels;
            graficoChanceDeQueda.data.datasets[0].data = dados;

            graficoChanceDeQueda.update();

            document.getElementById("graficoChanceDeQueda").style.display =
              "flex";
            document.getElementById("divAguardandoDadosChanceDeQueda").style.display =
              "none";
          });
      } else {
        console.error("Nao foram encontrados registros!");

        document.getElementById("graficoChanceDeQueda").style.display =
          "none";
        document.getElementById("divAguardandoDadosChanceDeQueda").style.display =
          "flex";
      }
    })
    .catch((erro) => {
      console.log("Erro no fetch!");
      console.log(erro);
    });
}

function popularGraficoPrevisao(idServidor) {
  let dados = [];
  let labels = [];

  document.getElementById("graficoChanceDeQueda").style.display = "none";

  fetch(`/percentQueda/carregarDadosServidorPrevisao/${idServidor}/${fkEmpresa}`)
    .then((resultado) => {
      if (resultado.ok) {
        console.log(JSON.stringify(resultado));

        resultado.json().then(
          function (json) {
            console.log(json);

            for (var i = 0; i < json.length; i++) {

              dados.push(json[i].chancePrevisto.toFixed(2));
              labels.push(formatDatabaseDate(json[i].dataRegistro));
            }

            graficoChanceDeQueda.data.labels = labels;
            graficoChanceDeQueda.data.datasets[0].data = dados;

            graficoChanceDeQueda.update();

            document.getElementById("graficoChanceDeQueda").style.display =
              "flex";
            document.getElementById("divAguardandoDadosChanceDeQueda").style.display =
              "none";
          });
      } else {
        console.error("Nao foram encontrados registros!");

        document.getElementById("graficoChanceDeQueda").style.display =
          "none";

      }
    })
    .catch((erro) => {
      console.log("Erro no fetch!");
      console.log(erro);
    });
}


function executarFuncoesPrevisao() {

  popularTabelaQueda(),
  atualizarKPI(),
    popularTabelaQuedaPrevisao(),
    popularPrimeiroGrafico(),
    dataAtual()
  // downtimePorDia();
}
