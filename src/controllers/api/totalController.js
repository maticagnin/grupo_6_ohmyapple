const db = require("../../../database/models");
const sequelize = db.sequelize;


const totalController = {
    'totales': (req, res) => {
        let productos = db.Producto.findAll()
        let usuarios = db.Usuario.findAll()
        let categorias = db.CategoriaProd.findAll()

        Promise.all([productos, usuarios, categorias])
        .then(values => {
          res.json({cantidad_productos: values[0].length, cantidad_usuarios: values[1].length, cantidad_categorias: values[2].length});
        })
    },
    
}
module.exports = totalController;