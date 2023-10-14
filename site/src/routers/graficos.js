const express = require("express");
const rota = express.Router();

const graficosController = require("../controller/graficosController");

rota.get("/exibirGrafico", (req, res) => {
    graficosController.exibirGraficos(req, res);
});