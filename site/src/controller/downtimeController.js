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

module.exports = {
  popularCards,
};
