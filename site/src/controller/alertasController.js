const alertasModel = require("../model/alertasModel");

/* ---------------------- DADOS CARDS ---------------------- */
function coletarDadosCards(req, res) {
  const idEmpresa = req.body.idEmpresaServer;
  const dataAtual = req.body.dataAtualServer;
  const fkServidor = req.body.fkServidorServer;
  const localServidor = req.body.localServidorServer;
  const risco = req.body.riscoServer;

  if (fkServidor == 0 && localServidor == "" && risco == "") {
    coletarTodosDadosCards(idEmpresa, dataAtual, res);
  } else if (
    fkServidor != 0 ||
    (fkServidor != 0 && (localServidor != "" || risco != ""))
  ) {
    coletarDadosCardsPorServidor(idEmpresa, dataAtual, fkServidor, res);
  } else if (localServidor != "" && risco == "") {
    coletarDadosCardsPorLocal(dataAtual, localServidor, res);
  } else {
    coletarDadosCardsPorRisco(idEmpresa, dataAtual, risco, res);
  }
}

// TODOS DADOS ------------------------>
function coletarTodosDadosCards(idEmpresa, dataAtual, res) {
  alertasModel
    .coletarTodosDadosCards(idEmpresa, dataAtual)
    .then((resultado) => {
      if (resultado.length > 0) {
        res.status(200).json(resultado);
      } else {
        res.status(500).send("Nenhum alerta encontrado!");
      }
    })
    .catch((erro) => {
      res.status(500).json(erro.sqlMessage);
    });
}

function coletarTodosAlertasPorServidor(fkServidor) {
  alertasModel.coletarTodosAlertasPorServidor().then((resultado) => {
    res.status(200).json(resultado)
  }).catch((erro) => {
    res.status(500).json(erro.sqlMessage)
  }) 
}

// DADOS POR SERVIDOR ------------------------>
function coletarDadosCardsPorServidor(idEmpresa, dataAtual, fkServidor, res) {
  alertasModel
    .coletarDadosCardsPorServidor(idEmpresa, dataAtual, fkServidor)
    .then((resultado) => {
      if (resultado.length > 0) {
        res.status(200).json(resultado);
      } else {
        res.status(500).send("Nenhum alerta encontrado!");
      }
    })
    .catch((erro) => {
      res.status(500).json(erro.sqlMessage);
    });
}

// DADOS POR LOCAL ------------------------>
function coletarDadosCardsPorLocal(dataAtual, localServidor, res) {
  alertasModel
    .coletarDadosCardsPorLocal(dataAtual, localServidor)
    .then((resultado) => {
      if (resultado.length > 0) {
        res.status(200).json(resultado);
      } else {
        res.status(500).send("Nenhum alerta encontrado!");
      }
    })
    .catch((erro) => {
      res.status(500).json(erro.sqlMessage);
    });
}

function coletarDadosCardsPorRisco(idEmpresa, dataAtual, risco, res) {
  alertasModel
    .coletarDadosCardsPorRisco(idEmpresa, dataAtual, risco)
    .then((resultado) => {
      if (resultado.length > 0) {
        res.status(200).json(resultado);
      } else {
        res.status(500).send("Nenhum alerta encontrado!");
      }
    })
    .catch((erro) => {
      res.status(500).json(erro.sqlMessage);
    });
}

