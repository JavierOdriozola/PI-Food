const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('recipes', {
    id:{
      type: DataTypes.UUID,
      defaultvalue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    image:{
      type: DataTypes.STRING
    },
    summary:{
      type: DataTypes.STRING,
      allowNull: false,
    },
    score: { 
      type: DataTypes.FLOAT,
    },
    healthScore:{
      type: DataTypes.FLOAT,
    },
    },
    {
      timestamps: false,
      createdAt: false,
      updatedAt: false
  });
};
