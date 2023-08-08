const express = require("express");

const rota = express.Router();

const userController = require("../controller/userController");

rota.get("/listar", (req, res) => {
    userController.listar(req, res);
});

module.exports = rota;