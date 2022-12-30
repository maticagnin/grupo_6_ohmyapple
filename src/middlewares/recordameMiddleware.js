// function recordameMiddleware(req, res, next){
//     next();

//     if(req.cookies.recordame != undefined && req.session.usuarioBuscado == undefined){
//         let usuarioBuscado = usuarios.find( function(usuario) {
//             if (usuario.email == req.cookies.recordame){
//                 return usuario
//             }
//         })
        

      
//             res.redirect('/user/perfil/' + usuarioBuscado.id)
        
//     }
// }

// module.exports = recordameMiddleware;