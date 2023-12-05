const express = require("express");
const rota = express.Router();

const temperaturaController = require("../controller/temperaturaController");

rota.get('/dadosUsoCpuPorServidor/:fkServidor', (req, res) => {
    temperaturaController.dadosUsoCpuPorServidor(req, res)
})
rota.get('/dadosUsoMemPorServidor/:fkServidor', (req, res) => {
    temperaturaController.dadosUsoMemPorServidor(req, res)
})
rota.get('/dadosUsoDiscoPorServidor/:fkServidor', (req, res) => {
    temperaturaController.dadosUsoDiscoPorServidor(req, res)
})
rota.get('/dadosTemperaturaPorServidor/:fkServidor', (req, res) => {
    temperaturaController.dadosTemperaturaPorServidor(req, res)
})
rota.get('/servidoresPorEmpresa/:fkEmpresa', (req, res) => {
    temperaturaController.servidoresPorEmpresa(req, res)
})

module.exports = rota;