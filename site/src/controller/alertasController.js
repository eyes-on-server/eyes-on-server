const alertasModel = require("../model/alertasModel");

function coletarDados(req, res) {
  const idEmpresa = req.body.idEmpresaServer;
  const dataAtual = req.body.dataAtualServer;
  const fkComponente = req.body.fkComponenteServer;
  const fkServidor = req.body.fkServidorServer;

  if (fkComponente == 0 && fkServidor == 0) {
    coletarTodosDados(idEmpresa, dataAtual, res);
  }
}

function coletarTodosDados(idEmpresa, dataAtual, res) {
  alertasModel
    .coletarTodosDados(idEmpresa, dataAtual)
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

function realizarRankingServidores(req, res) {
  const idEmpresa = req.body.idEmpresaServer;
  const dataAtual = req.body.dataAtualServer;
  const fkComponente = req.body.fkComponenteServer;
  const fkServidor = req.body.fkServidorServer;

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

module.exports = {
  coletarDados,
  realizarRankingServidores,
};
