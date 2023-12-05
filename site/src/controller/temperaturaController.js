const temperaturaModel = require('../model/temperaturaModel');


function dadosTemperaturaPorServidor(req, res) {
    let fkServidor = req.params.fkServidor

    temperaturaModel.dadosTemperaturaPorServidor(fkServidor).then((resultado) => {
        res.status(200).json(resultado)
    }).catch((erro) => {
        res.status(400).send("Erro")
        console.log(erro)
    })
}

function dadosUsoCpuPorServidor(req, res) {
    let fkServidor = req.params.fkServidor

    temperaturaModel.dadosUsoPorServidor(fkServidor).then((resultado) => {
        res.status(200).json(resultado)
    }).catch((erro) => {
        res.status(400).send("Erro")
        console.log(erro)
    })
}
function dadosUsoMemPorServidor(req, res) {
    let fkServidor = req.params.fkServidor

    temperaturaModel.dadosUsoPorServidor(fkServidor).then((resultado) => {
        res.status(200).json(resultado)
    }).catch((erro) => {
        res.status(400).send("Erro")
        console.log(erro)
    })
}
function dadosUsoDiscoPorServidor(req, res) {
    let fkServidor = req.params.fkServidor

    temperaturaModel.dadosUsoPorServidor(fkServidor).then((resultado) => {
        res.status(200).json(resultado)
    }).catch((erro) => {
        res.status(400).send("Erro")
        console.log(erro)
    })
}

module.exports = {
    dadosTemperaturaPorServidor,
    dadosUsoCpuPorServidor,
    dadosUsoMemPorServidor,
    dadosUsoDiscoPorServidor,
}