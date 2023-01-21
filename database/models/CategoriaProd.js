const { DataTypes, INTEGER } = require("sequelize");

module.exports = (sequelize, dataTypes) => {

    let alias = "CategoriaProd";
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
        tableName: "categoriaprod",
        timestamps: false 
    }

    const CategoriaProd = sequelize.define(alias, cols, config);
    CategoriaProd.associate = function(modelos) {
        CategoriaProd.hasMany(modelos.Producto, {
            as: "Producto",
            foreignKey: "categoriaprod_id"
        })
       
    };
    return CategoriaProd
};