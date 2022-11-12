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
    }

};

module.exports = productsController