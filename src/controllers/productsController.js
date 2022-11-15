const path = require('path');

const productsController = {
    detalle: (req, res) => {
        res.render('detalledeproducto')
    },
    creacion: (req, res) => {
        res.render('creacionDeProducto')
    },
    edicion: (req, res) => {
        res.render('edicionDeProducto')
    },
    carrito: (req, res) => {
        res.render('carrito')
    }

};

module.exports = productsController