const express = require('express');

const productsController = require('../controllers/productsController.js');

let router = express.Router();

router.get('/detalledeproducto', productsController.detalle);


module.exports = router;
