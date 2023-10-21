const express = require("express");
const rota = express.Router();

const graficosAnalistaController = require("../controller/graficosAnalistaController");

function info(nome_rota) {
  console.log(`\n[Graficos Analista routers] ${nome_rota}`);
}

rota.post("/buscarInformacoes", (req, res) => {
  info("/buscarInformacoes");
  graficosAnalistaController.buscarInfo(req, res);
});

module.exports = rota;
