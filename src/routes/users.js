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
    body('email')
        .notEmpty().withMessage('Debes completar el Email')
        .isEmail().withMessage('No es un Email válido')
        // .custom((value, { req }) => {
          
        //     let usuarioBuscado = db.Usuario.findOne({
        //         where: {
        //         email: req.body.email
        //             }
        //         })
        //     .then((usuarioBuscado) => {
        //         return usuarioBuscado
        //      })
        //      if(usuarioBuscado == null){
        //         throw new Error ('El email no se encuentra registrado.')
        //      }
        //      return true
             
    ,

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
router.post('/login', userController.processLogin);
router.get('/register', userController.register);
// router.get('/register', guestMiddleware, userController.register);

router.post('/register',userValidator, uploadFile.single("imagenreg"), userController.processRegister);
router.get('/perfil/:idUsuario', userController.perfil);
// router.get('/perfil/:idUsuario', authMiddleware, userController.perfil);

router.put('/perfil/:idUsuario',userController.processPerfil);

router.delete('/perfil/:idUsuario/', userController.eliminar);

module.exports = router;
