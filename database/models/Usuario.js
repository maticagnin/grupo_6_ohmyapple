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
            type: dataTypes.STRING(20),
            allowNull: false
        },
        imagen: {
            type: dataTypes.TEXT
        },
        nombre: {
            type: dataTypes.STRING(40)
        },
        apellido: {
            type: dataTypes.STRING(40)
        },
        dni: {
            type: dataTypes.STRING(8)
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
            type: dataTypes.STRING(10)
        },
        telefono: {
            type: dataTypes.STRING(10)
        },
        categoriauser_id: {
            type: dataTypes.INTEGER(10).UNSIGNED,
            references: {
                model: CategoriaUsuario,
                key: "id"
            }
        }
    }
    let config = {
        tableName: "usuarios",
        timestamps: false 
    }

    const usuario = sequelize.define(alias, cols, config)


}

