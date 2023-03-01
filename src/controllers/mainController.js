const fs = require('fs');
const path = require('path');
const { Sequelize } = require('../../database/models');
const db = require("../../database/models");
const Op = db.Sequelize.Op;


const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");


const mainController = {
    index: (req, res) => {
        let userToLogin = req.session.usuarioLogueado;
        res.render('home', {userToLogin})
    },
    buscar: (req, res) => {
        let userToLogin = req.session.usuarioLogueado;

        let consulta = req.query.consulta

        db.Producto.findAll({
            where: {
                nombre : {
                    [Op.like]: '%' + consulta + '%'
                }
            }
        })
        .then(function(filtroNombre){
            let catIphone = filtroNombre.filter( prodIphone => prodIphone.categoriaprod_id == 1)
            let catMac = filtroNombre.filter( prodMac => prodMac.categoriaprod_id == 2)
            let catAirpods = filtroNombre.filter( prodAirpods => prodAirpods.categoriaprod_id == 3)
            let catIpad = filtroNombre.filter( prodIpad => prodIpad.categoriaprod_id == 4)
            let catWatch = filtroNombre.filter( prodWatch => prodWatch.categoriaprod_id == 5)
            let catAccesorios = filtroNombre.filter( prodAccesorios => prodAccesorios.categoriaprod_id == 6)
            res.render('productos', {userToLogin, catIphone, catMac, catAirpods, catIpad, catWatch, catAccesorios, toThousand})
            })
    
    }

};

module.exports = mainController