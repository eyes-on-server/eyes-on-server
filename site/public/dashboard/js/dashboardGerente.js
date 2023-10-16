var dataSistema = "";
var fkServidor = 0;
var fkComponente = 0;

var ids = [];

(function getDatetime() {
  setInterval(() => {
    var now = new Date();
    var dataAtual = now.toLocaleString();

    document.getElementById("dataSistema").innerHTML = dataAtual;

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

function filtrarPorComponente(id) {
  fkComponente = id;
  var componente = "";

  if (id == 1) {
    componente = "Apenas CPU";
  } else if (id == 2) {
    componente = "Apenas Memória";
  } else if (id == 3) {
    componente = "Apenas Disco";
  } else {
    componente = "Sem Filtro";

    document.getElementById("filtroQtdAlertas").value = "Sem Filtro";
    fkServidor = 0;
    fkComponente = 0;
  }

  coletarDadosCards();
  realizarRankingServidores();
  coletarDadosTipoAlerta();
}

function coletarDadosCards() {
  fetch(`/alertas/coletarDadosCards`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      idEmpresaServer: 3,
      dataAtualServer: dataSistema,
      fkServidorServer: fkServidor,
    }),
  })
    .then((resposta) => {
      if (resposta.ok) {
        resposta.json().then((json) => {
          console.log(json);

          document.getElementById("idQtdAlertasCpu").innerHTML =
            json[0].totalAlertasCpu;
          document.getElementById("idQtdAlertasMemoria").innerHTML =
            json[0].totalAlertasMemoria;
          document.getElementById("idQtdAlertasDisco").innerHTML =
            json[0].totalAlertasDisco;
          document.getElementById("idQtdAlertasTotal").innerHTML =
            json[0].totalAlertas;
        });
      } else {
        console.log("Erro ao realizar busca!");
        resposta.text().then((texto) => {
          console.error(texto);
        });
      }
    })
    .catch((erro) => {
      console.log("Erro ao realizar a busca: " + erro);
    });
}

function realizarRankingServidores() {
  fetch(`/alertas/realizarRankingServidores`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      idEmpresaServer: 3,
      dataAtualServer: dataSistema,
      fkComponenteServer: fkComponente,
    }),
  })
    .then((resposta) => {
      if (resposta.ok) {
        resposta.json().then((json) => {
          console.log(json);

          console.log(json[0]);

          labels = [];
          data = [];
          ids = [];

          for (var i = 0; i < json.length; i++) {
            labels.push(json[i].nome_servidor);
            data.push(json[i].total_alertas);
            ids.push(json[i].id_servidor);
          }

          graficoRankingServidores.data.labels = labels;
          graficoRankingServidores.data.datasets[0].data = data;
          graficoRankingServidores.update();
        });
      } else {
        console.log("Erro ao realizar busca!");
        resposta.text().then((texto) => {
          console.error(texto);
        });
      }
    })
    .catch((erro) => {
      console.log("Erro ao realizar a busca: " + erro);
    });
}

function coletarDadosTipoAlerta() {
  fetch(`/alertas/coletarDadosTipoAlerta`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      idEmpresaServer: 3,
      dataAtualServer: dataSistema,
      fkComponenteServer: fkComponente,
      fkServidorServer: fkServidor,
    }),
  })
    .then((resposta) => {
      if (resposta.ok) {
        resposta.json().then((json) => {
          console.log(json);

          graficoTipoProblemas.data.datasets[0].data = [
            json[0].totalAlertasEmergencia,
            json[0].totalAlertasPerigo,
            json[0].totalAlertasPrevencao,
          ];

          graficoTipoProblemas.update();
        });
      } else {
        console.log("Erro ao realizar busca!");
        resposta.text().then((texto) => {
          console.error(texto);
        });
      }
    })
    .catch((erro) => {
      console.log("Erro ao realizar a busca: " + erro);
    });
}

setInterval(() => {
  coletarDadosCards();
  realizarRankingServidores();
  coletarDadosTipoAlerta();
}, 5000);

function clickHandler(click) {
  const points = graficoRankingServidores.getElementsAtEventForMode(
    click,
    "nearest",
    { intersect: true },
    true
  );
  if (points.length) {
    const firstPoint = points[0];
    const index = firstPoint._index;

    console.log(graficoRankingServidores.data.labels[index]);
    console.log(graficoRankingServidores.data.datasets[0].data[index]);

    document.getElementById("filtroQtdAlertas").value =
      "Servidor " + graficoRankingServidores.data.labels[index];

    fkServidor = ids[index];

    coletarDadosCards();
    realizarRankingServidores();
    coletarDadosTipoAlerta();
  }
}

ctxChartRanking.onclick = clickHandler;
