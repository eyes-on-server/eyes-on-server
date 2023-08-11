const express = require("express");
const rota = express.Router();

const empresaController = require("../controller/empresaController");

function info(nome_rota) {
    console.log(`\n[Empresa Rota] ${nome_rota}`)
};

rota.get("/listar", (req,res) => {
    info("Listar");
    empresaController.listar(req, res);
});

rota.post("/cadastrar", (req, res) => {
    info("Cadastrar");
    empresaController.cadastrar(req, res);
});

module.exports = rota;