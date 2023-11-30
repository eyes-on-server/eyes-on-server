const express = require("express");
const rota = express.Router();

const percentQuedaController = require("../controller/percentQuedaController");

rota.get("/popularTabelaQueda", (req, res) => {
  percentQuedaController.popularTabelaQueda(req, res);
});

rota.get("/popularTabelaQuedaPrevisao", (req, res) => {
  percentQuedaController.popularTabelaQuedaPrevisao(req, res);
});


rota.get("/carregarDadosServidor", (req, res) => {
  percentQuedaController.carregarDadosServidorInicio(req, res);
});


rota.get("/carregarDadosServidor/:idServidor", (req, res) => {
  percentQuedaController.carregarDadosServidor(req, res);
});



module.exports = rota;