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
            res.status(204).send("TÁ VAZIO AQUI TIO, CADE AS INFO???!");
        }

    }).catch((erro) => {
        console.log(erro);
        console.log("!! ERRO > EmpresaController: Listar()\n", erro.sqlMessage)
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

module.exports = {
    listar,
    cadastrar
}