const path = require('path');

const userController = {
    login: (req, res) => {
        res.render('login')
    },
    register: (req, res) => {
        res.render('register')
    },
    perfil: (req, res) => {
        res.render('perfil')
    }

};

module.exports = userController