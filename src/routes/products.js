const express = require('express');

const productsController = require('../controllers/productsController.js');
const apiProductsController = require('../controllers/api/productsController');

const multer = require('multer');
const path = require("path");

const { body } = require('express-validator');
const guestMiddleware = require('../middlewares/guestMiddleware.js');
const authMiddleware = require('../middlewares/authMiddleware.js');

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

const productValidator = [
    body('nombre')
        .notEmpty().withMessage('Debes completar con el nombre.').bail()    
        .isLength({min: 5}).withMessage('El nombre debe contener al menos 5 caracteres'),
    body('descripcion')
        .notEmpty().withMessage('Debes completar con la descripción.').bail()    
        .isLength({min: 20}).withMessage('La descripción debe contener al menos 20 caracteres'),
        body('imagen').custom((value, { req }) => {
            let file = req.file;
            let acceptedExtensions = ['.jpg', '.jpeg', '.png', '.gif'];
    
            if (!file) {
                throw new Error('Tienes que subir una imagen');
            } else {
                let fileExtension = path.extname(file.originalname);
                if (!acceptedExtensions.includes(fileExtension)) {
                    throw new Error(`Las extensiones de archivo permitidas son ${acceptedExtensions.join(', ')}`);
                }
            }
    
            return true;
        })
        
]


let router = express.Router();

// *** Carrito de Productos ***
router.get('/carrito', authMiddleware, productsController.carrito);

// *** Creación de Productos ***
router.get('/creacion', guestMiddleware, productsController.creacion);
router.post('/creacion', uploadFile.single("imagen"), productValidator, productsController.crear);

// *** Categorías de Productos ***
router.get('/', productsController.productos);
router.get('/iphone', productsController.iphone);
router.get('/mac', productsController.mac);
router.get('/airpods', productsController.airpods);
router.get('/ipad', productsController.ipad);
router.get('/watch', productsController.watch);
router.get('/accesorios', productsController.accesorios);

// *** Api de Productos ***
router.get('/lista', apiProductsController.productList)
router.get('/detalle/:idProducto', apiProductsController.productDetail)

// *** Detalle de Productos ***
router.get('/:idProducto', productsController.detalle);

// *** Edición de Productos ***
router.get('/:idProducto/editar', guestMiddleware, productsController.edicion);
router.put('/:idProducto/editar', productsController.editar);

// *** Eliminación de Productos ***
router.delete('/:idProducto/', productsController.eliminar);

// *** Api de Productos ***
router.get('/lista', apiProductsController.productList)
router.get('/detalle/:idProducto', apiProductsController.productDetail)


module.exports = router;
