const path = require('path');

const fs = require('fs');
const bcrypt = require('bcryptjs');
const db = require("../../database/models")

const { validationResult } = require("express-validator");


const userController = {
    login: (req, res) => {
        let userToLogin = req.session.usuarioLogueado;
        res.render('login', {userToLogin})
    },
    processLogin: (req, res) => {
        let userToLogin = req.session.usuarioLogueado;
        db.Usuario.findOne({
            where: {
                email: req.body.email
            }
        })

        .then((resultado) => {
            let userToLogin = resultado
            if(userToLogin != null){
                let okPass = bcrypt.compareSync(req.body.password, userToLogin.contrasenia);
                if(okPass){
                    req.session.usuarioLogueado = userToLogin;

                    if(req.body.recordame != undefined){
                        res.cookie('recordame', userToLogin.email, {maxAge: 60000})
                    }
                    

                    return res.redirect("/user/perfil/" + userToLogin.id);
                }return res.render("login", {userToLogin,
                    errors: {
                        password: {
                            msg: "La contraseña es incorrecta."
                        }
                    },
                    old: req.body
                });
                
            }return res.render("login", {userToLogin,
                errors: {
                    email: {
                        msg: "El Email no se encuentra registrado."
                        }
                    },
                    old: req.body
                });
        })    
    },
    processLogout: (req, res) => {
        req.session.usuarioLogueado = undefined;

        res.redirect('/user/login')
    }, 
    register: (req, res) => {
        let userToLogin = req.session.usuarioLogueado;
        res.render('register', {userToLogin})
    },
    processRegister: (req, res) => {
        let resultValidation = validationResult(req)
        let userToLogin = req.session.usuarioLogueado;
        if(resultValidation.errors.length > 0){
            return res.render ('register', {userToLogin, errors: resultValidation.mapped(), old: req.body} )
        } else {
            let emailARegistrar = req.body.email

            db.Usuario.findOne({
                where: {
                    email: emailARegistrar
                }
            })
            .then((resultado) => {
                if(resultado == undefined){
                    if(req.file){
                        db.Usuario.create({
                                email: req.body.email,
                                contrasenia: bcrypt.hashSync(req.body.password, 10),
                                imagen: "/images/usuarios/" + req.file.filename,
                                nombre_apellido: req.body.nombre_apellido,
                                dni: null,
                                nacimiento: null,
                                provincia: null,
                                localidad: null,
                                domicilio: null,
                                cp: null,
                                telefono: null,
                                categoriauser_id: 2,
                        })          
                        .then(nuevoUsuario => {
                            req.session.usuarioLogueado = req.body.email;
                            db.Usuario.findOne({
                                where: {
                                    email: req.body.email
                                }
                            }).then((nuevoUsuario => {
                                res.redirect('/user/perfil/' + nuevoUsuario.id)
                            }))
                        })
                        
                    } else {
                        db.Usuario.create({
                            email: req.body.email,
                            contrasenia: bcrypt.hashSync(req.body.password, 10),
                            imagen: "/images/usuarios/" + 'default.png',
                            nombre_apellido: req.body.nombre_apellido,
                            dni: null,
                            nacimiento: null,
                            provincia: null,
                            localidad: null,
                            domicilio: null,
                            cp: null,
                            telefono: null,
                            categoriauser_id: 2,
                        })
                    .then(nuevoUsuario => {
                        req.session.usuarioLogueado = req.body.email;
                        db.Usuario.findOne({
                            where: {
                                email: req.body.email
                            }
                        })
                        .then((nuevoUsuario => {
                            res.redirect('/user/perfil/' + nuevoUsuario.id)
                        }))
                    })
                    }
                } else {
                    return res.render("register", {userToLogin,
                        errors: {
                            email: {
                                msg: "El email ya se encuentra registrado."
                            }
                        }
                    });
                }
        
        })
    }

    },
    perfil: (req, res) => {
        let userToLogin = req.session.usuarioLogueado;
        let id = req.params.idUsuario
        db.Usuario.findByPk(id)
            .then((usuarioAEditar) => 
                res.render('perfil', {userToLogin, usuarioAEditar})
        )},
    processPerfil: (req, res) => {
        db.Usuario.update({ 
            nombre_apellido: req.body.nombre_apellido,
            dni: req.body.dni,
            nacimiento: req.body.nacimiento,
            provincia: req.body.provincia,
            localidad: req.body.localidad,
            domicilio: req.body.domicilio,
            cp: req.body.cp,
            telefono: req.body.telefono,
        },
        {
        where: { id: req.params.idUsuario }
        })
        .then(function(usuarioAEditar){
            let id = req.params.idUsuario
            db.Usuario.findByPk(id)
            .then((usuarioEditado) => {
            res.redirect('/user/perfil/' + usuarioEditado.id)
            });
        });
    },
    eliminar: (req, res) => {
        let id = req.params.idUsuario;
        
        db.Usuario.destroy({
            where: {id: id}
        })
        rec.session.usuarioLogueado = undefined;
        res.redirect('/')
    }
};

module.exports = userController
