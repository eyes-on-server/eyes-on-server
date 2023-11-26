const bancoDados = require("../database/config");

function grafico(fkEmpresa) {

    var query = `
    
    SELECT * FROM Eyes_On_Server.Usuario where fk_empresa = ${fkEmpresa};
    `
    // select* from Eyes_On_Server.view_componentes_servidores order by servidor;
    // info("grafico()", query);
    return bancoDados.executar(query);
}

function buscarInfo(select) {
    // info("buscarInfo", select);

    return bancoDados.executar(select);
}

function setDados(select) {
    // info("buscarInfo", select);

    return bancoDados.executar(select);
}


module.exports = {
    grafico,
    buscarInfo,
    setDados
};
