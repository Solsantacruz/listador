const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
   sequelize.define('Cuenta', {
      nro_cuenta: {
         type: DataTypes.STRING,
         primaryKey: true,
         allowNull: false,
      },
      titular: {
         type: DataTypes.STRING,
         allowNull: false,
      },
      saldo: {
         type: DataTypes.DOUBLE,
         allowNull: false,
      },
   }, { timestamps: false });
};
