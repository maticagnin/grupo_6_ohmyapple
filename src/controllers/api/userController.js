const db = require("../../../database/models")

module.exports = {
    userList: (req, res) => {
        db.Usuario. findAll()
        .then(usuarios => {
            let users = usuarios.map((user) => {
                return {
                    id: user.id,
                    name: user.nombre_apellido,
                    email: user.email,
                    detail: "/user/detalle/" + user.id
                };
            })
           
           res.status(200).json({
            total: usuarios.length,
            users,
            status: 200,
          })
        })
        },
    userDetail: (req, res) => {
        db.Usuario.findByPk(req.params.idUsuario)
        .then((usuario) => {
            if (usuario) {
              res.status(200).json({
                user: {
                  id: usuario.id,
                  email: usuario.email,
                  imagen: usuario.imagen,
                  name: usuario.nombre_apellido,
                  nacimiento: usuario.nacimiento,
                  provincia: usuario.provincia,
                  localidad: usuario.localidad,
                  cp: usuario.cp
                },
                status: 200,
              });
            } else {
              res.status(404).json({
                status: 404,
                message: "Error!!! No se encontró el usuario buscado",
              });
            }
          })
    }
}


