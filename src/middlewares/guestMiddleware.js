function guestMiddleware(req, res, next){
    let userToLogin = req.session.usuarioLogueado
    if(userToLogin == undefined || userToLogin.categoriauser_id == 2) {
        res.send("Esta página es solo para administradores");
    }else{
        next();
    }
}

module.exports = guestMiddleware;