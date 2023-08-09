var userModel = require('../model/userModel');

// Funções Locais (Não será para exportar)-----------
function info(nome_funcao) {
    console.log(`\n[User Controller] ${nome_funcao}`);
}

// Funções para exportar
function listar(req, res) {
    info("listar()")
    userModel.listar().then((resultado)=> {

        if (resultado.lenght > 0) {
            res.status(200).json(resultado);
        }
        else {
            res.status(204).send("NAO ACHOU NADA NESSA BRINCADEIRA DE MAL GOSTO!!!");
        }

    }).catch((erro) => {
        console.log(erro);
        console.log("!! ERRO > UserController: Listar()\n", erro.sqlMessage)
    })
}

module.exports = {
    listar
}

