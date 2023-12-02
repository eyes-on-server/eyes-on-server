user_name.innerHTML = sessionStorage.NOME_USER;
company_name.innerHTML = sessionStorage.NOME_FANTASIA;

// Variáveis Globais
var dataSistema = "";

var fkServidor = 0;
var fkComponente = 0;
var localServidor = "";
var risco = "";

var ids = [];
var rankServidoresLock = false;
var rankLocaisLock = false;

var selectedRankingServidoresId = null;
var selectedRankingLocaisId = null;
var selectedRiscoId = null;

var totalAlertas = 0;
var alertasCpu = 0;
var alertasMemoria = 0;
var alertasDisco = 0;

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

    dataSistema = formatDate(dataAtual);
  }, 1000);
})();

function formatDate(date) {
  dataComBarras = date.split(",")[0];
  dataSeparada = dataComBarras.split("/");
  dataInversa = dataSeparada.reverse();
  return dataInversa.join("-");
}

function limparFiltros() {
  fkComponente = 0;
  fkServidor = 0;
  localServidor = "";
  risco = "";

  selectedRankingLocaisId = null;
  selectedRankingServidoresId = null;
  selectedRiscoId = null;

  rankServidoresLock = false;
  rankLocaisLock = false;

  desativarCards();
  resetRankingServidoresColors();
  resetRankingLocaisColors();
  resetRiscosColors();
  executarFuncoes();
}

function filtrarPorComponente(id) {
  fkComponente = id;
  desativarCards();

  if (id == 1) {
    cardCpu.style.border = "4px solid royalblue";
  } else if (id == 2) {
    cardMemo.style.border = "4px solid royalblue";
  } else if (id == 3) {
    cardDisco.style.border = "4px solid royalblue";
  } else {
    cardTodosComponentes.style.border = "4px solid royalblue";
    fkComponente = 0;
  }

  executarFuncoes();
}

function desativarCards() {
  cardCpu.style.border = "none";
  cardDisco.style.border = "none";
  cardMemo.style.border = "none";
  cardTodosComponentes.style.border = "none";
  alterarCorCards(totalAlertas, alertasCpu, alertasMemoria, alertasDisco);
}

function alterarCorCards(
  totalAlertas,
  alertasCpu,
  alertasMemoria,
  alertasDisco
) {
  cardTodosComponentes.style.borderLeft = "0.25rem solid var(--primary)";
  cardCpu.style.borderLeft = "0.25rem solid var(--primary)";
  cardMemo.style.borderLeft = "0.25rem solid var(--primary)";
  cardDisco.style.borderLeft = "0.25rem solid var(--primary)";

  iconeTotalAlertas.style.color = "var(--secondary)";
  iconeAlertasCpu.style.color = "var(--secondary)";
  iconeAlertasMemo.style.color = "var(--secondary)";
  iconeAlertasDisco.style.color = "var(--secondary)";

  if (totalAlertas >= 300) {
    cardTodosComponentes.style.borderLeft = "0.25rem solid var(--danger)";
    iconeTotalAlertas.style.color = "var(--danger)";
  } else if (totalAlertas >= 250) {
    cardTodosComponentes.style.borderLeft = "0.25rem solid var(--hot)";
    iconeTotalAlertas.style.color = "var(--hot)";
  } else if (totalAlertas >= 200) {
    cardTodosComponentes.style.borderLeft = "0.25rem solid var(--orange)";
    iconeTotalAlertas.style.color = "var(--orange)";
  } else if (totalAlertas >= 150) {
    cardTodosComponentes.style.borderLeft = "0.25rem solid var(--warning)";
    iconeTotalAlertas.style.color = "var(--warning)";
  }

  if (alertasCpu >= 100) {
    cardCpu.style.borderLeft = "0.25rem solid var(--danger)";
    iconeAlertasCpu.style.color = "var(--danger)";
  } else if (alertasCpu >= 75) {
    cardCpu.style.borderLeft = "0.25rem solid var(--hot)";
    iconeAlertasCpu.style.color = "var(--hot)";
  } else if (alertasCpu >= 50) {
    cardCpu.style.borderLeft = "0.25rem solid var(--orange)";
    iconeAlertasCpu.style.color = "var(--orange)";
  } else if (alertasCpu >= 25) {
    cardCpu.style.borderLeft = "0.25rem solid var(--warning)";
    iconeAlertasCpu.style.color = "var(--warning).borderLeft";
  }

  if (alertasMemoria >= 100) {
    cardMemo.style.borderLeft = "0.25rem solid var(--danger)";
    iconeAlertasMemo.style.color = "var(--danger)";
  } else if (alertasMemoria >= 75) {
    cardMemo.style.borderLeft = "0.25rem solid var(--hot)";
    iconeAlertasMemo.style.color = "var(--hot)";
  } else if (alertasMemoria >= 50) {
    cardMemo.style.borderLeft = "0.25rem solid var(--orange)";
    iconeAlertasMemo.style.color = "var(--orange)";
  } else if (alertasMemoria >= 25) {
    cardMemo.style.borderLeft = "0.25rem solid var(--warning)";
    iconeAlertasMemo.style.color = "var(--warning)";
  }

  if (alertasDisco >= 100) {
    cardDisco.style.borderLeft = "0.25rem solid var(--danger)";
    iconeAlertasDisco.style.color = "var(--danger)";
  } else if (alertasDisco >= 75) {
    cardDisco.style.borderLeft = "0.25rem solid var(--hot)";
    iconeAlertasDisco.style.color = "var(--hot)";
  } else if (alertasDisco >= 50) {
    cardDisco.style.borderLeft = "0.25rem solid var(--orange)";
    iconeAlertasDisco.style.color = "var(--orange)";
  } else if (alertasDisco >= 25) {
    cardDisco.style.borderLeft = "0.25rem solid var(--warning)";
    iconeAlertasDisco.style.color = "var(--warning)";
  }
}

