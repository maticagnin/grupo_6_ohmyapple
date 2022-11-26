const express = require('express');

const productsController = require('../controllers/productsController.js');

let router = express.Router();

router.get('/:idProducto', productsController.detalle);
router.get('/creacion', productsController.creacion);
router.get('/edicion', productsController.edicion);
router.get('/carrito', productsController.carrito);
router.get('/', productsController.productos);



module.exports = router;
