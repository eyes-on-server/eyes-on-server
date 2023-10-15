const alertasModel = require("../model/alertasModel");

function coletarDadosCards(req, res) {
  const idEmpresa = req.body.idEmpresaServer;
  const dataAtual = req.body.dataAtualServer;
  const nomeServidor = req.body.nomeServidorServer;

  if (nomeServidor == "") {
    coletarTodosDadosCards(idEmpresa, dataAtual, res);
  } else {
    coletarDadosCardsPorId(idEmpresa, dataAtual, nomeServidor, res);
  }
}

function coletarDadosTipoAlerta(req, res) {
  const idEmpresa = req.body.idEmpresaServer;
  const dataAtual = req.body.dataAtualServer;
  const fkComponente = req.body.fkComponenteServer;
  const nomeServidor = req.body.nomeServidorServer;

  if (fkComponente == 0) {
    coletarTodosDadosTipoAlerta(idEmpresa, dataAtual, res);
  } else {
    coletarDadosTipoAlertaPorId(idEmpresa, dataAtual, fkComponente, res);
  }
}

function realizarRankingServidores(req, res) {
  const idEmpresa = req.body.idEmpresaServer;
  const dataAtual = req.body.dataAtualServer;
  const fkComponente = req.body.fkComponenteServer;
  const nomeServidor = req.body.nomeServidorServer;

  if (fkComponente == 0) {
    realizarRankingGeral(idEmpresa, dataAtual, res);
  } else {
    realizarRankingPorId(idEmpresa, dataAtual, fkComponente, res);
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

function coletarDadosTipoAlertaPorId(idEmpresa, dataAtual, fkComponente, res) {
  alertasModel
    .coletarDadosTipoAlertaPorId(idEmpresa, dataAtual, fkComponente)
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

function realizarRankingPorId(idEmpresa, dataAtual, fkComponente, res) {
  alertasModel
    .realizarRankingServidoresPorId(idEmpresa, dataAtual, fkComponente)
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
