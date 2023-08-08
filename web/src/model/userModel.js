const bancoDados = require('../database/config');

function listar() {
    var query = 'SELECT * FROM usuario';
    return bancoDados.consultaBd(query)

}

module.exports = {
    listar
}