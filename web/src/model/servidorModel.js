const bancoDados = require('../database/config');

//Funcões Locais (não exportará) ---------------
function info(nome_funcao, info_query){
    console.log(`\n[Servidor Model] ${nome_funcao} => ${info_query}`);
}

//Funções para exportar
function listar(){
    var query = 'SELECT * FROM servidor';

    info("listar()", query);

    return bancoDados.consultaBd(query);
}

function cadastrar(nomeServidor, tipoServidor, descricaoServidor, localServidor){
    var query = `INSERT INTO servidor (nomeServidor, tipoServidor, descricaoServidor, localServidor) VALUES ('${nomeServidor}', '${tipoServidor}', '${descricaoServidor}', '${localServidor}')`;
    
    info("cadastrar()", query);

    return bancoDados.consultaBd(query);
}


module.exports = {
    listar, 
    cadastrar
}