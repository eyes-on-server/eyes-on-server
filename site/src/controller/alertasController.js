const alertasModel = require("../model/alertasModel");

function coletarAlertasComponentes(req, res) {
  const idEmpresa = req.body.idEmpresaServer;
  const dataAtual = req.body.dataAtualServer;

  alertasModel
    .coletarAlertasComponentes(idEmpresa, dataAtual)
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
  coletarAlertasComponentes,
};