/* ---------------------- DADOS TIPO ALERTAS ---------------------- */
function coletarDadosTipoAlerta(req, res) {
  const idEmpresa = req.body.idEmpresaServer;
  const dataAtual = req.body.dataAtualServer;
  const fkComponente = req.body.fkComponenteServer;
  const fkServidor = req.body.fkServidorServer;
  const localServidor = req.body.localServidorServer;
  const risco = req.body.riscoServer;

  if (
    fkComponente == 0 &&
    fkServidor == 0 &&
    localServidor == "" &&
    risco == ""
  ) {
    coletarTodosDadosTipoAlerta(idEmpresa, dataAtual, res);
  } else if (
    (fkComponente != 0 &&
      fkServidor != 0 &&
      localServidor != "" &&
      risco == "") ||
    (fkComponente != 0 && fkServidor != 0 && localServidor == "" && risco != "")
  ) {
    coletarDadosTipoAlertaPorComponenteServidor(
      idEmpresa,
      dataAtual,
      fkComponente,
      fkServidor,
      res
    );
  } else if (
    fkComponente != 0 &&
    localServidor != "" &&
    fkServidor == 0 &&
    risco == ""
  ) {
    coletarDadosTipoAlertaPorComponenteLocal(
      dataAtual,
      fkComponente,
      localServidor,
      res
    );
  } else if (
    fkServidor != 0 ||
    (fkServidor != 0 && (localServidor != "" || risco != ""))
  ) {
    coletarDadosTipoAlertaPorServidor(idEmpresa, dataAtual, fkServidor, res);
  } else if (fkComponente != 0) {
    coletarDadosTipoAlertaPorComponente(
      idEmpresa,
      dataAtual,
      fkComponente,
      res
    );
  } else if (risco != "") {
    coletarDadosTipoAlertaPorRisco(idEmpresa, risco, res);
  } else {
    coletarDadosTipoAlertaPorLocal(dataAtual, localServidor, res);
  }
}

// TODOS DADOS ------------------------>
function coletarTodosDadosTipoAlerta(idEmpresa, dataAtual, res) {
  alertasModel
    .coletarTodosDadosTipoAlerta(idEmpresa, dataAtual)
    .then((resultado) => {
      if (resultado.length > 0) {
        res.status(200).json(resultado);
      } else {
        res.status(500).send("Nenhum alerta encontrado!");
      }
    })
    .catch((erro) => {
      res.status(500).json(erro.sqlMessage);
    });
}

// DADOS POR COMPONENTE E SERVIDOR ------------------------>
function coletarDadosTipoAlertaPorComponenteServidor(
  idEmpresa,
  dataAtual,
  fkComponente,
  fkServidor,
  res
) {
  alertasModel
    .coletarDadosTipoAlertaPorComponenteServidor(
      idEmpresa,
      dataAtual,
      fkComponente,
      fkServidor
    )
    .then((resultado) => {
      if (resultado.length > 0) {
        res.status(200).json(resultado);
      } else {
        res.status(500).send("Nenhum alerta encontrado!");
      }
    })
    .catch((erro) => {
      res.status(500).json(erro.sqlMessage);
    });
}

// DADOS POR COMPONENTE E LOCAL ------------------------>
function coletarDadosTipoAlertaPorComponenteLocal(
  dataAtual,
  fkComponente,
  localServidor,
  res
) {
  alertasModel
    .coletarDadosTipoAlertaPorComponenteLocal(
      dataAtual,
      fkComponente,
      localServidor
    )
    .then((resultado) => {
      if (resultado.length > 0) {
        res.status(200).json(resultado);
      } else {
        res.status(500).send("Nenhum alerta encontrado!");
      }
    })
    .catch((erro) => {
      res.status(500).json(erro.sqlMessage);
    });
}

// DADOS POR COMPONENTE ------------------------>
function coletarDadosTipoAlertaPorComponente(
  idEmpresa,
  dataAtual,
  fkComponente,
  res
) {
  alertasModel
    .coletarDadosTipoAlertaPorComponente(idEmpresa, dataAtual, fkComponente)
    .then((resultado) => {
      if (resultado.length > 0) {
        res.status(200).json(resultado);
      } else {
        res.status(500).send("Nenhum alerta encontrado!");
      }
    })
    .catch((erro) => {
      res.status(500).json(erro.sqlMessage);
    });
}

// DADOS POR RISCO
function coletarDadosTipoAlertaPorRisco(idEmpresa, risco, res) {
  alertasModel
    .coletarDadosTipoAlertaPorRisco(idEmpresa, risco)
    .then((resultado) => {
      if (resultado.length > 0) {
        res.status(200).json(resultado);
      } else {
        res.status(500).send("Nenhum alerta encontrado!");
      }
    })
    .catch((erro) => {
      res.status(500).json(erro.sqlMessage);
    });
}

