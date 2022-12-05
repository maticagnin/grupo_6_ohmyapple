const fs = require('fs');
const path = require('path');

const productsFilePath = path.resolve(__dirname + '/../data/productos.json');
const productos = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");


const mainController = {
    index: (req, res) => {
        res.render('home')
    },
    buscar: (req, res) => {
        let consulta = req.query.consulta

        let productosFiltrados = []

        for (let i = 0; i < productos.length; i++){
            if(productos[i].nombre.includes(consulta)){
                productosFiltrados.push(productos[i]);   
            }
        }
        let catIphone = productosFiltrados.filter( prodIphone => prodIphone.categoria == 'iPhone')
        let catMac = productosFiltrados.filter( prodMac => prodMac.categoria == 'Mac')
        let catAirpods = productosFiltrados.filter( prodAirpods => prodAirpods.categoria == 'AirPods')
        let catIpad = productosFiltrados.filter( prodIpad => prodIpad.categoria == 'iPad')
        let catWatch = productosFiltrados.filter( prodWatch => prodWatch.categoria == 'Watch')
        let catAccesorios = productosFiltrados.filter( prodAccesorios => prodAccesorios.categoria == 'Accesorios')
        res.render('productos', {catIphone, catMac, catAirpods, catIpad, catWatch, catAccesorios, toThousand})
    
    }

};

module.exports = mainController