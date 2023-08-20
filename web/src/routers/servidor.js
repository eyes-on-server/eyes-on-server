const express = require("express");
const rota = express.Router();

const servidorController = require("../controller/servidorController");

function info(nome_rota){
    console.log(`\n[Servidor Rota] ${nome_rota}`)
};

rota.get("/listar", (req, res) => {
    info("Listar");
    servidorController.listar(req, res);
});

rota.post("/cadastrar", (req, res) => {
    info("Cadastrar");
    servidorController.cadastrar(req, res);
});

module.exports = rota;