function resetRankingServidoresColors() {
  graficoRankingServidores.data.datasets[0].backgroundColor = [
    "#32bcad",
    "#32bcad",
    "#32bcad",
    "#32bcad",
    "#32bcad",
    "#32bcad",
  ];
  graficoRankingServidores.update();
}

function resetRankingLocaisColors() {
  graficoRankingLocais.data.datasets[0].backgroundColor = [
    "#32bcad",
    "#32bcad",
    "#32bcad",
    "#32bcad",
    "#32bcad",
    "#32bcad",
  ];
  graficoRankingLocais.update();
}

function resetRiscosColors() {
  graficoRiscos.data.datasets[0].backgroundColor = [
    "#32bcad",
    "#32bcad",
    "#32bcad",
    "#32bcad",
    "#32bcad",
    "#32bcad",
    "#32bcad",
  ];
  graficoRiscos.update();
}

function coletarDadosCards() {
  console.log("Data: " + dataSistema);
  fetch(`/alertas/coletarDadosCards`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      idEmpresaServer: 3,
      dataAtualServer: dataSistema,
      fkServidorServer: fkServidor,
      localServidorServer: localServidor,
      riscoServer: risco,
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

          totalAlertas = json[0].totalAlertas;
          alertasCpu = json[0].totalAlertasCpu;
          alertasMemoria = json[0].totalAlertasMemoria;
          alertasDisco = json[0].totalAlertasDisco;

          alterarCorCards(
            totalAlertas,
            alertasCpu,
            alertasMemoria,
            alertasDisco
          );
        });
      } else {
        console.log("Erro ao realizar busca!");

        resposta.text().then((texto) => {
          console.error(texto);
        });

        document.getElementById("idQtdAlertasCpu").innerHTML = 0;
        document.getElementById("idQtdAlertasMemoria").innerHTML = 0;
        document.getElementById("idQtdAlertasDisco").innerHTML = 0;
        document.getElementById("idQtdAlertasTotal").innerHTML = 0;

        totalAlertas = 0;
        alertasCpu = 0;
        alertasMemoria = 0;
        alertasDisco = 0;

        toastr.success(
          "Não foram encontrados alertas de nenhum servidor! #Winning!"
        );

        alterarCorCards(totalAlertas, alertasCpu, alertasMemoria, alertasDisco);
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
      localServidorServer: localServidor,
      riscoServer: risco,
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

        graficoRankingServidores.data.labels = [];
        graficoRankingServidores.data.datasets[0].data = [];
        graficoRankingServidores.update();
      }
    })
    .catch((erro) => {
      console.log("Erro ao realizar a busca: " + erro);
    });
}

function obterServidoresPorRisco() {
  fetch(`/alertas/obterServidoresPorRisco`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      idEmpresaServer: 3,
      dataAtualServer: dataSistema,
      fkComponenteServer: fkComponente,
      localServidorServer: localServidor,
    }),
  })
    .then((resposta) => {
      if (resposta.ok) {
        resposta.json().then((json) => {
          console.log(json);

          console.log(json[0]);

          var totalServidores = json[0].totalServidores;

          graficoRiscos.data.datasets[0].data = [
            (json[0].qtdRiscoMaximo / totalServidores) * 100,
            (json[0].qtdRiscoMuitoAlto / totalServidores) * 100,
            (json[0].qtdRiscoAlto / totalServidores) * 100,
            (json[0].qtdRiscoModerado / totalServidores) * 100,
            (json[0].qtdRiscoBaixo / totalServidores) * 100,
            (json[0].qtdRiscoMuitoBaixo / totalServidores) * 100,
            (json[0].qtdSemRiscos / totalServidores) * 100,
          ];
          graficoRiscos.update();
        });
      } else {
        console.log("Erro ao realizar busca!");

        resposta.text().then((texto) => {
          console.error(texto);
        });

        graficoRiscos.data.datasets[0].data = [0, 0, 0, 0, 0, 0, 0];
        graficoRiscos.update();
      }
    })
    .catch((erro) => {
      console.log("Erro ao realizar a busca: " + erro);
    });
}

