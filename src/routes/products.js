const express = require('express');

const productsController = require('../controllers/productsController.js');
// const multer = require('multer');

// const storage = multer.diskStorage({
//     destination: function(req, file, cb){
//         cb(null, './public/images/productos');
//     },
//     filename: function(req, file, cb) {
//         cb(null, `${Date.now()}_img_${path.extname(file.originalname)}`);
//     }
// })
// const uploadFile = multer({ storage });


let router = express.Router();

// *** Carrito de Productos ***
router.get('/carrito', productsController.carrito);

// *** Creación de Productos ***
router.get('/creacion', productsController.creacion);
router.post('/creacion', productsController.crear);

// *** Detalle de Productos ***
router.get('/:idProducto', productsController.detalle);

// *** Edición de Productos ***
router.get('/:idProducto/editar', productsController.edicion);
router.put('/:idProducto/editar', productsController.editar);

// *** Eliminación de Productos ***
router.delete('/:idProducto/', productsController.eliminar);

// *** Categorías de Productos ***
router.get('/', productsController.productos);




module.exports = router;
