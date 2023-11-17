const express = require("express");
const rota = express.Router();

const downtimeController = require("../controller/downtimeController");

rota.get("/poupularCards", (req, res) => {
  downtimeController.popularCards(req, res);
});

module.exports = rota;
