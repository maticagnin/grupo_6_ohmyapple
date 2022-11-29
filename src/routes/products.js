const express = require('express');

const productsController = require('../controllers/productsController.js');

let router = express.Router();

// *** Creación de Productos ***
router.get('/creacion', productsController.creacion);
router.post('/', productsController.crear);

// *** Eliminación de Productos ***
router.delete('/:idProducto/', productsController.eliminar);

// *** Detalle de Productos ***
router.get('/:idProducto', productsController.detalle);

// *** Edición de Productos ***
router.get('/:idProducto/editar', productsController.edicion);
router.put('/:idProducto/editar', productsController.editar);

// *** Categorías de Productos ***
router.get('/', productsController.productos);

// *** Carrito de Productos ***
router.get('/carrito', productsController.carrito);





module.exports = router;
