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

rota.post("/consultar", (req, res) => {
    info("Consultar");
    servidorController.consultar(req, res);
})

rota.post("/atualizar", (req, res) => {
    info("Atualizar");
    servidorController.atualizar(req, res);
})

rota.post("/deletar", (req, res) => {
    info("Deletar");
    servidorController.deletar(req, res);
})

module.exports = rota;
