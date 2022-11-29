const express = require('express');

const productsController = require('../controllers/productsController.js');

let router = express.Router();

// *** Categorías de Productos ***
router.get('/', productsController.productos);

// *** Creación de Productos ***
router.get('/creacion', productsController.creacion);
router.post('/', productsController.crear);

// *** Edición de Productos ***
router.get('/:idProducto/editar', productsController.edicion);
router.put('/:idProducto/editar', productsController.editar);

// *** Detalle de Productos ***
router.get('/:idProducto', productsController.detalle);

// *** Carrito de Productos ***
router.get('/carrito', productsController.carrito);





module.exports = router;
