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
        res.render('productos')
    },
    
};

module.exports = productsController