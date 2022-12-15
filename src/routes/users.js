const express = require('express');

const userController = require('../controllers/userController.js');

let router = express.Router();

router.get('/login', userController.login);
router.get('/register', userController.register);
router.get('/perfil', userController.perfil);


module.exports = router;
