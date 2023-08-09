const express = require("express");
const rota = express.Router();

const userController = require("../controller/userController");

function info(nome_rota){
    console.log(`\n[User Rota] ${nome_rota}`)
}

rota.get("/listar", (req, res) => {
    info("Listar");
    userController.listar(req, res);
});

module.exports = rota;