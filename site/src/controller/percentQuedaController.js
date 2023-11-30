const percentQuedaModel = require("../model/percentQuedaModel");


function popularTabelaQueda(req, res) {


  percentQuedaModel
    .popularTabelaQueda()
    .then((result) => {
      if (result.length > 0) {
        res.status(200).json(result);
      } else {
        res.status(500).send("Não foram encontrados registros!");
      }
    })
    .catch((erro) => {
      console.error(erro);
    });
}

function popularTabelaQuedaPrevisao(req, res) {


  percentQuedaModel
    .popularTabelaQuedaPrevisao()
    .then((result) => {
      if (result.length > 0) {
        res.status(200).json(result);
      } else {
        res.status(500).send("Não foram encontrados registros!");
      }
    })
    .catch((erro) => {
      console.error(erro);
    });
}


function carregarDadosServidorInicio(req, res) {


  percentQuedaModel
    .carregarDadosServidorInicio()
    .then((result) => {
      if (result.length > 0) {
        res.status(200).json(result);
      } else {
        res.status(500).send("Não foram encontrados registros!");
      }
    })
    .catch((erro) => {
      console.error(erro);
    });
}


function carregarDadosServidor(req, res) {
  const idServidor = req.params.idServidor;

  percentQuedaModel
    .carregarDadosServidor(idServidor)
    .then((result) => {
      if (result.length > 0) {
        res.status(200).json(result);
      } else {
        res.status(500).send("Não foram encontrados registros!");
      }
    })
    .catch((erro) => {
      console.error(erro);
    });
}

module.exports = {
  popularTabelaQueda,
  popularTabelaQuedaPrevisao,
  carregarDadosServidorInicio,
  carregarDadosServidor


};