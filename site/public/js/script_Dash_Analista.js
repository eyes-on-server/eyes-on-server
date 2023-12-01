let numberServers = 0;
let serverGlobal;

function initial() {
  nome_do_usuario.innerHTML = sessionStorage.NOME_USER;
  nome_da_empresa.innerHTML = sessionStorage.NOME_FANTASIA;

  let cpuAlerts;
  let discAlerts;
  let memoryAlerts;

  chartArea.innerHTML = ``;
  chartArea.innerHTML = `<canvas id="GraficoDeLinha"></canvas>`;
  chartArea2.innerHTML = ``;
  chartArea2.innerHTML = `<canvas id="GraficoDeLinha2"></canvas>`;

  const dash = document.getElementById("GraficoDeLinha");
  const dash2 = document.getElementById("GraficoDeLinha2");

  new Chart(dash, {
    type: "line",
    data: {
      labels: [],
      datasets: [
        {
          label: "",
          data: [],
          borderWidth: 1,
        },
      ],
    },
    options: {
      scales: {
        y: {
          beginAtZero: true,
        },
      },
    },
  });

  new Chart(dash2, {
    type: "line",
    data: {
      labels: [],
      datasets: [
        {
          label: "",
          data: [],
          borderWidth: 1,
        },
      ],
    },
    options: {
      scales: {
        y: {
          beginAtZero: true,
        },
      },
    },
  });

  // SEARCH ALL COMPANY’S SERVERS
  fetch(`/analystGraph/selectSectors/${sessionStorage.NOME_FANTASIA}`, {
    method: "GET",
    headers: {
      "Content-type": "application/json",
    },
  })
    .then(function (resposta) {
      if (resposta.status == 200) {
        resposta.json().then((json) => {
          let sectors = [];
          selectSectors.innerHTML = `<option value="" selected disabled>Setores</option>`;
          selectServers.innerHTML = `<option value="" selected disabled>Servidores</option>`;

          for (let i = 0; i < json.length; i++) {
            if (!sectors.includes(json[i].local_servidor)) {
              selectSectors.innerHTML += `<option value="${json[i].local_servidor}">${json[i].local_servidor}</option>`;
              sectors.push(json[i].local_servidor);
            }
          }
        });
      } else {
        console.log("Error when searching for company sectors");
        resposta.text().then((texto) => {
          console.log(resposta);
        });
      }
    })
    .catch((erro) => {
      console.log("Error: " + erro);
    });

  // SEARCH ALL COMPANY'S ALERTS
  fetch(`/analystGraph/searchAllAlerts/${sessionStorage.NOME_FANTASIA}`, {
    method: "GET",
    headers: {
      "Content-type": "application/json",
    },
  })
    .then(function (resposta) {
      if (resposta.status == 200) {
        resposta.json().then((json) => {
          amountAlerts.innerHTML = json[0].Alerts;

          const el = document.getElementById("amountAlerts");

          if (json[0].Alerts / numberServers > 65) {
            el.className = "alert";
          } else if (json[0].Alerts / numberServers > 33) {
            el.className = "observation";
          } else {
            el.className = "safe";
          }
        });
      } else {
        console.log("Error when searching for all company's alerts");
        resposta.text().then((texto) => {
          console.log(resposta);
        });
      }
    })
    .catch((erro) => {
      console.log("Error: " + erro);
    });

  // SEARCH FOR DATA TO RECOMMENDS
  fetch(`/analystGraph/searchCpuAlerts/${sessionStorage.NOME_FANTASIA}`, {
    method: "GET",
    headers: {
      "Content-type": "application/json",
    },
  })
    .then(function (resposta) {
      if (resposta.status == 200) {
        resposta.json().then((json) => {
          cpuAlerts = json[0].cpuAlerts;
        });
      } else {
        console.log("Error when searching for all cpu's alerts");
        resposta.text().then((texto) => {
          console.log(resposta);
        });
      }
    })
    .catch((erro) => {
      console.log("Error: " + erro);
    });

  fetch(`/analystGraph/searchDiscAlerts/${sessionStorage.NOME_FANTASIA}`, {
    method: "GET",
    headers: {
      "Content-type": "application/json",
    },
  })
    .then(function (resposta) {
      if (resposta.status == 200) {
        resposta.json().then((json) => {
          discAlerts = json[0].discAlerts;
        });
      } else {
        console.log("Error when searching for all disc's alerts");
        resposta.text().then((texto) => {
          console.log(resposta);
        });
      }
    })
    .catch((erro) => {
      console.log("Error: " + erro);
    });

  fetch(`/analystGraph/searchMemoryAlerts/${sessionStorage.NOME_FANTASIA}`, {
    method: "GET",
    headers: {
      "Content-type": "application/json",
    },
  })
    .then(function (resposta) {
      if (resposta.status == 200) {
        resposta.json().then((json) => {
          memoryAlerts = json[0].memoryAlerts;
        });
      } else {
        console.log("Error when searching for all memory's alerts");
        resposta.text().then((texto) => {
          console.log(resposta);
        });
      }
    })
    .catch((erro) => {
      console.log("Error: " + erro);
    });

  let mostAlerts;

  setTimeout(() => {
    if (cpuAlerts > discAlerts && cpuAlerts > memoryAlerts) {
      recommendationCPU.innerHTML = `CPU: Priorize a melhoria das suas CPU's`;

      mostAlerts = "CPU";
    } else if ((discAlerts > cpuAlerts) & (discAlerts > memoryAlerts)) {
      recommendationDisc.innerHTML = `Disco: Priorize a melhoria dos seus discos`;

      mostAlerts = "Disc";
    } else {
      recommendationMemory.innerHTML = `Memória: Priorize a melhoria das suas memórias`;

      mostAlerts = "Memory";
    }

    if (mostAlerts == "CPU") {
      if (discAlerts > memoryAlerts) {
        recommendationDisc.innerHTML = `Disco: Planeje-se para uma melhoria dos seus discos`;
        recommendationMemory.innerHTML = `Memória: Continue monitorando sua memória`;
      } else {
        recommendationMemory.innerHTML = `Memória: Planeje-se para uma melhoria da sua memória`;
        recommendationDisc.innerHTML = `Disco: Continue monitorando seus discos`;
      }
    } else if (mostAlerts == "Disc") {
      if (cpuAlerts > memoryAlerts) {
        recommendationCPU.innerHTML = `CPU: Planeje-se para uma melhoria dos seus discos`;
        recommendationMemory.innerHTML = `Memória: Continue monitorando sua memória`;
      } else {
        recommendationMemory.innerHTML = `Memória: Planeje-se para uma melhoria da sua memória`;
        recommendationCPU.innerHTML = `CPU: Continue monitorando sua CPU's`;
      }
    } else {
      if (cpuAlerts > discAlerts) {
        recommendationCPU.innerHTML = `CPU: Planeje-se para uma melhoria dos seus discos`;
        recommendationDisc.innerHTML = `Disco: Continue monitorando seus discos`;
      } else {
        recommendationDisc.innerHTML = `Disco: Planeje-se para uma melhoria dos seus discos`;
        recommendationCPU.innerHTML = `CPU: Continue monitorando suas CPU's`;
      }
    }

    cpuAlertsHTML.innerHTML = "Total de alertas: " + cpuAlerts;
    memoryAlertsHTML.innerHTML = "Total de alertas: " + memoryAlerts;
    discAlertsHTML.innerHTML = "Total de alertas: " + discAlerts;

    if ((cpuAlerts == 0) & (memoryAlerts == 0) && discAlerts == 0) {
      recommendationCPU.innerHTML = "CPU: Nenhum alerta gerado!";
      recommendationDisc.innerHTML = "Disco: Nenhum alerta gerado!";
      recommendationMemory.innerHTML = "Memória: Nenhum alerta gerado!";
    }
  }, "1000");

  // SEARCH LAST ALERTS BY COMPONENTS
  fetch(`/analystGraph/searchLastAlertsByCPU/${sessionStorage.NOME_FANTASIA}`, {
    method: "GET",
    headers: {
      "Content-type": "application/json",
    },
  })
    .then(function (resposta) {
      if (resposta.status == 200) {
        resposta.json().then((json) => {
          let dataUTC = new Date(json[0].data_hora_abertura);
          let options = { timeZone: "America/Sao_Paulo", hour12: false };

          let formatoBrasileiro = new Intl.DateTimeFormat("pt-BR", {
            ...options,
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
          });

          let horarioBrasileiro = formatoBrasileiro.format(dataUTC);

          descriptionAlertCPU.innerHTML = `
          <b> Último alerta registrado </b> <br>
          <b> Titulo: </b> ${json[0].titulo_alerta}<br>
          <b> Tipo: </b> ${json[0].tipoAlerta}<br>
          <b> Horário: </b> ${horarioBrasileiro}<br>
          <b> Descrição: </b> ${json[0].descricao_alerta}

          `;
        });
      } else {
        console.log("Error when searching for company sectors");
        resposta.text().then((texto) => {
          console.log(resposta);
        });
      }
    })
    .catch((erro) => {
      console.log("Error: " + erro);
    });

  fetch(
    `/analystGraph/searchLastAlertsByMemory/${sessionStorage.NOME_FANTASIA}`,
    {
      method: "GET",
      headers: {
        "Content-type": "application/json",
      },
    }
  )
    .then(function (resposta) {
      if (resposta.status == 200) {
        resposta.json().then((json) => {
          let dataUTC = new Date(json[0].data_hora_abertura);
          let options = { timeZone: "America/Sao_Paulo", hour12: false };

          let formatoBrasileiro = new Intl.DateTimeFormat("pt-BR", {
            ...options,
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
          });

          let horarioBrasileiro = formatoBrasileiro.format(dataUTC);

          descriptionAlertMemory.innerHTML = `
        <b> Último alerta registrado </b> <br>
        <b> Titulo: </b> ${json[0].titulo_alerta}<br>
        <b> Tipo: </b> ${json[0].tipoAlerta}<br>
        <b> Horário: </b> ${horarioBrasileiro}<br>
        <b> Descrição: </b> ${json[0].descricao_alerta}

        `;
        });
      } else {
        console.log("Error when searching for company sectors");
        resposta.text().then((texto) => {
          console.log(resposta);
        });
      }
    })
    .catch((erro) => {
      console.log("Error: " + erro);
    });

  fetch(
    `/analystGraph/searchLastAlertsByDisc/${sessionStorage.NOME_FANTASIA}`,
    {
      method: "GET",
      headers: {
        "Content-type": "application/json",
      },
    }
  )
    .then(function (resposta) {
      if (resposta.status == 200) {
        resposta.json().then((json) => {
          let dataUTC = new Date(json[0].data_hora_abertura);
          let options = { timeZone: "America/Sao_Paulo", hour12: false };

          let formatoBrasileiro = new Intl.DateTimeFormat("pt-BR", {
            ...options,
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
          });

          let horarioBrasileiro = formatoBrasileiro.format(dataUTC);

          descriptionAlertDisc.innerHTML = `
          <b> Último alerta registrado </b> <br>
          <b> Titulo: </b> ${json[0].titulo_alerta}<br>
          <b> Tipo: </b> ${json[0].tipoAlerta}<br>
          <b> Horário: </b> ${horarioBrasileiro}<br>
          <b> Descrição: </b> ${json[0].descricao_alerta}
  
          `;
        });
      } else {
        console.log("Error when searching for company sectors");
        resposta.text().then((texto) => {
          console.log(resposta);
        });
      }
    })
    .catch((erro) => {
      console.log("Error: " + erro);
    });
}

