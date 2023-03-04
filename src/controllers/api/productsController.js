const db = require("../../../database/models")

module.exports = {
    productList: (req, res) => {
        db.Producto. findAll()
        .then(productos => {
            let listado = productos.map((producto) => {
                return {
                    id: producto.idProducto,
                    name: producto.nombre,
                    description: producto.descripcion,
                    modelo: producto.modelo_id,
                    capacidad: producto.capacidad_id,
                    color: producto.color_id,
                    categoria: producto.categoriaprod_id,
                    detail: "/productos/detalle/" + producto.id
                };
            });
            let iPhone = productos.filter((producto) => {
                return producto.categoriaprod_id.nombre == "iPhone"
            });
            let mac = productos.filter((producto) => {
                return producto.categoriaprod_id.nombre == "Mac"
            });
            let airpods = productos.filter((producto) => {
                return producto.categoriaprod_id.nombre == "AirPods"
            });
            let iPad = productos.filter((producto) => {
                return producto.categoriaprod_id.nombre == "iPad"
            });
            let watch = productos.filter((producto) => {
                return producto.categoriaprod_id.nombre == "Watch"
            });
            let accesorios = productos.filter((producto) => {
                return producto.categoriaprod_id.nombre == "Accesorios"
            });

           res.status(200).json({
            count: productos.length,
            countByCategory: [
                {
                    nombre: "iPhone",
                    cantidad: iPhone.length
                },
                {
                    nombre: "Mac",
                    cantidad: mac.length
                },                {
                    nombre: "AirPods",
                    cantidad: airpods.length
                },
                {
                    nombre: "iPad",
                    cantidad: iPad.length
                },
                {
                    nombre: "Watch",
                    cantidad: watch.length
                },
                {
                    nombre: "Accesorios",
                    cantidad: accesorios.length
                },
            ],
            listado,
            status: 200,
          })
        })
        },
    productDetail: (req, res) => {
        
    }
}


