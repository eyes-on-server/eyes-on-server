const downtimeModel = require("../model/downtimeModel");

function popularCards(req, res) {
  const fkEmpresa = req.params.fkEmpresa;

  downtimeModel
    .popularCards(fkEmpresa)
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

function popularTabela(req, res) {
  const fkEmpresa = req.params.fkEmpresa;

  downtimeModel
    .popularTabela(fkEmpresa)
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

function downtimePorLocal(req, res) {
  const fkEmpresa = req.params.fkEmpresa;

  downtimeModel
    .downtimePorLocal(fkEmpresa)
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

function downtimePorDia(req, res) {
  const fkEmpresa = req.params.fkEmpresa;

  downtimeModel
    .downtimePorDia(fkEmpresa)
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
  popularCards,
  popularTabela,
  downtimePorLocal,
  downtimePorDia,
};
