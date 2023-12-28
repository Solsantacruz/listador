// ! Proceso los movimientos recibidos.
const { conn, ErrorSalida, Cuenta } = require('../DB_connection');
const showLog = require("../functions/showLog");
const { Op } = require("sequelize");
const multer = require('multer'); // middleware para manejar la carga de archivos
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const postFileMovim = async (req, res) => {
  showLog('postFileMovim');
  let transaction;
  try {
    // Cargo el archivo de texto:
    upload.single('file')(req, res, async function (err) {
      if (err) {
        showLog('postFileMovim Error: Error al procesar el archivo.');
        return res.status(200).json({ "rx": "error", "msg": "Error al procesar el archivo: " + err });
      }
      const file = req.file;
      if (!file) {
        showLog('postFileMovim Error: Archivo no encontrado.');
        return res.status(200).json({ "rx": "error", "msg": "Archivo no encontrado" });
      }
      const fileContent = file.buffer.toString('utf-8');
      const lines = fileContent.split('\n');
      // Antes de iniciar el proceso, verifico que previamente se hayan obtenido las cuentas:
      const registrosAccounts = await Cuenta.count();
      if (registrosAccounts === 0) {
        showLog('postFileMovim Error: Primero se debe cargar el archivo de cuentas.');
        return res.status(200).json({ "rx": "error", "msg": "Primero se debe cargar el archivo de cuentas" });
      }
      // Elimino todos los movimientos previos en tabla de salida:
      await ErrorSalida.destroy({ where: {} });
      let regCreated;
      let tot = 0;
      let totAdded = 0;
      // Cargo en BDD:
      transaction = await conn.transaction();
      for (let index = 0; index < lines.length; index++) {
        // fields[0]: nro de cuenta, fields[1]: movimiento, fields[2]: monto
        const line = lines[index];
        const fields = line.split('\t');
        if (fields[0]) {
          const account = fields[0].trim();
          const mov = fields[1].trim();
          const amount = parseFloat(fields[2].trim().replace(',', '.'));
          // ¿Existe la cuenta en la tabla de salida?
          const regOutput = await ErrorSalida.findByPk(account);
          if (regOutput) {
            // ¡Existe! Debo actualizar el registro de salida:
            let countExtr = 0;
            let totAmount = 0;
            let balance = 0;
            if (mov === "E") {
              countExtr = regOutput.extracciones + 1;
              totAmount = parseFloat(regOutput.monto_total + amount).toFixed(2);
              balance = parseFloat(regOutput.saldo_final - amount).toFixed(2);
            } else {
              countExtr = regOutput.extracciones;
              totAmount = parseFloat(regOutput.monto_total).toFixed(2);
              balance = parseFloat(regOutput.saldo_final + amount).toFixed(2);
            }
            regOutput.extracciones = countExtr;
            regOutput.monto_total = totAmount;
            regOutput.saldo_final = balance;
            await regOutput.save();
          } else {
            // Es la primera vez que encuentro esta cuenta. ¿Existe en la tabla de cuentas?
            const cuenta = await Cuenta.findByPk(account);
            if (cuenta) {
              // ¡Existe! Debo crear el registro de salida:
              regCreated = await ErrorSalida.create({
                nro_cuenta: cuenta.nro_cuenta,
                titular: cuenta.titular,
                extracciones: mov === "E" ? 1 : 0,
                monto_total: amount,
                saldo_final: cuenta.saldo,
              });
              totAdded++;
            } else {
              // Asumo que se trata de un movimiento cuya cuenta no está involucrada en este listado.
            }
          }
          tot++;
        }
      };
      await transaction.commit();
      // Finalizado el proceso, voy a contar los registros cuyo saldo quedó en negativo y los menores a -10.000:
      const regErrores = await ErrorSalida.findAll({
        where: { saldo_final: { [Op.lt]: -0 } }
      });
      let contRegNeg = 0;
      let contLessThanThen = 0;
      regErrores.map((error, index) => {
        if (error.saldo_final < -10000) {
          contLessThanThen++;
        }
        contRegNeg++;
      });
      showLog(`postFileMovim OK. ${tot} registros procesados. ${totAdded} fueron cargados. <0: ${contRegNeg}, <-10.000: ${contLessThanThen}`);
      return res.status(200).json({ "rx": "ok", "total": tot, "totalNeg": contRegNeg, "menoresDiezMil": contLessThanThen });
    });
  } catch (error) {
    if (transaction) await transaction.rollback();
    showLog(`Error: ${error}`);
    return res.status(500).json({ "rx": "Error " + error });
  }
};

module.exports = postFileMovim;