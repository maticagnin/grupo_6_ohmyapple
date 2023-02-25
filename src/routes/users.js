const express = require('express');
const path = require('path');
const userController = require('../controllers/userController.js');
const loginMiddleware = require('../middlewares/loginMiddleware')
const { body } = require('express-validator')
const multer = require('multer');
const guestMiddleware = require("../middlewares/guestMiddleware");
const authMiddleware = require("../middlewares/authMiddleware");
const db = require("../../database/models")


const userValidator = [
    body('nombre_apellido')
        .notEmpty().withMessage('Debes completar el nombre y apellido.').bail()    
        .isLength({min: 2}).withMessage('El nombre y apellido debe contener al menos 2 caracteres'),

    body('email')
        .notEmpty().withMessage('Debes completar el Email').bail()
        .isEmail().withMessage('No es un Email válido'),

    body('password')
        .notEmpty().withMessage('Debes completar la contraseña').bail()
        .isLength({min: 8}).withMessage('La contraseña debe contener al menos 8 caracteres'),

    body('imagenreg').custom((value, { req }) => {
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
// router.get('/register', guestMiddleware, userController.register);

router.post('/register', uploadFile.single("imagenreg"), userValidator, userController.processRegister);
router.get('/perfil/:idUsuario', authMiddleware, userController.perfil);

router.put('/perfil/:idUsuario',userController.processPerfil);

router.delete('/perfil/:idUsuario/', userController.eliminar);

module.exports = router;
