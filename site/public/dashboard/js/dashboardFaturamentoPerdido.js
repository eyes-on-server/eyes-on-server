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
            Math.round(json[0].total_downtime / 3600) + " Horas";
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

function executarFuncoes() {
  popularCards();
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
