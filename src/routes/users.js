const express = require('express');

const userController = require('../controllers/userController.js');

const loginMiddleware = require('../middlewares/loginMiddleware')

let router = express.Router();

router.get('/login', userController.login);
// router.post('/login', loginMiddleware, userController.processLogin);
router.get('/register', userController.register);
router.post('/register', userController.processRegister);
router.get('/perfil', userController.perfil);
router.post('/perfil', userController.processPerfil);


module.exports = router;
