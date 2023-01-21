const { DataTypes, INTEGER } = require("sequelize");

module.exports = (sequelize, dataTypes) => {

    let alias = "CategoriaUsuario";
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
        tableName: "categoriaUsuario",
        timestamps: false 
    }

    const CategoriaUsuario = sequelize.define(alias, cols, config);
    CategoriaUsuario.associate = function(modelos) {
        CategoriaUsuario.hasMany(modelos.Usuario, {
            as: "Usuario",
            foreignKey: "categoriauser_id"
        })
       
    }
    return CategoriaUsuario
};