const express = require("express");
const rota = express.Router();

const downtimeController = require("../controller/downtimeController");

rota.get("/popularCards/:fkEmpresa", (req, res) => {
  downtimeController.popularCards(req, res);
});

rota.get("/popularTabela/:fkEmpresa", (req, res) => {
  downtimeController.popularTabela(req, res);
});

rota.get("/downtimePorLocal/:fkEmpresa", (req, res) => {
  downtimeController.downtimePorLocal(req, res);
});

module.exports = rota;
