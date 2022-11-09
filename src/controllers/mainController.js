const path = require('path');

const mainController = {
    index: (req, res) => {
        res.render('home')
    },
    carrito: (req, res) => {
        res.render('carrito')
    }

};

module.exports = mainController