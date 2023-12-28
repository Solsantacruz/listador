// ! Envío en texto los resultados obtenidos.
const { ErrorSalida } = require('../DB_connection');
const { Op } = require("sequelize");
const showLog = require("../functions/showLog");
const fs = require('fs');
const path = require('path');

const getResultProcess = async (req, res) => {
  showLog('getResultProcess');
  try {
    // Obtengo solamente los registros cuyo saldo quedó en negativo:
    const errores = await ErrorSalida.findAll({
      where: { saldo_final: { [Op.lt]: -0 } },
      order: [['nro_cuenta', 'ASC']]
    });
    const filePath = path.join(__dirname, 'Errores.dat');
    const directoryPath = path.dirname(filePath);
    if (!fs.existsSync(directoryPath)) {
      fs.mkdirSync(directoryPath, { recursive: true });
    }
    let output = "";
    errores.map((error, index) => {
      // Trunco los valores si superan los límites:
      const montoTotalTruncado = Math.min(Math.max(error.monto_total, -999999.99), 999999.99);
      const saldoFinalTruncado = Math.min(Math.max(error.saldo_final, -999999.99), 999999.99);
      // Formateo la salida según los requisitos:
      const formattedOutput = `${error.nro_cuenta.toString().padStart(8, '0')}\t${error.titular.toString().padEnd(25, ' ')}\t${montoTotalTruncado.toFixed(2).padStart(9, ' ')}\t${saldoFinalTruncado.toFixed(2).padStart(10, ' ')}\n`;
      output += formattedOutput;
    });
    fs.writeFileSync(filePath, output, 'utf-8');
    if (fs.existsSync(filePath)) {
      const ret = await res.download(filePath, 'Errores.dat', (err) => {
        if (err) {
          showLog(`getResultProcess Error: ${err}`);
          return res.status(200).json({ "rx": "error", "msg": "Error al enviar el archivo" });
        } else {
          // Elimino el archivo después de ser descargado:
          fs.unlinkSync(filePath);
          showLog(`getResultProcess OK.`);
        }
      });
    } else {
      return res.status(200).json({ "rx": "error", "msg": "El archivo no existe" });
    }
  } catch (error) {
    showLog(`Error: ${error}`);
    return res.status(500).json({ "rx": "Error " + error });
  }
}

module.exports = getResultProcess;