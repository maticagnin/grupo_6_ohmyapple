const { DataTypes, INTEGER } = require("sequelize");

module.exports = (sequelize, dataTypes) => {

    let alias = "Usuario";
    let cols = {
        id: {
            type: dataTypes.INTEGER.UNSIGNED,
            primaryKey: true,
            autoIncrement: true
        },
        email: {
            type: dataTypes.STRING(40),
            allowNull: false
        },
        contrasenia: {
            type: dataTypes.STRING(100),
            allowNull: false
        },
        imagen: {
            type: dataTypes.TEXT
        },
        nombre_apellido: {
            type: dataTypes.STRING(40)
        },
        dni: {
            type: dataTypes.INTEGER(8)
        },
        nacimiento: {
            type: dataTypes.DATE
        },
        provincia: {
            type: dataTypes.STRING(20)
        },
        localidad: {
            type: dataTypes.STRING(30)
        },
        domicilio: {
            type: dataTypes.STRING(50)
        },
        cp: {
            type: dataTypes.INTEGER(10)
        },
        telefono: {
            type: dataTypes.INTEGER(10)
        },
        categoriauser_id: {
            type: dataTypes.INTEGER(10).UNSIGNED,
        }
    }
    let config = {
        tableName: "usuarios",
        timestamps: false 
    }

    const Usuario = sequelize.define(alias, cols, config);
    Usuario.associate = function(modelos) {
        Usuario.belongsTo(modelos.CategoriaUsuario, {
            as: "CategoriaUsuario",
            foreignKey: "categoriauser_id"
        })
    };
    return Usuario
}

