const bancoDados = require('../database/config');

// Funções Locais (Não será exportar)-----------
function info(nome_funcao, info_query) {
    console.log(`\n[User Model] ${nome_funcao} => ${info_query}`);
}


// Funções para exportar
function listar() {
    var query = 'SELECT * FROM usuario';

    info("listar()", query);

    return bancoDados.consultaBd(query);
}

function cadastrar(nome, email, senha){
    var query  = `INSERT INTO usuario (nome, email, senha) VALUES ('${nome}', '${email}', '${senha}')`;

    info("cadastrar()", query);

    return bancoDados.consultaBd(query);
}

function login(email, senha) {
    var query = `SELECT idusuario, nome, email, senha FROM usuario WHERE email = "${email}" AND senha = ${senha};`;

    info("login()", query);

    return bancoDados.consultaBd(query);
}

module.exports = {
    listar,
    cadastrar,
    login
}