// DADOS POR SERVIDOR ------------------------>
function coletarDadosTipoAlertaPorServidor(
  idEmpresa,
  dataAtual,
  fkServidor,
  res
) {
  alertasModel
    .coletarDadosTipoAlertaPorServidor(idEmpresa, dataAtual, fkServidor)
    .then((resultado) => {
      if (resultado.length > 0) {
        res.status(200).json(resultado);
      } else {
        res.status(500).send("Nenhum alerta encontrado!");
      }
    })
    .catch((erro) => {
      res.status(500).json(erro.sqlMessage);
    });
}

// DADOS POR SERVIDOR ------------------------>
function coletarDadosTipoAlertaPorLocal(dataAtual, localServidor, res) {
  alertasModel
    .coletarDadosTipoAlertaPorLocal(dataAtual, localServidor)
    .then((resultado) => {
      if (resultado.length > 0) {
        res.status(200).json(resultado);
      } else {
        res.status(500).send("Nenhum alerta encontrado!");
      }
    })
    .catch((erro) => {
      res.status(500).json(erro.sqlMessage);
    });
}

/* ---------------------- RANKING SERVIDORES ---------------------- */
function realizarRankingServidores(req, res) {
  const idEmpresa = req.body.idEmpresaServer;
  const dataAtual = req.body.dataAtualServer;
  const fkComponente = req.body.fkComponenteServer;
  const localServidor = req.body.localServidorServer;
  const risco = req.body.riscoServer;

  if (fkComponente == 0 && localServidor == "" && risco == "") {
    realizarRankingGeral(idEmpresa, dataAtual, res);
  } else if (localServidor != "" && fkComponente != 0) {
    realizarRankingLocalComponente(
      idEmpresa,
      dataAtual,
      fkComponente,
      localServidor,
      res
    );
  } else if (localServidor != "") {
    realizarRankingPorLocal(idEmpresa, dataAtual, localServidor, res);
  } else if (risco != "") {
    realizarRankingPorRisco(idEmpresa, risco, res);
  } else {
    realizarRankingPorComponente(idEmpresa, dataAtual, fkComponente, res);
  }
}

// RANKING GERAL ------------------------>
function realizarRankingGeral(idEmpresa, dataAtual, res) {
  alertasModel
    .realizarRankingServidores(idEmpresa, dataAtual)
    .then((resultado) => {
      if (resultado.length > 0) {
        res.status(200).json(resultado);
      } else {
        res.status(500).send("Nenhum alerta encontrado!");
      }
    })
    .catch((erro) => {
      res.status(500).json(erro.sqlMessage);
    });
}

// RANKING POR LOCAL E COMPONENTE
function realizarRankingLocalComponente(
  idEmpresa,
  dataAtual,
  fkComponente,
  localServidor,
  res
) {
  alertasModel
    .realizarRankingLocalComponente(
      idEmpresa,
      dataAtual,
      fkComponente,
      localServidor
    )
    .then((resultado) => {
      if (resultado.length > 0) {
        res.status(200).json(resultado);
      } else {
        res.status(500).send("Nenhum alerta encontrado!");
      }
    })
    .catch((erro) => {
      res.status(500).json(erro.sqlMessage);
    });
}

// RANKING POR COMPONENTE ------------------------>
function realizarRankingPorComponente(idEmpresa, dataAtual, fkComponente, res) {
  alertasModel
    .realizarRankingServidoresPorComponente(idEmpresa, dataAtual, fkComponente)
    .then((resultado) => {
      if (resultado.length > 0) {
        res.status(200).json(resultado);
      } else {
        res.status(500).send("Nenhum alerta encontrado!");
      }
    })
    .catch((erro) => {
      res.status(500).json(erro.sqlMessage);
    });
}

