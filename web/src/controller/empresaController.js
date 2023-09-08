var empresaModel = require('../model/empresaModel');

// Funções Locais (Não será para exportar)-----------
function info(nome_funcao) {
    console.log(`\n[Empresa Controller] ${nome_funcao}`);
}

// Funções para exportar
function listar(req, res) {
    info("listar()")
    empresaModel.listar().then((resultado)=> {
        if (resultado.length > 0) {
            res.status(200).json(resultado);
        }
        else {
            res.status(204).send("Não foi possível retornar algum valor.");
        }

    }).catch((erro) => {
        console.log(erro);
        console.log("!! ERRO > EmpresaController: Listar()\n", erro.sqlMessage)
    })
}

function selecionar(req, res) {
    info("selecionar()")

    var idEmpresa = req.body.idEmpresa_html;
    
    empresaModel.selecionar(idEmpresa).then((resultado)=> {
        if (resultado.length > 0) {
            console.log(resultado);
            res.json(resultado[0]); 
        }
        else {
            res.status(204).send("Não foi possível retornar algum valor.");
        }

    }).catch((erro) => {
        console.log(erro);
        console.log("!! ERRO > EmpresaController: Seleciona()\n", erro.sqlMessage)
    })
}

function cadastrar(req, res){
    
    info("cadastrar()");
    var nomeEmpresa = req.body.nomeEmpresa_html;
    var cnpj = req.body.cnpj_html;
    var emailEmpresa = req.body.emailEmpresa_html;
    
    if(nomeEmpresa == undefined){
        res.status(400).send("Seu nome está indefinido!");
    } else if (cnpj == undefined){
        res.status(400).send("Seu cnpj está indefinido!");
    } else if (emailEmpresa == undefined){
        res.status(400).send("Seu email está indefinido!");
    } else {

        empresaModel.cadastrar(nomeEmpresa, cnpj, emailEmpresa).then(
            function (resultado){
                res.json(resultado);
            }
        ).catch(
            function (erro){
                console.log(erro);
                console.log(erro.sqlMessage);
                res.status(500).json(erro.sqlMessage);
            }
        );
    }
}

function atualizar(req, res) {
    info("atualizar()");
    var idEmpresa_server = req.body.idEmpresa_html;
    var nomeFantasia_server = req.body.nomeFantasia_html;
    var cnpj_server = req.body.cnpj_html;
    var email_server = req.body.email_html;

    if(idEmpresa_server == undefined){
        res.status(400).send("Seu idEmpresa está indefinido!");
    } else if (nomeFantasia_server == undefined){
        res.status(400).send("Seu nomeFantasia está indefinido!");
    } else if (cnpj_server == undefined){
        res.status(400).send("Seu cnpj está indefinido!");
    }else if (email_server == undefined){
        res.status(400).send("Seu email está indefinido!");
    } else {
        empresaModel.atualizar(idEmpresa_server, nomeFantasia_server, cnpj_server, email_server).then (
            function (resultado) {
                res.json(resultado);
            }
        ).catch(
            function(erro) {
                console.log(erro);
                console.log(erro.sqlMessage);
                res.status(500).json(erro.sqlMessage);
            }
        )
    }
}

function deletar(req, res) {
    info ("deletar()");
    var cnpj_server = req.body.cnpj_html;
    var email_server = req.body.email_html;

    if (cnpj_server == undefined){
        res.status(400).send("Seu cnpj está indefinido!");
    } else if (email_server == undefined){
        res.status(400).send("Seu email está indefinido!");
    } 
     else {
        userModel.deletar(cnpj_server, email_server).then(
            function (resultado){
                res.json(resultado);
            }
        ).catch(
            function (erro){
                console.log(erro);
                console.log(erro.sqlMessage);
                res.status(500).json(erro.sqlMessage);
            }
        );
    }
}

module.exports = {
    listar,
    cadastrar,
    atualizar,
    deletar,
    selecionar
};