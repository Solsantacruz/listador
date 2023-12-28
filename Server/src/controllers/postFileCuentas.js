// ! Recorro el archivo con las cuentas y los cargo en una tabla indexada.
const { Cuenta } = require('../DB_connection');
const showLog = require("../functions/showLog");
const multer = require('multer'); // middleware para manejar la carga de archivos
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const postFileCuentas = async (req, res) => {
  showLog('postFileCuentas');
  try {
    // Cargo el archivo de texto:
    upload.single('file')(req, res, async function (err) {
      if (err) {
        showLog('postFileCuentas Error: Error al procesar el archivo.');
        return res.status(200).json({ "rx": "error", "msg": "Error al procesar el archivo: " + err });
      }
      const file = req.file;
      if (!file) {
        showLog('postFileCuentas Error: Archivo no encontrado.');
        return res.status(200).json({ "rx": "error", "msg": "Archivo no encontrado" });
      }
      const fileContent = file.buffer.toString('utf-8');
      const lines = fileContent.split('\n');
      // Elimino todas las cuentas previas en tabla:
      await Cuenta.destroy({ where: {} });
      let regCreated;
      let tot = 0;
      // Cargo en BDD:
      for (let index = 0; index < lines.length; index++) {
        const line = lines[index];
        const fields = line.split('\t');
        if (fields[0]) {
          const saldo = parseFloat(fields[2].trim().replace(',', '.'));
          regCreated = await Cuenta.create({
            nro_cuenta: fields[0].trim(),
            titular: fields[1].trim(),
            saldo: saldo
          });
          tot++;
        }
      };
      showLog(`postFileCuentas OK. ${tot} registros cargados.`);
      return res.status(200).json({ "rx": "ok", "total": tot });
    });
  } catch (error) {
    showLog(`Error: ${error}`);
    return res.status(500).json({ "rx": "Error " + error });
  }
};

module.exports = postFileCuentas;