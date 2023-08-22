const bancoDados = require('../database/config');

// Funções Locais =-=-=-=-=-=-=-=-=-=-=-=-=-=-=
function info(nome_funcao, info_query) {
    console.log(`\n[Desenvolvedor Model] ${nome_funcao} => ${info_query}`);
}


// Funções para Exportar =-=-=-=-=-=-=-=-=-=-=-=-=-=-=
function listar() {
    var query = 'SELECT * FROM desenvolvedor';
    
    info("Listar()", query);
    return bancoDados.consultaBd(query);
}

function cadastrar(nomeDev, emailDev, senhaDev){
    var query = `INSERT INTO desenvolvedor (nomeDev, emailDev, senhaDev) VALUES ('${nomeDev}', '${emailDev}', '${senhaDev}')`
    info("Cadastrar()", query)
    return bancoDados.consultaBd(query);
}

function login(emailDev, senhaDev) {
    var query = `SELECT * FROM desenvolvedor WHERE email = "${emailDev}" AND senha = ${senhaDev};`;

    info("login()", query);

    return bancoDados.consultaBd(query);
}

function alterar_nome(idDev, nomeDev){
    var query = `UPDATE desenvolvedor SET nomeDev = '${nomeDev}' WHERE idDev = ${idDev};`;
    info("alterar_nome()", query);
    return bancoDados.consultaBd(query);
}

function deletar(idDev, senhaDev){
    var query = `DELETE FROM desenvolvedor WHERE idDev = ${idDev} AND senhaDev = '${senhaDev}';`;

    info("Deletar()", query);
    return bancoDados.consultaBd(query);
}


module.exports = {
    listar,
    cadastrar,
    login,
    alterar_nome,
    deletar
}


/*

FUNÇÕES EM TESTE ---- TESTE TESTE TESTE TESTE TESTE :)

CASO FUNCIONE: Para expoortar deixe acima do module.exports()

*/
function alterar_senha(){
    var query = `UPDATE desenvolvedor SET senhaDev = '${senhaDev}' WHERE idDev = ${idDev};`

    info("alterar_senha()", query);
    return bancoDados.consultaBd(query);
}

function alterar_email(){
    var query = `UPDATE desenvolvedor SET emailDev = '${emailDev}' WHERE idDev = ${idDev};`
    
    info("alterar_email()", query);

    return bancoDados.consultaBd(query);

}

