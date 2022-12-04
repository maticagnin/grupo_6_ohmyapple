const express = require('express');

const productsController = require('../controllers/productsController.js');
const multer = require('multer');
const path = require("path");

//  const storage = multer.diskStorage({
//      destination: function(req, file, cb){
//          cb(null, './public/images/productos');
//      },
//      filename: function(req, file, cb) {
//          cb(null, `${Date.now()}_img_${path.extname(file.originalname)}`);
//      }
//  })
//  const uploadFile = multer({ storage });

  const storage = multer.diskStorage({
      destination: (req, file, cb) => {
          cb(null, './public/images/productos');
      },
      filename: (req, file, cb) => {
          const newFileName = "prod - " + req.body.categoria + " - " + Date.now() + path.extname(file.originalname);
          cb(null, newFileName);
      }
  });

  const uploadFile = multer({ storage });

let router = express.Router();

// *** Carrito de Productos ***
router.get('/carrito', productsController.carrito);

// *** Creación de Productos ***
router.get('/creacion', productsController.creacion);
router.post('/creacion', uploadFile.single("imagen"), productsController.crear);

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
