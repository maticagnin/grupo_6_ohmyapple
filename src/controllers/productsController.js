const fs = require('fs');
const path = require('path');
const db = require("../../database/models")
const { DataTypes, INTEGER } = require("sequelize");

const productsFilePath = path.resolve(__dirname + '/../data/productos.json');
const productos = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

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
        let productoAEditar = productos.find( producto => producto.id == id)
        res.render('edicion', {productoAEditar, toThousand})
    },
    editar: (req, res) => {
        let id = req.params.idProducto;
        let productoAEditar = productos.find( (producto) => producto.id == id);

        productoAEditar = {
            id: productoAEditar.id,
            ...req.body,
            imagen: "/images/productos/Accesorios/Apple Pencil.jpg",
        };

        let nuevoProducto = productos.map( (producto) => {
            if(producto.id == productoAEditar.id) {
                return (producto = {...productoAEditar});
            }
            return producto
        });

        fs.writeFileSync(productsFilePath, JSON.stringify(nuevoProducto, null, ' '));
        res.redirect('/productos')

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
         db.Producto.findAll()
             .then(function(productos){
                 res.render('productos', {productos: productos, toThousand});
    })

        // let catIphone = db.Producto.findAll({
        //     where: {
        //         categoriaprod_id: 1
        //     }
        // })
        // let catMac = db.Producto.findAll({
        //     where:{
        //         categoriaprod_id: 'Mac'
        //     }
        // })
        // let catAirpods = db.Producto.findAll({
        //     where:{
        //         categoriaprod_id: 'AirPods'
        //     }
        // })
        // let catIpad = db.Producto.findAll({
        //     where:{
        //         categoriaprod_id: 'iPad'
        //     }
        // })
        // let catWatch = db.Producto.findAll({
        //     where:{
        //         categoriaprod_id: 'Watch'
        //     }
        // })
        // let catAccesorios = db.Producto.findAll({
        //     where:{
        //         categoriaprod_id: 'Accesorios'
        //     }
        // })
        // .then(function(categorias){
        //     return res.render('productos', {catIphone, catMac, catAirpods, catIpad, catWatch, catAccesorios, toThousand})
        // })
        // console.log(catIphone)
        

    },
    iphone: (req, res) => {
        let catIphone = productos.filter( prodIphone => prodIphone.categoria == 'iPhone')
        let catMac = []
        let catAirpods = []
        let catIpad = []
        let catWatch = []
        let catAccesorios = []

        res.render('productos', {catIphone, catMac, catAirpods, catIpad, catWatch, catAccesorios, toThousand})
    },
    mac: (req, res) => {
        let catIphone = []
        let catMac = productos.filter( prodMac => prodMac.categoria == 'Mac')
        let catAirpods = []
        let catIpad = []
        let catWatch = []
        let catAccesorios = []

        res.render('productos', {catIphone, catMac, catAirpods, catIpad, catWatch, catAccesorios, toThousand})
    },
    airpods: (req, res) => {
        let catIphone = []
        let catMac = []
        let catAirpods = productos.filter( prodAirpods => prodAirpods.categoria == 'AirPods')
        let catIpad = []
        let catWatch = []
        let catAccesorios = []

        res.render('productos', {catIphone, catMac, catAirpods, catIpad, catWatch, catAccesorios, toThousand})
    },
    ipad: (req, res) => {
        let catIphone = []
        let catMac = []
        let catAirpods = []
        let catIpad = productos.filter( prodIpad => prodIpad.categoria == 'iPad')
        let catWatch = []
        let catAccesorios = []

        res.render('productos', {catIphone, catMac, catAirpods, catIpad, catWatch, catAccesorios, toThousand})
    },
    watch: (req, res) => {
        let catIphone = []
        let catMac = []
        let catAirpods = []
        let catIpad = []
        let catWatch = productos.filter( prodWatch => prodWatch.categoria == 'Watch')
        let catAccesorios =[]

        res.render('productos', {catIphone, catMac, catAirpods, catIpad, catWatch, catAccesorios, toThousand})
    },
    accesorios: (req, res) => {
        let catIphone = []
        let catMac = []
        let catAirpods = []
        let catIpad = []
        let catWatch = []
        let catAccesorios = productos.filter( prodAccesorios => prodAccesorios.categoria == 'Accesorios')

        res.render('productos', {catIphone, catMac, catAirpods, catIpad, catWatch, catAccesorios, toThousand})
    }

};

module.exports = productsController
