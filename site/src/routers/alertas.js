const express = require("express");
const alertasController = require("../controller/alertasController");

const rota = express.Router();

rota.get("/coletarTodosAlertas/:idEmpresa", (req, res) => {
  alertasController.coletarTodosAlertas(req, res);
});

module.exports = rota;
