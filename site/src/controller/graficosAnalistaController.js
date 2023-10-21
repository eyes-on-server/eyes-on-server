var userModel = require("../model/graficosAnalistaModel");

function info(nome_funcao) {
  console.log(`\n[Graficos Analista Controller] ${nome_funcao}`);
}

function buscarInfo(req, res) {
  info("/buscarInfo");

  var select = req.body.selectServer;
  console.log(req.body);

  if (select == undefined) {
    res.status(400).send("O nome fantasia da empresa está indefinido!");
  }

  userModel
    .buscarInfo(select)
    .then((resultado) => {
      if (resultado.length > 0) {
        console.log(resultado);
        res.status(200).json(resultado);
      } else {
        res.status(204).json(resultado);
      }
    })
    .catch((error) => {
      console.log(error);
      console.log(
        "Erro na Graficos Analista Controller: /buscarservidores\n",
        erro.sqlMessage
      );
    });
}

module.exports = {
  buscarInfo,
};
