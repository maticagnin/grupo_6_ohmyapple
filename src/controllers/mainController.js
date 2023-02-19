const fs = require('fs');
const path = require('path');
const { Sequelize } = require('../../database/models');
const db = require("../../database/models");
const Op = db.Sequelize.Op;


const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");


const mainController = {
    index: (req, res) => {
        res.render('home')
    },
    buscar: (req, res) => {

        // let productosFiltrados = []

        // for (let i = 0; i < db.Producto.length; i++){
        //     if(db.Producto[i].nombre.includes(consulta)){
        //         productosFiltrados.push(db.Producto[i]);   
        //     }
        // }
        let consulta = req.query.consulta

        let productosFiltrados = db.Producto.findAll({
            where: {
                $or: [ 
                    {
                        imagen : {
                            [Op.contains]: '%' + consulta + '%'
                        },
                    },
                    {
                        nombre : {
                            [Op.contains]: '%' + consulta + '%'
                        },
                    },
                    {
                        precio : {
                            [Op.contains]: '%' + consulta + '%'
                        },
                    },
                    {
                        descripcion : {
                            [Op.contains]: '%' + consulta + '%'
                        },
                    },
                    {
                        caracteristicas : {
                            [Op.contains]: '%' + consulta + '%'
                        }
                    },
                ]
            }
        })
        .then(function(filtro){
            return filtro
        })

        let catIphone = filtro.filter( prodIphone => prodIphone.categoriaprod_id == 1)
        let catMac = filtro.filter( prodMac => prodMac.categoriaprod_id == 2)
        let catAirpods = filtro.filter( prodAirpods => prodAirpods.categoriaprod_id == 3)
        let catIpad = filtro.filter( prodIpad => prodIpad.categoriaprod_id == 4)
        let catWatch = filtro.filter( prodWatch => prodWatch.categoriaprod_id == 5)
        let catAccesorios = filtro.filter( prodAccesorios => prodAccesorios.categoriaprod_id == 6)
        res.render('productos', {catIphone, catMac, catAirpods, catIpad, catWatch, catAccesorios, toThousand})
    

        Promise.all([catIphone, catMac, catAirpods, catIpad, catWatch, catAccesorios])
            .then(function([prodIphone, prodMac, prodAirpods, prodIpad, prodWatch, prodAccesorios]){
                res.render('productos',{catIphone: prodIphone, catMac: prodMac, catAirpods: prodAirpods, catIpad: prodIpad, catWatch: prodWatch, catAccesorios: prodAccesorios, toThousand})
            })
    }

};

module.exports = mainController