function searchServers(local) {
  selectServers.innerHTML = `<option value="" selected disabled>Servidores</option>`;
  fetch(`/analystGraph/searchServers/${local}`, {
    method: "GET",
    headers: {
      "Content-type": "application/json",
    },
  })
    .then(function (resposta) {
      if (resposta.status == 200) {
        resposta.json().then((json) => {
          let servers = [];

          for (let i = 0; i < json.length; i++) {
            if (!servers.includes(json[i])) {
              selectServers.innerHTML += `<option value="${json[i].nome_servidor}">${json[i].nome_servidor}</option>`;
              servers.push(json[i].nome_servidor);
            }
          }
        });
      } else {
        console.log("Error when searching for company sectors");
        resposta.text().then((texto) => {
          console.log(resposta);
        });
      }
    })
    .catch((erro) => {
      console.log("Error: " + erro);
    });
}

function changeAlertsCondition() {
  if (alerts.value == "on") {
    alerts.value = "off";
  } else {
    alerts.value = "on";
  }
}

function resetPage() {
  serverName.innerHTML = `Nome do servidor: `;
  sectorName.innerHTML = `Nome do setor: `;
  ipv6Server.innerHTML = `IPV6 do servidor: `;
  macAddressServer.innerHTML = `Mac address: `;
  soServer.innerHTML = `Sistema operacional: `;

  cpuInLive.innerHTML = `Uso da CPU: `;
  cpuFreqInLive.innerHTML = `Frequência da CPU: `;
  memoryInLive.innerHTML = `Uso da memória: `;
  discInLive.innerHTML = `Uso do disco:`;
  networkReceivedInLive.innerHTML = `bytes recebidos: `;
  networkSentInLive.innerHTML = `bytes enviados: `;

  headerAlertServer.innerHTML = `Alertas dos servidores: `;

  let el;
  el = document.getElementById("descriptionAlertCPU");
  el.className = "";

  el = document.getElementById("descriptionAlertDisc");
  el.className = "";

  el = document.getElementById("descriptionAlertMemory");
  el.className = "";

  selectComponents.innerHTML = `<option value="" selected disabled> Componentes  </option>;`;

  initial();
}

