const bancoDados = require('../database/config');

// Funções Locais (Não será exportar)-----------
function info(nome_funcao, info_query) {
    console.log(`\n[EMpresa Model] ${nome_funcao} => ${info_query}`);
}

// Funções para exportar
function listar() {
    var query = 'SELECT * FROM empresa';

    info("listar()", query);

    return bancoDados.consultaBd(query);
}

function cadastrar(nomeFantasia, cnpj, email){
    var query  = `INSERT INTO empresa (nomeFantasia, cnpj, email) VALUES ('${nomeFantasia}', '${cnpj}', '${email}')`;

    info("cadastrar()", query);

    return bancoDados.consultaBd(query);
}

function atualizar (idEmpresa, nomeFantasia, cnpj, email) {
    var query = `UPDATE empresa SET nomeFantasia = "${nomeFantasia}", cnpj = "${cnpj}", email = "${email} WHERE idEmpresa = "${idEmpresa}";`

    info ("atualizar()", query)

    return bancoDados.consultaBd(query);
}

function deletar(cnpj, email){
    var query = `DELETE FROM empresa WHERE cnpj = "${cnpj}" and email = "${email}"`

    info("deletar()", query);

    return bancoDados.consultaBd(query);
}

module.exports = {
    listar,
    cadastrar,
    atualizar,
    deletar
}