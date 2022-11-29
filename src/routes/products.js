const express = require('express');

const productsController = require('../controllers/productsController.js');

let router = express.Router();

// *** Categorías de Productos ***
router.get('/', productsController.productos);

// *** Creación de Productos ***
router.get('/creacion', productsController.creacion);
router.post('/', productsController.crear);

// *** Detalle de Productos ***
router.get('/:idProducto', productsController.detalle);

// *** Eliminación de Productos ***
router.delete('/:idProducto/', productsController.eliminar);

// *** Edición de Productos ***
router.get('/:idProducto/editar', productsController.edicion);
router.put('/:idProducto/editar', productsController.editar);

// *** Carrito de Productos ***
router.get('/carrito', productsController.carrito);





module.exports = router;
