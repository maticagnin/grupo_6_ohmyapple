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
    crear: (req, res) => {
        let nuevoProd = {
            id: productos[productos.length - 1 ].id + 1,
            ...req.body,
            imagen: "/images/productos/Accesorios/Apple Pencil.jpg",
            recomendado1: "/images/accesorios/funda.jpg",
            recomendado2: "/images/accesorios/cargador.jpg",
            recomendado3: "/images/watch/watch.jpg"            
        }
        productos.push(nuevoProd);
        fs.writeFileSync(productsFilePath, JSON.stringify(productos, null, ' '));
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
            recomendado1: "/images/accesorios/funda.jpg",
            recomendado2: "/images/accesorios/cargador.jpg",
            recomendado3: "/images/watch/watch.jpg"  
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
        console.log(productosFinales)

        fs.writeFileSync(productsFilePath, JSON.stringify(productosFinales, null, ' '));

        res.redirect('/productos')
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

        res.render('productos', {catIphone, catMac, catAirpods, catIpad, catWatch, catAccesorios, toThousand})
    },

    
};

module.exports = productsController