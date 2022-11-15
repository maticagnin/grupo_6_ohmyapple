const express = require('express');

const productsController = require('../controllers/productsController.js');

let router = express.Router();

router.get('/detalledeproducto', productsController.detalle);
router.get('/creacionDeProducto', productsController.creacion);
router.get('/edicionDeProducto', productsController.edicion);
router.get('/carrito', productsController.carrito);

module.exports = router;
