var devModel = require("../model/desenvovedorModel")

// Funções Locais =-=-=-=-=-=-=-=-=-=-=
function info(nome_funcao) {
    console.log(`\n[Desenvolvedor Controller] ${nome_funcao}`);
}


// Funçõespara exportar =-=-=-=-=-=-=-=-
function listar(req, res) {
    info("Listar()")

    devModel.listar().then((resultado) => {
        if (resultado.length > 0) {
            res.status(200).json(resultado);
        }
        else {
            res.status(204).send("Sem informações no Banco de Dados!");
        }

    }).catch((erro) => {
        console.log(erro);
        console.log("!! ERRO >>> Dev Controller: Listar()\n", erro.sqlMessage)
    })

}

function cadastrar(req, res) {
    info("Cadastrar()")

    var nomeDev = req.body.nome_html;
    var emailDev = req.body.email_html;
    var senhaDev = req.body.senha_html;

    if (nomeDev == undefined) {
        res.status(400).send("Seu nome está indefinido");
    
    } 
    else if (emailDev == undefined) {
        res.status(400).send("Seu email está indefinido");
    
    } 
    else if (senhaDev == undefined) {
        res.status(400).send("Sua senha está indefinida");
    
    } 
    else {

        devModel.cadastrar(nomeDev, emailDev, senhaDev).then(
            function (resultado) {
                res.json(resultado);
            }

        ).catch(
            function (erro) {
                console.log(erro);
                console.log(erro.sqlMessage);
                res.status(500).json(erro.sqlMessage);
            }
        );
    }



}

function login(req, res) {
    info("Login()")

}

function alterar_nome(req, res) {
    info("alterar_nome()")

}

function deletar(req, res) {
    info("deletar()")


}


module.exports = {
    listar,
    cadastrar
}