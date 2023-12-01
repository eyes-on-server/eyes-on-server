const express = require("express");
const rota = express.Router();

const percentQuedaController = require("../controller/percentQuedaController");

rota.get("/popularTabelaQueda/:data/:fkEmpresa", (req, res) => {
  percentQuedaController.popularTabelaQueda(req, res);
});

rota.get("/popularTabelaQuedaPrevisao/:data/:fkEmpresa", (req, res) => {
  percentQuedaController.popularTabelaQuedaPrevisao(req, res);
});

rota.get("/atualizarKPI/:fkEmpresa", (req, res) => {
  percentQuedaController.atualizarKPI(req, res);
});

rota.get("/carregarDadosServidor/:data/:fkEmpresa", (req, res) => {
  percentQuedaController.carregarDadosServidorInicio(req, res);
});


rota.get("/carregarDadosServidor2/:idServidor/:fkEmpresa", (req, res) => {
  percentQuedaController.carregarDadosServidor(req, res);
});

rota.get("/carregarDadosServidorPrevisao/:idServidor/:fkEmpresa", (req, res) => {
  percentQuedaController.carregarDadosServidorPrevisao(req, res);
});



module.exports = rota;