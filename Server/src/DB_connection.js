require('pg'); // requerido por Vercel para el deploy
const { Sequelize } = require('sequelize');
const { DB_USER, DB_PASSWORD, DB_HOST, DB_PORT, DB_NAME, SECURE } = require('./functions/paramsEnv');
// Definición de modelos:
const CuentaModel = require('../src/models/Cuenta');
const ErrorSalidaModel = require('../src/models/ErrorSalida');
// Determino la conexión según el entorno:
let strConn = '';
if (SECURE) {
   // conexión segura (para BD remota):
   strConn = `postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_NAME}?sslmode=require&rejectUnauthorized=false`;

} else {
   // conexión no segura (para BD local):
   strConn = `postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_NAME}`;
}
const database = new Sequelize(
   strConn,
   { logging: false, native: false }
);
CuentaModel(database);
ErrorSalidaModel(database);

const {
   Cuenta,
   ErrorSalida,
} = database.models;

module.exports = {
   Cuenta,
   ErrorSalida,
   conn: database,
};
