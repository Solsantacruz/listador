// !  Muestra el log por consola y también lo guarda en un archivo, si se habilita por parámetro.
const { MUST_LOG } = require('../functions/paramsEnv');
const fs = require('fs');

const showLog = (text) => {
    console.log(text);
    if (parseInt(MUST_LOG) === 1) {
        fs.appendFile("log.txt", new Date().toLocaleString() + ": " + text + '\n', (err) => {
        });
    }
};
module.exports = showLog;