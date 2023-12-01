const percentQuedaModel = require("../model/percentQuedaModel");


function popularTabelaQueda(req, res) {
  const data = req.params.data
  const fkEmpresa = req.params.fkEmpresa

  percentQuedaModel
    .popularTabelaQueda(data, fkEmpresa)
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
  const data = req.params.data
  const fkEmpresa = req.params.fkEmpresa

  percentQuedaModel
    .popularTabelaQuedaPrevisao(data, fkEmpresa)
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

function atualizarKPI(req, res) {
  const fkEmpresa = req.params.fkEmpresa

  percentQuedaModel
    .atualizarKPI(fkEmpresa)
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
  const data = req.params.data
  const fkEmpresa = req.params.fkEmpresa
  

  percentQuedaModel
    .carregarDadosServidorInicio(data, fkEmpresa)
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
  const fkEmpresa = req.params.fkEmpresa
  

  percentQuedaModel
    .carregarDadosServidor(idServidor, fkEmpresa)
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

function carregarDadosServidorPrevisao(req, res) {
  const idServidor = req.params.idServidor;
  const fkEmpresa = req.params.fkEmpresa

  percentQuedaModel
    .carregarDadosServidorPrevisao(idServidor, fkEmpresa)
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
  atualizarKPI,
  carregarDadosServidorInicio,
  carregarDadosServidor,
  carregarDadosServidorPrevisao


};