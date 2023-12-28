const server = require("./src/app");
const showLog = require("./src/functions/showLog");
const { conn } = require("./src/DB_connection");
const { PORT, SECURE } = require("./src/functions/paramsEnv");

let conSegura = "";
SECURE ? (conSegura = "SEGURA") : (conSegura = "NO SEGURA");

(async () => {
    try {
        await conn.authenticate();
        await conn.sync({ alter: true });
        const serverInstance = server.listen(PORT, () => {
            showLog(`Servidor corriendo en puerto ${PORT}. Tipo de conexión: ${conSegura}`);
        });
    } catch (err) {
        showLog(`Error conectando con la base de datos (¿Está creada?). Verificar y luego reiniciar el servidor (${err})`);
    }
})();
