const express = require('express');

const path = require('path');

const userController = require('../controllers/userController.js');

const loginMiddleware = require('../middlewares/loginMiddleware')

const { body } = require('express-validator')

const multer = require('multer');

const userValidator = [
    body('email')
        .notEmpty().withMessage('Debes completar el Email').bail()
        .isEmail().withMessage('No es un Email válido'),
        
    body('password')
        .notEmpty().withMessage('Debes completar la contraseña').bail()
        .isLength({min: 8}).withMessage('La contraseña debe contener al menos 8 caracteres'),
]

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './public/images/usuarios');
    },
    filename: (req, file, cb) => {
        const newFileName = "user - " + req.body.usuario + " - " + Date.now() + path.extname(file.originalname);
        cb(null, newFileName);
    }
});

const uploadFile = multer({ storage });

let router = express.Router();

router.get('/login', userController.login);
router.post('/login', userValidator, userController.processLogin);
router.get('/register', userController.register);
router.post('/register',uploadFile.single("imagenreg"), userController.processRegister);
router.get('/perfil/:idUsuario', userController.perfil);
router.post('/perfil/:idUsuario', userController.processPerfil);


module.exports = router;
