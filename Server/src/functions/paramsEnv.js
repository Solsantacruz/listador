//! Unico lugar donde obtengo las variables de entorno.
require('dotenv').config();

const DB_USER = process.env.DB_USER || 'postgres';
const DB_PASSWORD = process.env.DB_PASSWORD || 'admin';
const DB_HOST = process.env.DB_HOST || 'localhost';
const DB_PORT = process.env.DB_PORT || 5432;
const DB_NAME = process.env.DB_NAME || 'listador';
const SECURE = process.env.SECURE || false;
const MUST_LOG = process.env.MUST_LOG || 0;
const PORT = process.env.PORT || 3001;

module.exports = {
    DB_USER,
    DB_PASSWORD,
    DB_HOST,
    DB_PORT,
    DB_NAME,
    SECURE,
    PORT,
    MUST_LOG
};