function realizarRankingLocais() {
  fetch(`/alertas/realizarRankingLocais`, {
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

          for (var i = 0; i < json.length; i++) {
            labels.push(json[i].local_servidor);
            data.push(json[i].total_alertas);
          }

          graficoRankingLocais.data.labels = labels;
          graficoRankingLocais.data.datasets[0].data = data;
          graficoRankingLocais.update();
        });
      } else {
        console.log("Erro ao realizar busca!");

        resposta.text().then((texto) => {
          console.error(texto);
        });

        graficoRankingLocais.data.labels = [];
        graficoRankingLocais.data.datasets[0].data = [];
        graficoRankingLocais.update();
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
      localServidorServer: localServidor,
      riscoServer: risco,
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

        graficoTipoProblemas.data.datasets[0].data = [0, 0, 0];
        graficoTipoProblemas.update();
      }
    })
    .catch((erro) => {
      console.log("Erro ao realizar a busca: " + erro);
    });
}

// Definindo loop de buscas ---------------------------------

function executarFuncoes() {
  coletarDadosCards();

  if (rankServidoresLock == false) {
    realizarRankingServidores();

    if (rankLocaisLock == false) {
      realizarRankingLocais();
    }
  }

  obterServidoresPorRisco();
  coletarDadosTipoAlerta();
}

function graficoRankingServidoresClick(click) {
  const points = graficoRankingServidores.getElementsAtEventForMode(
    click,
    "nearest",
    { intersect: true },
    true
  );
  if (points.length) {
    const firstPoint = points[0];
    const index = firstPoint._index;

    if (index == selectedRankingServidoresId) {
      fkServidor = 0;
      rankServidoresLock = false;
      selectedRankingServidoresId = null;
      resetRankingServidoresColors();
    } else {
      fkServidor = ids[index];
      selectedRankingServidoresId = index;
      rankServidoresLock = true;
      resetRankingServidoresColors();

      graficoRankingServidores.data.datasets[0].backgroundColor[index] =
        "#178e96";
      graficoRankingServidores.update();
    }

    executarFuncoes();
  }
}

function graficoRankingLocaisClick(click) {
  const points = graficoRankingLocais.getElementsAtEventForMode(
    click,
    "nearest",
    { intersect: true },
    true
  );
  if (points.length) {
    const firstPoint = points[0];
    const index = firstPoint._index;

    if (index == selectedRankingLocaisId) {
      selectedRankingLocaisId = null;
      rankLocaisLock = false;
      localServidor = "";
      resetRankingLocaisColors();
    } else {
      if (rankServidoresLock == false) {
        selectedRankingLocaisId = index;
        rankLocaisLock = true;
        localServidor = graficoRankingLocais.data.labels[index];
        resetRankingLocaisColors();

        graficoRankingLocais.data.datasets[0].backgroundColor[index] =
          "#178e96";
        graficoRankingLocais.update();
      } else {
        toastr.error(
          "Não é possível selecionar um setor enquanto houver um servidor selecionado!"
        );
      }
    }

    executarFuncoes();
  }
}

function graficoRiscosClick(click) {
  const points = graficoRiscos.getElementsAtEventForMode(
    click,
    "nearest",
    { intersect: true },
    true
  );
  if (points.length) {
    const firstPoint = points[0];
    const index = firstPoint._index;

    if (index == selectedRiscoId) {
      selectedRiscoId = null;
      risco = "";
      resetRiscosColors();
    } else {
      if (rankServidoresLock == false) {
        selectedRiscoId = index;
        risco = graficoRiscos.data.labels[index];
        resetRiscosColors();

        graficoRiscos.data.datasets[0].backgroundColor[index] = "#178e96";
        graficoRiscos.update();
      } else {
        toastr.error(
          "Não é possível selecionar um risco enquanto houver um servidor selecionado!"
        );
      }
    }

    executarFuncoes();
  }
}

setInterval(() => {
  executarFuncoes();
}, 10000);

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
