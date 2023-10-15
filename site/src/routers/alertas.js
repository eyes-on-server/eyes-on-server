const express = require("express");
const alertasController = require("../controller/alertasController");

const rota = express.Router();

rota.post("/coletarDados", (req, res) => {
  alertasController.coletarDados(req, res);
});

rota.post("/realizarRankingServidores", (req, res) => {
  alertasController.realizarRankingServidores(req, res);
});

module.exports = rota;
