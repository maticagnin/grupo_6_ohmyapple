
const { body } = require('express-validator')

const loginMiddleware = function (req, res, next){

    body('email')
        .notEmpty().withMessage('Debes completar el Email').bail()
        .isEmail().withMessage('No es un Email válido'),
        
    body('password')
        .notEmpty().withMessage('Debes completar la contraseña').bail()
        .isLength({min: 8}).withMessage('La contraseña debe contener al menos 8 caracteres'),
    
    next()
};

module.exports = loginMiddleware;