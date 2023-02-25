function loginMiddleware(req, res, next){
    let userToLogin = req.session.usuarioLogueado
    if(userToLogin != undefined) {
        return res.redirect("/user/perfil/" + userToLogin.id);
    }else {
        next();
    }
}

module.exports = loginMiddleware;