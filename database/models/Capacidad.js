const { DataTypes, INTEGER } = require("sequelize");

module.exports = (sequelize, dataTypes) => {

    let alias = "Capacidad";
    let cols = {
        id: {
            type: dataTypes.INTEGER.UNSIGNED,
            primaryKey: true,
            autoIncrement: true
        },
        nombre: {
            type: dataTypes.INTEGER,
        },
    }
    let config = {
        tableName: "capacidad",
        timestamps: false 
    }

    const Capacidad = sequelize.define(alias, cols, config);
    Capacidad.associate = function(modelos) {
        Capacidad.hasMany(modelos.Producto, {
            as: "Producto",
            foreignKey: "capacidad_id"
        })
       
    };
    return Capacidad
};