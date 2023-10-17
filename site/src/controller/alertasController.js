const alertasModel = require("../model/alertasModel");

/* ---------------------- DADOS CARDS ---------------------- */
function coletarDadosCards(req, res) {
  const idEmpresa = req.body.idEmpresaServer;
  const dataAtual = req.body.dataAtualServer;
  const fkServidor = req.body.fkServidorServer;

  if (fkServidor == 0) {
    coletarTodosDadosCards(idEmpresa, dataAtual, res);
  } else {
    coletarDadosCardsPorServidor(idEmpresa, dataAtual, fkServidor, res);
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

/* ---------------------- DADOS TIPO ALERTAS ---------------------- */
function coletarDadosTipoAlerta(req, res) {
  const idEmpresa = req.body.idEmpresaServer;
  const dataAtual = req.body.dataAtualServer;
  const fkComponente = req.body.fkComponenteServer;
  const fkServidor = req.body.fkServidorServer;

  if (fkComponente == 0 && fkServidor == 0) {
    coletarTodosDadosTipoAlerta(idEmpresa, dataAtual, res);
  } else if (fkComponente != 0 && fkServidor != 0) {
    coletarDadosTipoAlertaPorComponenteServidor(
      idEmpresa,
      dataAtual,
      fkComponente,
      fkServidor,
      res
    );
  } else if (fkComponente != 0) {
    coletarDadosTipoAlertaPorComponente(
      idEmpresa,
      dataAtual,
      fkComponente,
      res
    );
  } else {
    coletarDadosTipoAlertaPorServidor(idEmpresa, dataAtual, fkServidor, res);
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

/* ---------------------- RANKING SERVIDORES ---------------------- */
function realizarRankingServidores(req, res) {
  const idEmpresa = req.body.idEmpresaServer;
  const dataAtual = req.body.dataAtualServer;
  const fkComponente = req.body.fkComponenteServer;

  if (fkComponente == 0) {
    realizarRankingGeral(idEmpresa, dataAtual, res);
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
  realizarRankingServidores,
  coletarDadosTipoAlerta,
  realizarRankingLocais,
};
