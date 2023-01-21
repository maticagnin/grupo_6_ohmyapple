const { DataTypes, INTEGER } = require("sequelize");

module.exports = (sequelize, dataTypes) => {

    let alias = "Color";
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
        tableName: "color",
        timestamps: false 
    }

    const Color = sequelize.define(alias, cols, config);
    Color.associate = function(modelos) {
        Color.hasMany(modelos.Producto, {
            as: "Producto",
            foreignKey: "color_id"
        })
       
    }
    return Color
};