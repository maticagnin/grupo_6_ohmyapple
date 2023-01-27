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
            res.render('productos')
        });
    },
    eliminar: (req, res) => {
        let id = req.params.idProducto;
        let productosFinales = productos.filter((producto) => producto.id != id);

        fs.writeFileSync(productsFilePath, JSON.stringify(productosFinales, null, ' '));

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
        let catMac = 1;
        let catAirpods = [];
        let catIpad = [];
        let catWatch = [];
        let catAccesorios = [];
        let catIphone = db.Producto.findAll({
            where: {
                categoriaprod_id: "1",
            }
        })
        .then(function(prodIphone){
            res.render('productos',{prodIphone: catIphone, catMac, catAirpods, catIpad, catWatch, catAccesorios, toThousand})
        })
        console.log(catMac)

    },
    mac: (req, res) => {
        let catIphone = [];
        let catMac = db.Producto.findAll({
            where: {
                categoriaprod_id: "2",
            }
        });
        let catAirpods = [];
        let catIpad = [];
        let catWatch = [];
        let catAccesorios = [];

        Promise.all([catIphone, catMac, catAirpods, catIpad, catWatch, catAccesorios])
        .then(function([prodIphone, prodMac, prodAirpods, prodIpad, prodWatch, prodAccesorios]){
            res.render('productos',{catIphone: prodIphone, catMac: prodMac, catAirpods: prodAirpods, catIpad: prodIpad, catWatch: prodWatch, catAccesorios: prodAccesorios, toThousand})
        })
    },
    airpods: (req, res) => {
        let catIphone = [];
        let catMac = [];
        let catAirpods = db.Producto.findAll({
            where: {
                categoriaprod_id: "3",
            }
        });
        let catIpad = [];
        let catWatch = [];
        let catAccesorios = [];

        Promise.all([catIphone, catMac, catAirpods, catIpad, catWatch, catAccesorios])
        .then(function([prodIphone, prodMac, prodAirpods, prodIpad, prodWatch, prodAccesorios]){
            res.render('productos',{catIphone: prodIphone, catMac: prodMac, catAirpods: prodAirpods, catIpad: prodIpad, catWatch: prodWatch, catAccesorios: prodAccesorios, toThousand})
        })
    },
    ipad: (req, res) => {
        let catIphone = [];
        let catMac = [];
        let catAirpods = [];
        let catIpad = db.Producto.findAll({
            where: {
                categoriaprod_id: "4",
            }
        });
        let catWatch = [];
        let catAccesorios = [];

        Promise.all([catIphone, catMac, catAirpods, catIpad, catWatch, catAccesorios])
        .then(function([prodIphone, prodMac, prodAirpods, prodIpad, prodWatch, prodAccesorios]){
            res.render('productos',{catIphone: prodIphone, catMac: prodMac, catAirpods: prodAirpods, catIpad: prodIpad, catWatch: prodWatch, catAccesorios: prodAccesorios, toThousand})
        })
    },
    watch: (req, res) => {
        let catIphone = [];
        let catMac = [];
        let catAirpods = [];
        let catIpad = [];
        let catWatch = db.Producto.findAll({
            where: {
                categoriaprod_id: "5",
            }
        });
        let catAccesorios = [];

        Promise.all([catIphone, catMac, catAirpods, catIpad, catWatch, catAccesorios])
        .then(function([prodIphone, prodMac, prodAirpods, prodIpad, prodWatch, prodAccesorios]){
            res.render('productos',{catIphone: prodIphone, catMac: prodMac, catAirpods: prodAirpods, catIpad: prodIpad, catWatch: prodWatch, catAccesorios: prodAccesorios, toThousand})
        })
    },
    accesorios: (req, res) => {
        let catIphone = [];
        let catMac = [];
        let catAirpods = [];
        let catIpad = [];
        let catWatch = [];
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
