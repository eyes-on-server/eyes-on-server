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

    const diasSemana = [
      "Domingo",
      "Segunda-Feira",
      "Terça-Feira",
      "Quarta-Feira",
      "Quinta-Feira",
      "Sexta-Feira",
      "Sábado",
      "Domingo",
    ];

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

function formatDatabaseDate(date) {
  let dataObtida = date.slice(0, 10);
  let splitList = dataObtida.split("-");
  let reversedList = splitList.reverse();
  let newDate = reversedList.join("/");

  return newDate;
}
function popularTabelaQueda() {
  document.getElementById("tabela_queda_servidores").innerHTML = "";

  fetch(`/percentQueda/popularTabelaQueda`)
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

function popularGrafico(idServidor) {
  let dados = [];
  let labels = [];

  document.getElementById("graficoChanceDeQueda").style.display = "none";

  fetch(`/percentQueda/carregarDadosServidor/${idServidor}`)
    .then((resultado) => {
      if (resultado.ok) {
        console.log(JSON.stringify(resultado));
        
        resultado.json().then(
          function(json) {
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

// function downtimePorDia() {
//   let dados = [];
//   let labels = [];

//   document.getElementById("graficoMonetarioDiario").style.display = "none";

//   fetch(`/downtime/downtimePorDia/${fkEmpresa}`)
//     .then((resultado) => {
//       if (resultado.ok) {
//         console.log(JSON.stringify(resultado));

//         resultado.json().then((json) => {
//           for (var i = 0; i < json.length; i++) {
//             dados.push((json[i].total_prejuizo * Math.pow(10, -9)).toFixed(2));
//             labels.push(formatDatabaseDate(json[i].data_downtime));
//           }

//           graficoMonetarioDiario.data.labels = labels.reverse();
//           graficoMonetarioDiario.data.datasets[0].data = dados.reverse();

//           graficoMonetarioDiario.update();

//           document.getElementById("graficoMonetarioDiario").style.display =
//             "flex";
//           document.getElementById("divAguardandoDadosDowntime").style.display =
//             "none";
//         });
//       } else {
//         console.error("Nao foram encontrados registros!");

//         document.getElementById("graficoMonetarioDiario").style.display =
//           "none";
//         document.getElementById("divAguardandoDadosDowntime").style.display =
//           "flex";
//       }
//     })
//     .catch((erro) => {
//       console.log("Erro no fetch!");
//       console.log(erro);
//     });
// }
function executarFuncoesPrevisao() {

  popularTabelaQueda()
  // downtimePorDia();
}
