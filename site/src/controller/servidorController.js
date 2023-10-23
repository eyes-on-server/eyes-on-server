var servidorModel = require('../model/servidorModel');

// Funções Locais (Não será para exportar)-----------
function info(nome_funcao) {
    console.log(`\n[Servidor Controller] ${nome_funcao}`);
}

// Funções para exportar
function listar(req, res) {
    info("listar()")
    var fkEmpresa = req.body.fkEmpresa_html;
    console.log(req.body.fkEmpresa_html)

    if(fkEmpresa == undefined){
        res.status(400).send("O nome do Servidor está indefinido")
    } else

    servidorModel.listar(fkEmpresa).then((resultado) => {
        if (resultado.length > 0){
            res.status(200).json(resultado);
        }
        else{
            res.status(204).send("TÁ VAZIO AQUI TIO, CADE AS INFO???!");
        }
    }).catch((erro) =>{
        console.log(erro);
        console.log("!!ERRO > ServidorController: Listar()\n",erro.sqlMessage)
    })
}

function cadastrar(req, res){
    info("cadastrar()");
    var nomeServidor = req.body.nomeServidor_html;
    var tipoServidor = req.body.tipoServidor_html;
    var descricaoServidor = req.body.descricaoServidor_html;
    var localServidor = req.body.localServidor_html;
    
    console.log(req.body.nomeServidor_html)
    if(nomeServidor == undefined){
        res.status(400).send("O nome do Servidor está indefinido")
    } else if(tipoServidor == undefined){
        res.status(400).send("O tipo do Servidor está indefinido")
    } else if(descricaoServidor == undefined){
        res.status(400).send("O descricao do Servidor está indefinido")
    } else if(localServidor == undefined){
        res.status(400).send("O local do Servidor está indefinido")
    } else {
        servidorModel.cadastrar(nomeServidor, tipoServidor, descricaoServidor, localServidor).then(
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

function consultar(req, res){
    info("consultar()")
    var nomeServidor = req.body.nomeServidor_html;

    if(nomeServidor == undefined){
        res.status(400).send("O nome está indefinido!");
    }

    servidorModel.consultar(nomeServidor).then((resultado)=> {

        if (resultado.length > 0) {
            res.status(200).json(resultado);
        }
        else {
            res.status(204).send("NAO ACHOU NADA NESSA BRINCADEIRA DE MAL GOSTO!!!");
        }

    }).catch((erro) => {
        console.log(erro);
        console.log("!! ERRO > ServidorController: Listar()\n", erro.sqlMessage)
    })
}

function atualizar(req, res){
    info("atualizar()");
    var idServidor = req.body.idServidor_html;
    var nomeServidor = req.body.nomeServidor_html;
    var tipoServidor = req.body.tipoServidor_html;
    var descricaoServidor = req.body.descricaoServidor_html;
    var localServidor = req.body.localServidor_html;
    
    
    if(idServidor == undefined){
        res.status(400).send("O ID do Servidor está indefinido")
    }else if(nomeServidor == undefined){
        res.status(400).send("O nome do Servidor está indefinido")
    } else if(tipoServidor == undefined){
        res.status(400).send("O tipo do Servidor está indefinido")
    } else if(descricaoServidor == undefined){
        res.status(400).send("A descricao do Servidor está indefinido")
    } else if(localServidor == undefined){
        res.status(400).send("O local do Servidor está indefinido")
    } else {
        servidorModel.atualizar(idServidor, nomeServidor, tipoServidor, descricaoServidor, localServidor).then(
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

function deletar(req, res){
    info("deletar()");
    var idServidor = req.body.idServidor_html;
    var nomeServidor = req.body.nomeServidor_html;
    
    if (idServidor == undefined){
        res.status(400).send("Seu ID está indefinido!");
    } else if (nomeServidor == undefined){
        res.status(400).send("Seu nome está indefinido!");
    } 
     else {
        servidorModel.deletar(idServidor, nomeServidor).then(
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
    consultar,
    atualizar,
    deletar
}