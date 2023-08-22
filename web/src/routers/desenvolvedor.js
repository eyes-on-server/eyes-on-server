const express = require("express");
const rota = express.Router();
const devController = require("../controller/desenvolvedorController")

// Funções local
function info(nome_rota) {
    console.log(`\n[Desenvolvedor Rota] ${nome_rota}`)
};


// Rotas para exportar
rota.get("/listar", (req,res) => {
    info("Listar");
    devController.listar(req, res);
});

rota.post("/cadastrar", (req,res) => {
    info("Cadastar");
    devController.cadastrar(req, res);
});



module.exports = rota;