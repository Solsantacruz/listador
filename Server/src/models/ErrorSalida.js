const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
   sequelize.define('ErrorSalida', {
      nro_cuenta: {
         type: DataTypes.STRING,
         primaryKey: true,
         allowNull: false,
      },
      titular: {
         type: DataTypes.STRING,
         allowNull: false,
      },
      extracciones: {
         type: DataTypes.INTEGER,
         allowNull: false,
      },
      monto_total: {
         type: DataTypes.DOUBLE,
         allowNull: false,
      },
      saldo_final: {
         type: DataTypes.DOUBLE,
         allowNull: false,
      }
   }, { timestamps: false });
};

