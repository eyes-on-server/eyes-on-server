const bancoDados = require("../database/config");

function grafico(fkEmpresa) {

    var query = `
    SELECT
    s.nome_servidor AS Servidor,
    c.nome_componente AS Componente,
    m.nome_medida AS Medida,
    r.valor_registro AS Valor,
    CONVERT(VARCHAR, r.momento_registro, 108) AS Horario_Captura
FROM
    Registro r
    JOIN Componente_Servidor cs ON r.fk_componente_servidor = cs.id_componente_servidor
    JOIN Componente_Medida cm ON cs.fk_componente_medida = cm.id_componente_medida
    JOIN Componente c ON cm.fk_componente = c.id_componente
    JOIN Medida m ON cm.fk_medida = m.id_medida
    JOIN Servidor s ON cs.fk_servidor = s.id_servidor
WHERE
    s.id_servidor = ${fkEmpresa}
    AND c.nome_componente = 'Memoria'
    AND m.nome_medida = 'PorcentagemUso'
ORDER BY
    r.momento_registro DESC
OFFSET 0 ROWS FETCH NEXT 10 ROWS ONLY;
    `

    // sql server
    // SELECT
    //     s.nome_servidor AS Servidor,
    //     c.nome_componente AS Componente,
    //     m.nome_medida AS Medida,
    //     r.valor_registro AS Valor,
    //     DATE_FORMAT(r.momento_registro, '%H:%i:%s') AS Horario_Captura
    // FROM
    //     Registro r
    //     JOIN Componente_Servidor cs ON r.fk_componente_servidor = cs.id_componente_servidor
    //     JOIN Componente_Medida cm ON cs.fk_componente_medida = cm.id_componente_medida
    //     JOIN Componente c ON cm.fk_componente = c.id_componente
    //     JOIN Medida m ON cm.fk_medida = m.id_medida
    //     JOIN Servidor s ON cs.fk_servidor = s.id_servidor
    // WHERE
    //     s.id_servidor = ${fkEmpresa}
    //     AND c.nome_componente = 'Memoria'
    //     AND m.nome_medida = 'PorcentagemUso'
    // ORDER BY
    //     r.momento_registro DESC
    // LIMIT 10;



    return bancoDados.executar(query);
}


function graficoCPU(fkEmpresa) {

    var query = `
    SELECT
    s.nome_servidor AS Servidor,
    c.nome_componente AS Componente,
    m.nome_medida AS Medida,
    r.valor_registro AS Valor,
    CONVERT(VARCHAR, r.momento_registro, 108) AS Horario_Captura
FROM
    Registro r
    JOIN Componente_Servidor cs ON r.fk_componente_servidor = cs.id_componente_servidor
    JOIN Componente_Medida cm ON cs.fk_componente_medida = cm.id_componente_medida
    JOIN Componente c ON cm.fk_componente = c.id_componente
    JOIN Medida m ON cm.fk_medida = m.id_medida
    JOIN Servidor s ON cs.fk_servidor = s.id_servidor
WHERE
    s.id_servidor = ${fkEmpresa}
    AND c.nome_componente = 'Cpu'
    AND m.nome_medida = 'PorcentagemUso'
ORDER BY
    r.momento_registro DESC
OFFSET 0 ROWS FETCH NEXT 10 ROWS ONLY;
    `

    // Mysql
    // SELECT
    //     s.nome_servidor AS Servidor,
    //     c.nome_componente AS Componente,
    //     m.nome_medida AS Medida,
    //     r.valor_registro AS Valor,
    //     DATE_FORMAT(r.momento_registro, '%H:%i:%s') AS Horario_Captura
    // FROM
    //     Registro r
    //     JOIN Componente_Servidor cs ON r.fk_componente_servidor = cs.id_componente_servidor
    //     JOIN Componente_Medida cm ON cs.fk_componente_medida = cm.id_componente_medida
    //     JOIN Componente c ON cm.fk_componente = c.id_componente
    //     JOIN Medida m ON cm.fk_medida = m.id_medida
    //     JOIN Servidor s ON cs.fk_servidor = s.id_servidor
    // WHERE
    //     s.id_servidor = ${fkEmpresa}
    //     AND c.nome_componente = 'Cpu'
    //     AND m.nome_medida = 'PorcentagemUso'
    // ORDER BY
    //     r.momento_registro DESC
    // LIMIT 10;

    return bancoDados.executar(query);
}


function graficoDisco(fkEmpresa) {

    var query = `SELECT
    s.nome_servidor AS Servidor,
    c.nome_componente AS Componente,
    m.nome_medida AS Medida,
    r.valor_registro AS Valor,
    CONVERT(VARCHAR, r.momento_registro, 108) AS Horario_Captura
FROM
    Registro r
    JOIN Componente_Servidor cs ON r.fk_componente_servidor = cs.id_componente_servidor
    JOIN Componente_Medida cm ON cs.fk_componente_medida = cm.id_componente_medida
    JOIN Componente c ON cm.fk_componente = c.id_componente
    JOIN Medida m ON cm.fk_medida = m.id_medida
    JOIN Servidor s ON cs.fk_servidor = s.id_servidor
WHERE
    s.id_servidor = ${fkEmpresa}
    AND c.nome_componente = 'Disco'
    AND m.nome_medida = 'PorcentagemUso'
ORDER BY
    r.momento_registro DESC
OFFSET 0 ROWS FETCH NEXT 10 ROWS ONLY;
    `

    // Mysql
    //     SELECT
    //     s.nome_servidor AS Servidor,
    //     c.nome_componente AS Componente,
    //     m.nome_medida AS Medida,
    //     r.valor_registro AS Valor,
    //     DATE_FORMAT(r.momento_registro, '%H:%i:%s') AS Horario_Captura
    // FROM
    //     Registro r
    //     JOIN Componente_Servidor cs ON r.fk_componente_servidor = cs.id_componente_servidor
    //     JOIN Componente_Medida cm ON cs.fk_componente_medida = cm.id_componente_medida
    //     JOIN Componente c ON cm.fk_componente = c.id_componente
    //     JOIN Medida m ON cm.fk_medida = m.id_medida
    //     JOIN Servidor s ON cs.fk_servidor = s.id_servidor
    // WHERE
    //     s.id_servidor = ${fkEmpresa}
    //     AND c.nome_componente = 'Disco'
    //     AND m.nome_medida = 'PorcentagemUso'
    // ORDER BY
    //     r.momento_registro DESC
    // LIMIT 10;





    return bancoDados.executar(query);
}


function processos(fkEmpresa) {

    var query = `SELECT nome_processos, COUNT(*) AS quantidade
    FROM Processos
	Where fk_servidor = ${fkEmpresa}
    GROUP BY nome_processos
    ORDER BY quantidade DESC
    OFFSET 0 ROWS FETCH NEXT 80 ROWS ONLY`

    // Mysql
    // SELECT nome_processos, COUNT(*) AS quantidade
    //     FROM Processos
    //     GROUP BY nome_processos
    //     LIMIT 80;


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
    processos,
    buscarInfo,
    setDados
};
