const db = require("../../../database/models")

module.exports = {
    productList: (req, res) => {
        db.Producto. findAll({
            include: [{ association: "CategoriaProd"}]
        })
        .then(productos => {
            let listado = productos.map((producto) => {
                return {
                    id: producto.idProducto,
                    name: producto.nombre,
                    description: producto.descripcion,
                    categoria: producto.CategoriaProd.nombre,  
                    detail: "/productos/detalle/" + producto.id
                };
            });
    
            let iPhone = productos.filter((producto) => {
                return producto.categoriaprod_id == 1
            });
            let mac = productos.filter((producto) => {
                return producto.categoriaprod_id == 2
            });
            let airpods = productos.filter((producto) => {
                return producto.categoriaprod_id == 3
            });
            let iPad = productos.filter((producto) => {
                return producto.categoriaprod_id == 4
            });
            let watch = productos.filter((producto) => {
                return producto.categoriaprod_id == 5
            });
            let accesorios = productos.filter((producto) => {
                return producto.categoriaprod_id == 6
            });
console.log(iPhone)
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
            db.Producto.findByPk(req.params.idProducto, {include: [{ association: "CategoriaProd"}, { association: "Color"}, { association: "Modelo"},{ association: "Capacidad"}]})
            .then((producto) => {
                if (producto) {
                  res.status(200).json({
                    producto: {
                        id: producto.idProducto,
                        imagen: producto.imagen,
                        name: producto.nombre,
                        precio: producto.precio,
                        description: producto.descripcion,
                        caracteristicas: producto.caracteristicas,
                        modelo: producto.Modelo.nombre,
                        capacidad: producto.Capacidad.nombre,
                        color: producto.Color.nombre,
                        categoria: producto.CategoriaProd.nombre   
                    },
                    status: 200,
                  });
                } else {
                  res.status(404).json({
                    status: 404,
                    message: "Error!!! No se encontró el producto buscado",
                  });
                }
              })
        }
}


