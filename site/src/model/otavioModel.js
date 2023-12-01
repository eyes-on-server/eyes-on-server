const bancoDados = require("../database/config");

function grafico(fkEmpresa) {

    var query = `
    SELECT
    s.nome_servidor AS Servidor,
    c.nome_componente AS Componente,
    m.nome_medida AS Medida,
    r.valor_registro AS Valor,
    DATE_FORMAT(r.momento_registro, '%H:%i:%s') AS Horario_Captura
FROM
    Eyes_On_Server.Registro r
    JOIN Eyes_On_Server.Componente_Servidor cs ON r.fk_componente_servidor = cs.id_componente_servidor
    JOIN Eyes_On_Server.Componente_Medida cm ON cs.fk_componente_medida = cm.id_componente_medida
    JOIN Eyes_On_Server.Componente c ON cm.fk_componente = c.id_componente
    JOIN Eyes_On_Server.Medida m ON cm.fk_medida = m.id_medida
    JOIN Eyes_On_Server.Servidor s ON cs.fk_servidor = s.id_servidor
WHERE
    s.id_servidor = ${fkEmpresa}
    AND c.nome_componente = 'Memoria'
    AND m.nome_medida = 'PorcentagemUso'
ORDER BY
    r.momento_registro DESC
LIMIT 10;
    `

//     var query2 = `
//     SELECT
//     s.nome_servidor AS Servidor,
//     c.nome_componente AS Componente,
//     m.nome_medida AS Medida,
//     r.valor_registro AS Valor,
//     DATE_FORMAT(r.momento_registro, '%H:%i:%s') AS Horario_Captura
// FROM
//     Eyes_On_Server.Registro r
//     JOIN Eyes_On_Server.Componente_Servidor cs ON r.fk_componente_servidor = cs.id_componente_servidor
//     JOIN Eyes_On_Server.Componente_Medida cm ON cs.fk_componente_medida = cm.id_componente_medida
//     JOIN Eyes_On_Server.Componente c ON cm.fk_componente = c.id_componente
//     JOIN Eyes_On_Server.Medida m ON cm.fk_medida = m.id_medida
//     JOIN Eyes_On_Server.Servidor s ON cs.fk_servidor = s.id_servidor
// WHERE
//     s.id_servidor = ${fkEmpresa}
//     AND c.nome_componente = 'Memoria'
//     AND m.nome_medida = 'PorcentagemUso'
// ORDER BY
//     r.momento_registro DESC
// LIMIT 10;
//     `

// console.log(query)


    return bancoDados.executar(query);
}


function graficoCPU(fkEmpresa) {

    var query = `
    SELECT
    s.nome_servidor AS Servidor,
    c.nome_componente AS Componente,
    m.nome_medida AS Medida,
    r.valor_registro AS Valor,
    DATE_FORMAT(r.momento_registro, '%H:%i:%s') AS Horario_Captura
FROM
    Eyes_On_Server.Registro r
    JOIN Eyes_On_Server.Componente_Servidor cs ON r.fk_componente_servidor = cs.id_componente_servidor
    JOIN Eyes_On_Server.Componente_Medida cm ON cs.fk_componente_medida = cm.id_componente_medida
    JOIN Eyes_On_Server.Componente c ON cm.fk_componente = c.id_componente
    JOIN Eyes_On_Server.Medida m ON cm.fk_medida = m.id_medida
    JOIN Eyes_On_Server.Servidor s ON cs.fk_servidor = s.id_servidor
WHERE
    s.id_servidor = ${fkEmpresa}
    AND c.nome_componente = 'Cpu'
    AND m.nome_medida = 'PorcentagemUso'
ORDER BY
    r.momento_registro DESC
LIMIT 10;
    `


    return bancoDados.executar(query);
}


function graficoDisco(fkEmpresa) {

    var query = `
    SELECT
    s.nome_servidor AS Servidor,
    c.nome_componente AS Componente,
    m.nome_medida AS Medida,
    r.valor_registro AS Valor,
    DATE_FORMAT(r.momento_registro, '%H:%i:%s') AS Horario_Captura
FROM
    Eyes_On_Server.Registro r
    JOIN Eyes_On_Server.Componente_Servidor cs ON r.fk_componente_servidor = cs.id_componente_servidor
    JOIN Eyes_On_Server.Componente_Medida cm ON cs.fk_componente_medida = cm.id_componente_medida
    JOIN Eyes_On_Server.Componente c ON cm.fk_componente = c.id_componente
    JOIN Eyes_On_Server.Medida m ON cm.fk_medida = m.id_medida
    JOIN Eyes_On_Server.Servidor s ON cs.fk_servidor = s.id_servidor
WHERE
    s.id_servidor = ${fkEmpresa}
    AND c.nome_componente = 'Disco'
    AND m.nome_medida = 'PorcentagemUso'
ORDER BY
    r.momento_registro DESC
LIMIT 10;
    `


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
    graficoCPU,
    graficoDisco,
    buscarInfo,
    setDados
};
