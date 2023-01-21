const { DataTypes, INTEGER } = require("sequelize");

module.exports = (sequelize, dataTypes) => {

    let alias = "Modelo";
    let cols = {
        id: {
            type: dataTypes.INTEGER.UNSIGNED,
            primaryKey: true,
            autoIncrement: true
        },
        nombre: {
            type: dataTypes.STRING(40),
        },
    }
    let config = {
        tableName: "modelo",
        timestamps: false 
    }

    const Modelo = sequelize.define(alias, cols, config);
    Modelo.associate = function(modelos) {
        Modelo.hasMany(modelos.Producto, {
            as: "Producto",
            foreignKey: "modelo_id"
        })
       
    };
    return Modelo
};
