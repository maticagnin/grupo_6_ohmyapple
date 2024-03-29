const fs = require('fs');
const path = require('path');
const db = require("../../database/models")
const { DataTypes, INTEGER } = require("sequelize");
const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
const { validationResult } = require("express-validator");



const productsController = {
    detalle: (req, res) => {
        let userToLogin = req.session.usuarioLogueado;
        let id = req.params.idProducto
        let detalleProducto = db.Producto.findOne({
            where: {
                id: id
            }
        })
            .then(function(productos){
                    let modelo = db.Modelo.findByPk(detalleProducto.modelo_id)
                    let capacidad = db.Capacidad.findByPk(detalleProducto.capacidad_id)
                    let color = db.Color.findByPk(detalleProducto.color_id)

                res.render('detalle', {userToLogin, productos, modelo, capacidad, color, toThousand});
   })},
    creacion: (req, res) => {
        let userToLogin = req.session.usuarioLogueado;
        res.render('creacion', {userToLogin})
    },
    crear: (req, res) => {
        let resultValidation = validationResult(req)
        let userToLogin = req.session.usuarioLogueado;
        if(resultValidation.errors.length > 0){
            console.log(resultValidation)
            return res.render ('creacion', {errors: resultValidation.mapped(), old: req.body, userToLogin} )
        } else {
        db.Producto.create({
            imagen: "/images/productos/" + req.file.filename,
            nombre: req.body.nombre,
            precio: req.body.precio,
            descripcion: req.body.descripcion,
            caracteristicas: req.body.caracteristicas,
            modelo_id: req.body.modelo,
            capacidad_id: req.body.capacidad,
            color_id: req.body.color,
            categoriaprod_id: req.body.categoria,

        })
        res.redirect('/productos')
        }
    },
    edicion: (req, res) => {
        let id = req.params.idProducto
        let userToLogin = req.session.usuarioLogueado;
        let productoAEditar = db.Producto.findByPk(id)
        .then(function(productoAEditar){
            res.render('edicion', {userToLogin, productoAEditar, toThousand})
        })

    },
    editar: (req, res) => {
        db.Producto.update({
            nombre: req.body.nombre,
            precio: req.body.precio,
            descripcion: req.body.descripcion,
            caracteristicas: req.body.caracteristicas,
            modelo_id: req.body.modelo,
            capacidad_id: req.body.capacidad,
            color_id: req.body.color,
            categoriaprod_id: req.body.categoria,
        },
        {
        where: { id: req.params.idProducto }
        })
        .then(function(productoEditado){
            res.redirect('/productos')
        });
    },
    eliminar: (req, res) => {
        let id = req.params.idProducto;
        
        db.Producto.destroy({
            where: {id: id}
        })

        res.redirect('/productos')
    },
    carrito: (req, res) => {
        let userToLogin = req.session.usuarioLogueado;
        res.render('carrito', {userToLogin})
    },
    productos: (req, res) => {
        let userToLogin = req.session.usuarioLogueado;
        let catIphone = db.Producto.findAll({
            where: {
                categoriaprod_id: "1",
            }
        });
        let catMac = db.Producto.findAll({
            where: {
                categoriaprod_id: "2",
            }
        });
        let catAirpods = db.Producto.findAll({
            where: {
                categoriaprod_id: "3",
            }
        });
        let catIpad = db.Producto.findAll({
            where: {
                categoriaprod_id: "4",
            }
        });
        let catWatch = db.Producto.findAll({
            where: {
                categoriaprod_id: "5",
            }
        });
        let catAccesorios = db.Producto.findAll({
            where: {
                categoriaprod_id: "6",
            }
        });

        Promise.all([catIphone, catMac, catAirpods, catIpad, catWatch, catAccesorios])
            .then(function([prodIphone, prodMac, prodAirpods, prodIpad, prodWatch, prodAccesorios]){
                res.render('productos',{userToLogin, catIphone: prodIphone, catMac: prodMac, catAirpods: prodAirpods, catIpad: prodIpad, catWatch: prodWatch, catAccesorios: prodAccesorios, toThousand})
            })
    },
    iphone: (req, res) => {
        let userToLogin = req.session.usuarioLogueado;
        let catIphone = db.Producto.findAll({
            where: {
                categoriaprod_id: "1",
            }
        });
        let catMac = Promise.resolve([]);
        let catAirpods = Promise.resolve([]);
        let catIpad = Promise.resolve([]);
        let catWatch = Promise.resolve([]);
        let catAccesorios = Promise.resolve([]);

        Promise.all([catIphone, catMac, catAirpods, catIpad, catWatch, catAccesorios])
            .then(function([prodIphone, prodMac, prodAirpods, prodIpad, prodWatch, prodAccesorios]){
                res.render('productos',{userToLogin, catIphone: prodIphone, catMac: prodMac, catAirpods: prodAirpods, catIpad: prodIpad, catWatch: prodWatch, catAccesorios: prodAccesorios, toThousand})
            })
    },
    mac: (req, res) => {
        let userToLogin = req.session.usuarioLogueado;
        let catIphone = Promise.resolve([]);
        let catMac = db.Producto.findAll({
            where: {
                categoriaprod_id: "2",
            }
        });
        let catAirpods = Promise.resolve([]);
        let catIpad = Promise.resolve([]);
        let catWatch = Promise.resolve([]);
        let catAccesorios = Promise.resolve([]);

        Promise.all([catIphone, catMac, catAirpods, catIpad, catWatch, catAccesorios])
            .then(function([prodIphone, prodMac, prodAirpods, prodIpad, prodWatch, prodAccesorios]){
                res.render('productos',{userToLogin, catIphone: prodIphone, catMac: prodMac, catAirpods: prodAirpods, catIpad: prodIpad, catWatch: prodWatch, catAccesorios: prodAccesorios, toThousand})
            })
    },
    airpods: (req, res) => {
        let userToLogin = req.session.usuarioLogueado;
        let catIphone = Promise.resolve([]);
        let catMac = Promise.resolve([]);
        let catAirpods = db.Producto.findAll({
            where: {
                categoriaprod_id: "3",
            }
        });
        let catIpad = Promise.resolve([]);
        let catWatch = Promise.resolve([]);
        let catAccesorios = Promise.resolve([]);

        Promise.all([catIphone, catMac, catAirpods, catIpad, catWatch, catAccesorios])
            .then(function([prodIphone, prodMac, prodAirpods, prodIpad, prodWatch, prodAccesorios]){
                res.render('productos',{userToLogin, catIphone: prodIphone, catMac: prodMac, catAirpods: prodAirpods, catIpad: prodIpad, catWatch: prodWatch, catAccesorios: prodAccesorios, toThousand})
            })
    },
    ipad: (req, res) => {
        let userToLogin = req.session.usuarioLogueado;
        let catIphone = Promise.resolve([]);
        let catMac = Promise.resolve([]);
        let catAirpods = Promise.resolve([]);
        let catIpad = db.Producto.findAll({
            where: {
                categoriaprod_id: "4",
            }
        });        let catWatch = Promise.resolve([]);
        let catAccesorios = Promise.resolve([]);

        Promise.all([catIphone, catMac, catAirpods, catIpad, catWatch, catAccesorios])
            .then(function([prodIphone, prodMac, prodAirpods, prodIpad, prodWatch, prodAccesorios]){
                res.render('productos',{userToLogin, catIphone: prodIphone, catMac: prodMac, catAirpods: prodAirpods, catIpad: prodIpad, catWatch: prodWatch, catAccesorios: prodAccesorios, toThousand})
            })
    },
    watch: (req, res) => {
        let userToLogin = req.session.usuarioLogueado;
        let catIphone = Promise.resolve([]);
        let catMac = Promise.resolve([]);
        let catAirpods = Promise.resolve([]);
        let catIpad = Promise.resolve([]);
        let catWatch = db.Producto.findAll({
            where: {
                categoriaprod_id: "5",
            }
        });
        let catAccesorios = Promise.resolve([]);

        Promise.all([catIphone, catMac, catAirpods, catIpad, catWatch, catAccesorios])
            .then(function([prodIphone, prodMac, prodAirpods, prodIpad, prodWatch, prodAccesorios]){
                res.render('productos',{userToLogin, catIphone: prodIphone, catMac: prodMac, catAirpods: prodAirpods, catIpad: prodIpad, catWatch: prodWatch, catAccesorios: prodAccesorios, toThousand})
            })
    },
    accesorios: (req, res) => {
        let userToLogin = req.session.usuarioLogueado;
        let catIphone = Promise.resolve([]);
        let catMac = Promise.resolve([]);
        let catAirpods = Promise.resolve([]);
        let catIpad = Promise.resolve([]);
        let catWatch = Promise.resolve([]);
        let catAccesorios = db.Producto.findAll({
            where: {
                categoriaprod_id: "6",
            }
        });

        Promise.all([catIphone, catMac, catAirpods, catIpad, catWatch, catAccesorios])
            .then(function([prodIphone, prodMac, prodAirpods, prodIpad, prodWatch, prodAccesorios]){
                res.render('productos',{userToLogin,catIphone: prodIphone, catMac: prodMac, catAirpods: prodAirpods, catIpad: prodIpad, catWatch: prodWatch, catAccesorios: prodAccesorios, toThousand})
            })
    },
};

module.exports = productsController
