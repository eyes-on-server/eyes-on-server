const express = require("express");
const rota = express.Router();

const temperaturaController = require("../controller/temperaturaController");

rota.get('/dadosUsoPorServidor/:fkServidor', (req, res) => {
    temperaturaController.dadosUsoPorServidor(req, res)
})
rota.get('/dadosTemperaturaPorServidor/:fkServidor', (req, res) => {
    temperaturaController.dadosTemperaturaPorServidor(req, res)
})

module.exports = rota;