// RANKING POR LOCAL ------------------------>
function realizarRankingPorLocal(idEmpresa, dataAtual, localServidor, res) {
  alertasModel
    .realizarRankingServidoresPorLocal(idEmpresa, dataAtual, localServidor)
    .then((resultado) => {
      if (resultado.length > 0) {
        res.status(200).json(resultado);
      } else {
        res.status(500).send("Nenhum alerta encontrado!");
      }
    })
    .catch((erro) => {
      res.status(500).json(erro.sqlMessage);
    });
}

// RANKING POR RISCO ------------------------>
function realizarRankingPorRisco(idEmpresa, risco, res) {
  alertasModel
    .realizarRankingServidoresPorRisco(idEmpresa, risco)
    .then((resultado) => {
      if (resultado.length > 0) {
        res.status(200).json(resultado);
      } else {
        res.status(500).send("Nenhum alerta encontrado!");
      }
    })
    .catch((erro) => {
      res.status(500).json(erro.sqlMessage);
    });
}

/* ---------------------- OBTER RISCOS ---------------------- */
function obterServidoresPorRisco(req, res) {
  const idEmpresa = req.body.idEmpresaServer;
  const localServidor = req.body.localServidorServer;

  if (localServidor == "") {
    obterRiscosGeral(idEmpresa, res);
  } else {
    obterRiscosPorLocal(idEmpresa, localServidor, res);
  }
}

// TODOS OS RISCOS
function obterRiscosGeral(idEmpresa, res) {
  alertasModel
    .obterRiscosGeral(idEmpresa)
    .then((resultado) => {
      if (resultado.length > 0) {
        res.status(200).json(resultado);
      } else {
        res.status(500).send("Nenhum alerta encontrado!");
      }
    })
    .catch((erro) => {
      res.status(500).json(erro.sqlMessage);
    });
}

// Riscos por Local
function obterRiscosPorLocal(idEmpresa, localServidor, res) {
  alertasModel
    .obterRiscosPorLocal(idEmpresa, localServidor)
    .then((resultado) => {
      if (resultado.length > 0) {
        res.status(200).json(resultado);
      } else {
        res.status(500).send("Nenhum alerta encontrado!");
      }
    })
    .catch((erro) => {
      res.status(500).json(erro.sqlMessage);
    });
}

/* ---------------------- RANKING LOCAIS ---------------------- */
function realizarRankingLocais(req, res) {
  const idEmpresa = req.body.idEmpresaServer;
  const dataAtual = req.body.dataAtualServer;
  const fkComponente = req.body.fkComponenteServer;

  if (fkComponente == 0) {
    realizarRankingLocaisGeral(idEmpresa, dataAtual, res);
  } else {
    realizarRankingLocaisPorComponente(idEmpresa, dataAtual, fkComponente, res);
  }
}

// RANKING GERAL ------------------------>
function realizarRankingLocaisGeral(idEmpresa, dataAtual, res) {
  alertasModel
    .realizarRankingLocais(idEmpresa, dataAtual)
    .then((resultado) => {
      if (resultado.length > 0) {
        res.status(200).json(resultado);
      } else {
        res.status(500).send("Nenhum alerta encontrado!");
      }
    })
    .catch((erro) => {
      res.status(500).json(erro.sqlMessage);
    });
}

// RANKING POR COMPONENTE ------------------------>
function realizarRankingLocaisPorComponente(
  idEmpresa,
  dataAtual,
  fkComponente,
  res
) {
  alertasModel
    .realizarRankingLocaisPorComponente(idEmpresa, dataAtual, fkComponente)
    .then((resultado) => {
      if (resultado.length > 0) {
        res.status(200).json(resultado);
      } else {
        res.status(500).send("Nenhum alerta encontrado!");
      }
    })
    .catch((erro) => {
      res.status(500).json(erro.sqlMessage);
    });
}

module.exports = {
  coletarDadosCards,
  coletarTodosAlertasPorServidor,
  realizarRankingServidores,
  obterServidoresPorRisco,
  coletarDadosTipoAlerta,
  realizarRankingLocais,
};
