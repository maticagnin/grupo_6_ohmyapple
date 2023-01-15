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
            type: dataTypes.INT(10).UNSIGNED,
            references: {
                model: Modelo,
                key: "id"
            }
        },
        capacidad_id: {
            type: dataTypes.INT(10).UNSIGNED,
            references: {
                model: Capacidad,
                key: "id"
            }
        },
        color_id: {
            type: dataTypes.INT(10).UNSIGNED,
            references: {
                model: Color,
                key: "id"
            }
        },
        categoriaprod_id: {
            type: dataTypes.INT(10).UNSIGNED,
            references: {
                model: CategoriaProd,
                key: "id"
            }
        }
    }
    let config = {
        tableName: "productos",
        timestamps: false 
    }

    const usuario = sequelize.define(alias, cols, config)

};

