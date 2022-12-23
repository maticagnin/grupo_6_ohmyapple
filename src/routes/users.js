const express = require('express');

const userController = require('../controllers/userController.js');

const loginMiddleware = require('../middlewares/loginMiddleware')

const { body } = require('express-validator')

const userValidator = [
    body('email')
        .notEmpty().withMessage('Debes completar el Email').bail()
        .isEmail().withMessage('No es un Email válido'),
        
    body('password')
        .notEmpty().withMessage('Debes completar la contraseña').bail()
        .isLength({min: 8}).withMessage('La contraseña debe contener al menos 8 caracteres'),
]

let router = express.Router();

router.get('/login', userController.login);
router.post('/login', userValidator, userController.processLogin);
router.get('/register', userController.register);
router.post('/register', userController.processRegister);
router.get('/perfil', userController.perfil);
router.post('/perfil', userController.processPerfil);


module.exports = router;
