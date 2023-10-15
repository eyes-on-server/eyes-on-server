const alertasModel = require("../model/alertasModel");

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
module.exports = {
  coletarDadosCards,
  realizarRankingServidores,
  coletarDadosTipoAlerta,
};
