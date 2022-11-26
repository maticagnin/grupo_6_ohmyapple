const fs = require('fs');
const path = require('path');

const productsFilePath = path.resolve(__dirname + '/../data/productos.json');
const productos = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

const productsController = {
    detalle: (req, res) => {
        let id = req.params.idProducto
        let producto = productos.find( producto => producto.id == id)
        res.render('detalle', {producto, toThousand})
    },
    creacion: (req, res) => {
        res.render('creacion')
    },
    edicion: (req, res) => {
        res.render('edicion')
    },
    carrito: (req, res) => {
        res.render('carrito')
    },
    productos: (req, res) => {
        let catIphone = productos.filter( prodIphone => prodIphone.categoria == 'iPhone')
        let catMac = productos.filter( prodMac => prodMac.categoria == 'Mac')
        let catAirpods = productos.filter( prodAirpods => prodAirpods.categoria == 'AirPods')
        let catIpad = productos.filter( prodIpad => prodIpad.categoria == 'iPad')
        let catWatch = productos.filter( prodWatch => prodWatch.categoria == 'Watch')
        let catAccesorios = productos.filter( prodAccesorios => prodAccesorios.categoria == 'Accesorios')

        res.render('productos', {catIphone, catMac, catAirpods, catIpad, catWatch, catAccesorios})

    },
    
};

module.exports = productsController