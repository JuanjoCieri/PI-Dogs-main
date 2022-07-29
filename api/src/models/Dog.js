const { DataTypes, UUIDV4 } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('dog', {
    id: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true,
      defaultValue: UUIDV4
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      get() {
        const rawValue = this.getDataValue("name")
        return rawValue.charAt(0).toUpperCase() + rawValue.slice(1);
      }
    },
    image: {
      type: DataTypes.STRING,
      validate: {
        isUrl: true
      }
    },
    height: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        min: 0
      }
    },
    weight: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        min: 0
      }
    },
    life_span: {
      type: DataTypes.STRING,
      validate: {
        min: 0
      },
      get() {
        const rawValue = this.getDataValue("life_span")
        return rawValue + " years"
      }
    },
    createdInDb: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true
    }
  });
};
