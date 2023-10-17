const express = require("express");
const alertasController = require("../controller/alertasController");

const rota = express.Router();

rota.post("/coletarDadosCards", (req, res) => {
  alertasController.coletarDadosCards(req, res);
});

rota.post("/realizarRankingServidores", (req, res) => {
  alertasController.realizarRankingServidores(req, res);
});

rota.post("/realizarRankingLocais", (req, res) => {
  alertasController.realizarRankingLocais(req, res);
});

rota.post("/coletarDadosTipoAlerta", (req, res) => {
  alertasController.coletarDadosTipoAlerta(req, res);
});

module.exports = rota;
