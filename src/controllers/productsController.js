const fs = require('fs');
const path = require('path');
const db = require("../../database/models")
const { DataTypes, INTEGER } = require("sequelize");

const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

const productsController = {
    detalle: (req, res) => {

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

                res.render('detalle', {productos, modelo, capacidad, color, toThousand});
   })},
    creacion: (req, res) => {
        res.render('creacion')
    },
    crear: (req, res) => {
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

    });
        res.redirect('/productos')
    },
    edicion: (req, res) => {
        let id = req.params.idProducto
        let productoAEditar = db.Producto.findByPk(id)
        .then(function(productoAEditar){
            res.render('edicion', {productoAEditar, toThousand})
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
        res.render('carrito')
    },
    productos: (req, res) => {
        
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
                res.render('productos',{catIphone: prodIphone, catMac: prodMac, catAirpods: prodAirpods, catIpad: prodIpad, catWatch: prodWatch, catAccesorios: prodAccesorios, toThousand})
            })
    },
    iphone: (req, res) => {
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
                res.render('productos',{catIphone: prodIphone, catMac: prodMac, catAirpods: prodAirpods, catIpad: prodIpad, catWatch: prodWatch, catAccesorios: prodAccesorios, toThousand})
            })
    },
    mac: (req, res) => {
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
                res.render('productos',{catIphone: prodIphone, catMac: prodMac, catAirpods: prodAirpods, catIpad: prodIpad, catWatch: prodWatch, catAccesorios: prodAccesorios, toThousand})
            })
    },
    airpods: (req, res) => {
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
                res.render('productos',{catIphone: prodIphone, catMac: prodMac, catAirpods: prodAirpods, catIpad: prodIpad, catWatch: prodWatch, catAccesorios: prodAccesorios, toThousand})
            })
    },
    ipad: (req, res) => {
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
                res.render('productos',{catIphone: prodIphone, catMac: prodMac, catAirpods: prodAirpods, catIpad: prodIpad, catWatch: prodWatch, catAccesorios: prodAccesorios, toThousand})
            })
    },
    watch: (req, res) => {
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
                res.render('productos',{catIphone: prodIphone, catMac: prodMac, catAirpods: prodAirpods, catIpad: prodIpad, catWatch: prodWatch, catAccesorios: prodAccesorios, toThousand})
            })
    },
    accesorios: (req, res) => {
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
                res.render('productos',{catIphone: prodIphone, catMac: prodMac, catAirpods: prodAirpods, catIpad: prodIpad, catWatch: prodWatch, catAccesorios: prodAccesorios, toThousand})
            })
    },
};

module.exports = productsController
