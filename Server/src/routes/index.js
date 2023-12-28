const router = require("express").Router();
// Controllers:
const getMain = require("../controllers/getMain");
const getResultProcess = require("../controllers/getResultProcess");
const postFileCuentas = require("../controllers/postFileCuentas");
const postFileMovim = require("../controllers/postFileMovim");
// Rutas:
router.get("/", getMain);
router.get("/results", getResultProcess); //  envía los resultados en formato texto
router.post("/accounts", postFileCuentas); //  recibe un archivo de cuentas
router.post("/movim", postFileMovim); //  recibe un archivo de movimientos
module.exports = router;
