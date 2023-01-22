const { DataTypes, INTEGER } = require("sequelize");

module.exports = (sequelize, dataTypes) => {

    let alias = "Producto";
    let cols = {
        id: {
            type: dataTypes.INTEGER.UNSIGNED,
            primaryKey: true,
            autoIncrement: true
        },
        imagen: {
            type: dataTypes.TEXT,
        },
        nombre: {
            type: dataTypes.STRING(40),
        },
        precio: {
            type: dataTypes.INTEGER
        },
        descripcion: {
            type: dataTypes.STRING(200)
        },
        caracteristicas: {
            type: dataTypes.TEXT
        },
        modelo_id: {
            type: dataTypes.INTEGER(10).UNSIGNED,
        },
        capacidad_id: {
            type: dataTypes.INTEGER(10).UNSIGNED,
        },
        color_id: {
            type: dataTypes.INTEGER(10).UNSIGNED,
        },
        categoriaprod_id: {
            type: dataTypes.INTEGER(10).UNSIGNED,
        }
    }
    let config = {
        tableName: "productos",
        timestamps: false 
    }

    const Producto = sequelize.define(alias, cols, config);
    Producto.associate = function(modelos) {
        Producto.belongsTo(modelos.Modelo, {
            as: "Modelo",
            foreignKey: "modelo_id"
        }),
        Producto.belongsTo(modelos.Color, {
            as: "Color",
            foreignKey: "color_id"
        }),
        Producto.belongsTo(modelos.Capacidad, {
            as: "Capacidad",
            foreignKey: "capacidad_id"
        }),
        Producto.belongsTo(modelos.CategoriaProd, {
            as: "CategoriaProd",
            foreignKey: "categoriaprod_id"
        })
    
    }
    
    return Producto
};

