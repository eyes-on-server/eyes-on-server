const express = require("express");
const rota = express.Router();

const mailerController = require("../controller/mailerController");

rota.post("/enviarEmail", (req, res) => {
  mailerController.enviarEmail(req, res);
});

module.exports = rota;