function setDataByServer(server) {
  headerAlertServer.innerHTML = `Alertas do servidor: `;
  let cpuAlerts;
  let discAlerts;
  let memoryAlerts;

  fetch(`/analystGraph/searchServerInformation/${server}`, {
    method: "GET",
    headers: {
      "Content-type": "application/json",
    },
  })
    .then(function (resposta) {
      if (resposta.status == 200) {
        resposta.json().then((json) => {
          serverName.innerHTML = `Nome do servidor: ${json[0].nome_servidor}`;
          sectorName.innerHTML = `Nome do setor: ${json[0].local_servidor}`;
          ipv6Server.innerHTML = `IPV6 do servidor: ${json[0].ipv6_servidor}`;
          macAddressServer.innerHTML = `Mac address: ${json[0].mac_address}`;
          soServer.innerHTML = `Sistema operacional: ${json[0].so_servidor}`;
        });
      } else {
        console.log("Error when searching for server information");
        resposta.text().then((texto) => {
          console.log(resposta);
        });
      }
    })
    .catch((erro) => {
      console.log("Error: " + erro);
    });

  for (let i = 1; i <= 6; i++) {
    // Buscando medidas
    fetch(`/analystGraph/searchDatasInLive/${server}/${i}`, {
      method: "GET",
      headers: {
        "Content-type": "application/json",
      },
    })
      .then(function (resposta) {
        if (resposta.status == 200) {
          resposta.json().then((json) => {
            if (i == 1) {
              cpuInLive.innerHTML = `Uso da CPU: ${json[0].valor_registro}%`;
            } else if (i == 2) {
              cpuFreqInLive.innerHTML = `Frequência da CPU: ${json[0].valor_registro} Hz `;
            } else if (i == 3) {
              memoryInLive.innerHTML = `Uso da memória: ${json[0].valor_registro}% `;
            } else if (i == 4) {
              discInLive.innerHTML = `Uso do disco: ${json[0].valor_registro}%`;
            } else if (i == 5) {
              networkReceivedInLive.innerHTML = `bytes recebidos: ${Math.round(
                json[0].valor_registro / 1000000
              )} Gb`;
            } else {
              networkSentInLive.innerHTML = `bytes enviados: ${Math.round(
                json[0].valor_registro / 1000000
              )} Gb`;
            }
          });
        } else {
          console.log("Error when searching for datas in live");
          resposta.text().then((texto) => {
            console.log(resposta);

            if (i == 1) {
              cpuInLive.innerHTML = `Uso da CPU: Componente não monitorado!`;
            } else if (i == 2) {
              cpuFreqInLive.innerHTML = `Frequência da CPU: Componente não monitorado! `;
            } else if (i == 3) {
              memoryInLive.innerHTML = `Uso da memória: Componente não monitorado! `;
            } else if (i == 4) {
              discInLive.innerHTML = `Uso do disco: Componente não monitorado!`;
            } else if (i == 5) {
              networkReceivedInLive.innerHTML = `bytes recebidos: Componente não monitorado!`;
            } else {
              networkSentInLive.innerHTML = `bytes enviados: Componente não monitorado!`;
            }
          });
        }
      })
      .catch((erro) => {
        console.log("Error: " + erro);
      });
  }

  fetch(`/analystGraph/searchAlertsByServer/${server}`, {
    method: "GET",
    headers: {
      "Content-type": "application/json",
    },
  })
    .then(function (resposta) {
      if (resposta.status == 200) {
        resposta.json().then((json) => {
          amountAlerts.innerHTML = json[0].alerts;

          el = document.getElementById("amountAlerts");

          if (json[0].alerts > 65) {
            el.className = "alert";
          } else if (json[0].alerts > 33) {
            el.className = "observation";
          } else {
            el.className = "safe";
          }
        });
      } else {
        console.log("Error when searching for server alerts");
        resposta.text().then((texto) => {
          console.log(resposta);
        });
      }
    })
    .catch((erro) => {
      console.log("Error: " + erro);
    });

  for (let i = 1; i <= 3; i++) {
    fetch(`/analystGraph/searchAlertsByComponent/${server}/${i}`, {
      method: "GET",
      headers: {
        "Content-type": "application/json",
      },
    })
      .then(function (resposta) {
        if (resposta.status == 200) {
          resposta.json().then((json) => {
            if (i == 1) {
              cpuAlerts = json[0].alerts;
            } else if (i == 2) {
              memoryAlerts = json[0].alerts;
            } else {
              discAlerts = json[0].alerts;
            }
          });
        } else {
          console.log(
            "Error when searching for alerts by server and component"
          );
          resposta.text().then((texto) => {
            console.log(resposta);
          });
        }
      })
      .catch((erro) => {
        console.log("Error: " + erro);
      });
  }

  let mostAlerts;

  setTimeout(() => {
    if (cpuAlerts > discAlerts && cpuAlerts > memoryAlerts) {
      recommendationCPU.innerHTML = `CPU: Priorize a melhoria das suas CPU's`;
      let el = document.getElementById("recommendationCPU");
      el.className += " alert";
      mostAlerts = "CPU";
    } else if ((discAlerts > cpuAlerts) & (discAlerts > memoryAlerts)) {
      recommendationDisc.innerHTML = `Disco: Priorize a melhoria dos seus discos`;
      let el = document.getElementById("recommendationDisc");
      el.className += " alert";
      mostAlerts = "Disc";
    } else {
      recommendationMemory.innerHTML = `Memória: Priorize a melhoria das suas memórias`;
      let el = document.getElementById("recommendationMemory");
      el.className += " alert";
      mostAlerts = "Memory";
    }

    if (mostAlerts == "CPU") {
      if (discAlerts > memoryAlerts) {
        recommendationDisc.innerHTML = `Disco: Planeje-se para uma melhoria dos seus discos`;
        recommendationMemory.innerHTML = `Memória: Continue monitorando sua memória`;
      } else {
        recommendationMemory.innerHTML = `Memória: Planeje-se para uma melhoria da sua memória`;
        recommendationDisc.innerHTML = `Disco: Continue monitorando seus discos`;
      }
    } else if (mostAlerts == "Disc") {
      if (cpuAlerts > memoryAlerts) {
        recommendationCPU.innerHTML = `CPU: Planeje-se para uma melhoria dos seus discos`;
        recommendationMemory.innerHTML = `Memória: Continue monitorando sua memória`;
      } else {
        recommendationMemory.innerHTML = `Memória: Planeje-se para uma melhoria da sua memória`;
        recommendationCPU.innerHTML = `CPU: Continue monitorando sua CPU's`;
      }
    } else {
      if (cpuAlerts > discAlerts) {
        recommendationCPU.innerHTML = `CPU: Planeje-se para uma melhoria dos seus discos`;
        recommendationDisc.innerHTML = `Disco: Continue monitorando seus discos`;
      } else {
        recommendationDisc.innerHTML = `Disco: Planeje-se para uma melhoria dos seus discos`;
        recommendationCPU.innerHTML = `CPU: Continue monitorando suas CPU's`;
      }
    }

    cpuAlertsHTML.innerHTML = "Total de alertas: " + cpuAlerts;
    memoryAlertsHTML.innerHTML = "Total de alertas: " + memoryAlerts;
    discAlertsHTML.innerHTML = "Total de alertas: " + discAlerts;

    if ((cpuAlerts == 0) & (memoryAlerts == 0) && discAlerts == 0) {
      recommendationCPU.innerHTML = "CPU: Nenhum alerta gerado!";
      recommendationDisc.innerHTML = "Disco: Nenhum alerta gerado!";
      recommendationMemory.innerHTML = "Memória: Nenhum alerta gerado!";
    }
  }, "1000");

  for (let i = 1; i <= 3; i++) {
    fetch(`/analystGraph/searchLastAlertsByComponents/${server}/${i}`, {
      method: "GET",
      headers: {
        "Content-type": "application/json",
      },
    })
      .then(function (resposta) {
        if (resposta.status == 200) {
          resposta.json().then((json) => {
            let dataUTC = new Date(json[0].data_hora_abertura);
            let options = { timeZone: "America/Sao_Paulo", hour12: false };

            let formatoBrasileiro = new Intl.DateTimeFormat("pt-BR", {
              ...options,
              year: "numeric",
              month: "2-digit",
              day: "2-digit",
              hour: "2-digit",
              minute: "2-digit",
              second: "2-digit",
            });

            let el;
            let horarioBrasileiro = formatoBrasileiro.format(dataUTC);

            if (i == 1) {
              descriptionAlertCPU.innerHTML = `
            <b> Último alerta registrado </b> <br>
            <b> Titulo: </b> ${json[0].titulo_alerta}<br>
            <b> Tipo: </b> ${json[0].tipoAlerta}<br>
            <b> Horário: </b> ${horarioBrasileiro}<br>
            <b> Descrição: </b> ${json[0].descricao_alerta}            
            `;

              el = document.getElementById("descriptionAlertCPU");
              el.className = "";
            } else if (i == 2) {
              descriptionAlertMemory.innerHTML = `
            <b> Último alerta registrado </b> <br>
            <b> Titulo: </b> ${json[0].titulo_alerta}<br>
            <b> Tipo: </b> ${json[0].tipoAlerta}<br>
            <b> Horário: </b> ${horarioBrasileiro}<br>
            <b> Descrição: </b> ${json[0].descricao_alerta}
            `;

              el = document.getElementById("descriptionAlertMemory");
              el.className = "";
            } else {
              descriptionAlertDisc.innerHTML = `
            <b> Último alerta registrado </b> <br>
            <b> Titulo: </b> ${json[0].titulo_alerta}<br>
            <b> Tipo: </b> ${json[0].tipoAlerta}<br>
            <b> Horário: </b> ${horarioBrasileiro}<br>
            <b> Descrição: </b> ${json[0].descricao_alerta}
            `;

              el = document.getElementById("descriptionAlertDisc");
              el.className = "";
            }
          });
        } else {
          console.log("Error when searching for company sectors");
          resposta.text().then((texto) => {
            console.log(resposta);

            let el;

            if (i == 1) {
              el = document.getElementById("descriptionAlertCPU");
              el.className = " textCenter";
              descriptionAlertCPU.innerHTML = `Nenhum alerta gerado!`;
            } else if (i == 2) {
              el = document.getElementById("descriptionAlertMemory");
              el.className = " textCenter";
              descriptionAlertMemory.innerHTML = `Nenhum alerta gerado!`;
            } else {
              el = document.getElementById("descriptionAlertDisc");
              el.className = " textCenter";
              descriptionAlertDisc.innerHTML = `Nenhum alerta gerado!`;
            }
          });
        }
      })
      .catch((erro) => {
        console.log("Error: " + erro);
      });
  }

  let cpuRegister = [];
  let discRegister = [];
  let memoryRegister = [];

  let registerLabels = [];

  // SET DATA IN GRAPH
  for (let i = 1; i <= 4; i++) {
    if (i == 2) {
      i = 3;
    }

    if (i == 1 || i == 3 || i == 4) {
      fetch(`/analystGraph/searchDatasForLineGraph/${server}/${i}`, {
        method: "GET",
        headers: {
          "Content-type": "application/json",
        },
      })
        .then(function (resposta) {
          if (resposta.status == 200) {
            resposta.json().then((json) => {
              for (let t = 0; t <= 9; t++) {
                if (i == 1) {
                  cpuRegister.push(json[t].valor_registro);
                  let dataUTC = new Date(json[t].momento_registro);
                  let options = {
                    timeZone: "America/Sao_Paulo",
                    hour12: false,
                  };

                  let formatoBrasileiro = new Intl.DateTimeFormat("pt-BR", {
                    ...options,
                    hour: "2-digit",
                    minute: "2-digit",
                    second: "2-digit",
                  });

                  let horarioBrasileiro = formatoBrasileiro.format(dataUTC);

                  registerLabels.unshift(horarioBrasileiro);
                } else if (i == 3) {
                  memoryRegister.unshift(json[t].valor_registro);
                } else {
                  discRegister.unshift(json[t].valor_registro);
                }
              }
            });
          } else {
            console.log("Error when searching for datas to line graph");
            resposta.text().then((texto) => {
              console.log(resposta);
            });
          }
        })
        .catch((erro) => {
          console.log("Error: " + erro);
        });
    }
  }

  chartArea.innerHTML = ``;
  chartArea.innerHTML = `<canvas id="GraficoDeLinha"></canvas>`;
  chartArea2.innerHTML = ``;
  chartArea2.innerHTML = `<canvas id="GraficoDeLinha2"></canvas>`;

  const dash = document.getElementById("GraficoDeLinha");
  const dash2 = document.getElementById("GraficoDeLinha2");

  const graph = new Chart(dash, {
    type: "line",
    data: {
      labels: registerLabels,
      datasets: [
        {
          label: "Uso da CPU (%)",
          data: cpuRegister,
          borderWidth: 1,
          backgroundColor: "#32bcad",
        },
        {
          label: "Uso do Disco (%)",
          data: discRegister,
          borderWidth: 1,
          backgroundColor: "#3fffe982",
        },
        {
          label: "Uso da Memória (%)",
          data: memoryRegister,
          borderWidth: 1,
        },
      ],
    },
    options: {
      scales: {
        y: {
          beginAtZero: true,
        },
      },
    },
  });

  const graph02 = new Chart(dash2, {
    type: "line",
    data: {
      labels: [],
      datasets: [
        {
          label: "",
          data: [],
          borderWidth: 1,
        },
      ],
    },
    options: {
      scales: {
        y: {
          beginAtZero: true,
        },
      },
    },
  });

  selectComponents.innerHTML = `<option value="" selected disabled> Componentes  </option>;`;

  fetch(`/analystGraph/searchComponents/${server}`, {
    method: "GET",
    headers: {
      "Content-type": "application/json",
    },
  })
    .then(function (resposta) {
      if (resposta.status == 200) {
        resposta.json().then((json) => {
          for (let i = 0; i < json.length; i++) {
            selectComponents.innerHTML += `<option value="${json[i].nome_componente_medida}"> ${json[i].nome_componente_medida} </option>;`;
          }
        });
      } else {
        console.log("Error when searching for components to select to graph02");
        resposta.text().then((texto) => {
          console.log(resposta);
        });
      }
    })
    .catch((erro) => {
      console.log("Error: " + erro);
    });

  setTimeout(() => {
    graph.update();
    graph02.update();
  }, "500");

  serverGlobal = server;
}

