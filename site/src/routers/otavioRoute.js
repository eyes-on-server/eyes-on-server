const express = require("express");
const rota = express.Router();

const otavioController = require('../controller/otavioController');


rota.post("/grafico", (req, res) => {
    // info("Grafico");
    otavioController.grafico(req, res);
});

rota.post("/graficoCPU", (req, res) => {
    // info("Grafico");
    otavioController.graficoCPU(req, res);
});

rota.post("/graficoDisco", (req, res) => {
    // info("Grafico");
    otavioController.graficoDisco(req, res);
});

rota.post("/processos", (req, res) => {
    // info("Grafico");
    otavioController.processos(req, res);
});

rota.post("/buscarInformacoes", (req, res) => {
    // info("/buscarInformacoes");
    otavioController.buscarInfo(req, res);
});

rota.post("/setDados", (req, res) => {
    // info("/setDados");
    otavioController.setDados(req, res);
});

module.exports = rota;







// rota.post("/buscarInformacoes", (req, res) => {
//   info("/buscarInformacoes");
//   graficosAnalistaController.buscarInfo(req, res);
// });

