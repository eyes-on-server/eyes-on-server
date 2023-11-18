user_name.innerHTML = sessionStorage.NOME_USER;
company_name.innerHTML = sessionStorage.NOME_FANTASIA;

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

function popularCards() {
  fetch(`/downtime/popularCards/${fkEmpresa}`)
    .then((resposta) => {
      if (resposta.ok) {
        resposta.json().then((json) => {
          console.log(JSON.stringify(json));

          document.getElementById("idTempoTotalDowntime").innerHTML =
            (json[0].total_downtime / 3600).toFixed(2) + " Horas";
          document.getElementById("idPrejuizoTotal").innerHTML =
            "R$" + Intl.NumberFormat().format(json[0].prejuizo_total);
        });
      } else {
        console.error("Não foi possível obter os dados!");

        document.getElementById("idTempoTotalDowntime").innerHTML = 0;
        document.getElementById("idPrejuizoTotal").innerHTML = 0;
      }
    })
    .catch((erro) => {
      console.error("Erro ao realizar fetch: " + erro);
    });
}

function popularTabela() {
  document.getElementById("tabela_downtime_servidores").innerHTML = "";

  fetch(`/downtime/popularTabela/${fkEmpresa}`)
    .then((resposta) => {
      if (resposta.ok) {
        console.log(JSON.stringify(resposta));
        resposta.json().then((json) => {
          for (var i = 0; i < json.length; i++) {
            document.getElementById("tabela_downtime_servidores").innerHTML += `
                <tr>
                    <td>${json[i].id_servidor}</td>
                    <td>${json[i].nome_servidor}</td>
                    <td>${(json[i].total_downtime / 3600).toFixed(2)}</td>
                    <td>R$${Intl.NumberFormat().format(
                      json[i].total_prejuizo
                    )}</td>
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

function downtimePorLocal() {
  let dados = [];
  let labels = [];

  fetch(`/downtime/downtimePorLocal/${fkEmpresa}`)
    .then((resultado) => {
      if (resultado.ok) {
        console.log(JSON.stringify(resultado));

        resultado.json().then((json) => {
          for (var i = 0; i < json.length; i++) {
            dados.push((json[i].total_prejuizo * Math.pow(10, -9)).toFixed(2));
            labels.push(json[i].local_servidor);
          }

          graficoPrejuizoSetores.data.labels = labels;
          graficoPrejuizoSetores.data.datasets[0].data = dados;

          graficoPrejuizoSetores.update();
        });
      } else {
        console.error("Nao foram encontrados registros!");
      }
    })
    .catch((erro) => {
      console.log("Erro no fetch!");
      console.log(erro);
    });
}

function executarFuncoes() {
  popularCards();
  popularTabela();
  downtimePorLocal();
}

// Toastr para Alertas mais Visuais
toastr.options = {
  closeButton: false,
  debug: false,
  newestOnTop: false,
  progressBar: false,
  positionClass: "toast-bottom-right",
  preventDuplicates: false,
  onclick: null,
  showDuration: "300",
  hideDuration: "1000",
  timeOut: "5000",
  extendedTimeOut: "1000",
  showEasing: "swing",
  hideEasing: "linear",
  showMethod: "fadeIn",
  hideMethod: "fadeOut",
};
