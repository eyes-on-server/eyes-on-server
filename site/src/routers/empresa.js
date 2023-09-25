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

rota.post("/selecionar", (req,res) => {
    info("selecionar");
    empresaController.selecionar(req, res);
});

rota.post("/cadastrar", (req, res) => {
    info("Cadastrar");
    empresaController.cadastrar(req, res);
});

rota.post("/atualizar", (req, res) =>{
    info("Atualizar")
    empresaController.atualizar(req, res)
})

rota.post("/deletar", (req, res) =>{
    info("Deletar")
    empresaController.deletar(req, res)
})

module.exports = rota;