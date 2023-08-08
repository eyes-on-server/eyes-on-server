var userModel = require('../model/userModel');

function listar(req, res) {
    userModel.listar().then((resultado)=> {

        if (resultado.lenght > 0) {
            res.status(200).json(resultado);
        }
        else {
            res.status(204).json.send("NAO ACHOU NADA NESSA BRINCADEIRA DE MAL GOSTO!!!")
        }

    }).catch((erro) => {
        console.log(erro);
        console.log("HOUVE UM ERRO AQUI HEIN!!! \n", erro.sqlMessage)
    })
}

module.exports = {
    listar
}

