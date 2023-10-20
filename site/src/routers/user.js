const express = require("express");
const rota = express.Router();

const userController = require("../controller/userController");

function info(nome_rota) {
  console.log(`\n[User Rota] ${nome_rota}`);
}

rota.get("/listar", (req, res) => {
  info("Listar");
  userController.listar(req, res);
});

rota.post("/cadastrar", (req, res) => {
  info("Cadastrar");
  userController.cadastrar(req, res);
});



rota.post("/login", (req, res) => {
  userController.login(req, res);
});

rota.post("/consultar", (req, res) => {
  info("Consultar");
  userController.consultar(req, res);
});

rota.post("/atualizar", (req, res) => {
  info("Atualizar");
  userController.atualizar(req, res);
});

rota.post("/deletar", (req, res) => {
  info("Deletar");
  userController.deletar(req, res);
});

module.exports = rota;
