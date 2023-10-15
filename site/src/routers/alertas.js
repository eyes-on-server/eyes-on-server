const express = require("express");
const alertasController = require("../controller/alertasController");

const rota = express.Router();

rota.post("/coletarAlertasComponentes", (req, res) => {
  alertasController.coletarAlertasComponentes(req, res);
});

module.exports = rota;