function setDatasInGraph(measureName) {
  let registerLabels = [];
  let registers = [];

  chartArea2.innerHTML = ``;
  chartArea2.innerHTML = `<canvas id="GraficoDeLinha2"></canvas>`;
  const dash2 = document.getElementById("GraficoDeLinha2");

  let par = `${measureName}`;
  fetch(`/analystGraph/searchDatasByComponent/${serverGlobal}/${par}`, {
    method: "GET",
    headers: {
      "Content-type": "application/json",
    },
  })
    .then(function (resposta) {
      if (resposta.status == 200) {
        resposta.json().then((json) => {
          for (let i = 0; i < 10; i++) {
            let dataUTC = new Date(json[i].momento_registro);
            let options = {
              timeZone: "America/Sao_Paulo",
              hour12: false,
            };

            let formatoBrasileiro = new Intl.DateTimeFormat("pt-BR", {
              ...options,
              hour: "2-digit",
              minute: "2-digit",
              second: "2-digit",
            });

            let horarioBrasileiro = formatoBrasileiro.format(dataUTC);

            registerLabels.unshift(horarioBrasileiro);

            console.log(par);

            if (par == "Bytes Recebidos") {
              registers.unshift((json[i].valor_registro / 10000000).toFixed(1));
            } else if (par == "Bytes Enviados") {
              registers.unshift((json[i].valor_registro / 1000000).toFixed(2));
            } else {
              registers.unshift(json[i].valor_registro);
            }
          }
        });
      } else {
        console.log("Error when searching by datas to line graph 2");
        resposta.text().then((texto) => {
          console.log(resposta);
        });
      }
    })
    .catch((erro) => {
      console.log("Error: " + erro);
    });

  const graph02 = new Chart(dash2, {
    type: "line",
    data: {
      labels: registerLabels,
      datasets: [
        {
          label: par,
          data: registers,
          borderWidth: 1,
        },
      ],
    },
    options: {
      scales: {
        y: {
          beginAtZero: true,
        },
      },
    },
  });

  setTimeout(() => {
    graph02.update();
  }, "400");
}

initial();
