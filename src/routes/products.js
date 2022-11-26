const express = require('express');

const productsController = require('../controllers/productsController.js');

let router = express.Router();

router.get('/', productsController.productos);
router.get('/creacion', productsController.creacion);
router.get('/edicion', productsController.edicion);
router.get('/carrito', productsController.carrito);
router.get('/:idProducto', productsController.detalle);

module.exports = router;
