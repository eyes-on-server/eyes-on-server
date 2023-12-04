const express = require("express");
const rota = express.Router();

const isaController = require("../controller/isaController");

rota.get("/buscarNomeServidores/:companyName", (req, res) => {
    isaController.buscarNomeServidores(req, res);
});

rota.get("/buscaridServidores/:serverName", (req, res) => {
    isaController.buscaridServidores(req, res);
});

rota.get("/buscarConsumo/:fk_servidor/:company", (req, res) => {
    isaController.buscarConsumo(req, res);
});

rota.get("/buscarPrevisaoConsumo", (req, res) => {
    isaController.buscarPrevisaoConsumo(req, res);
});

module.exports = rota;