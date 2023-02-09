const db = require("../../database/models")

function recordameMiddleware(req, res, next){
    next();

    if(req.cookies.recordame != undefined && req.session.usuarioLogueado == undefined){
        
        db.Usuario.findOne({
            where: {
                email: req.cookie.recordame
            }
        })
        .then((resultado) => {
                let userToLogin = resultado;

                req.session.usuarioLogueado = userToLogin;
        })

        }
        
    }

module.exports = recordameMiddleware;