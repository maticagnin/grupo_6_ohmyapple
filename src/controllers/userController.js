const path = require('path');

const fs = require('fs');
const bcrypt = require('bcryptjs');
const db = require("../../database/models")

const { validationResult } = require("express-validator");


const userController = {
    login: (req, res) => {
        res.render('login')
    },
    processLogin: (req, res) => {

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
                    console.log(res.cookie.recordame)

                    return res.redirect("/user/perfil/" + userToLogin.id);
                }return res.render("login", {
                    errors: {
                        password: {
                            msg: " La contraseña es incorrecta"
                        }
                    }
                });
                
            }return res.render("login", {
                errors: {
                    email: {
                        msg: " El Email no se encuentra registrado"
                        }
                    },
                    old: req.body
                });
        })

        
    
},
    register: (req, res) => {
        res.render('register')
    },
    processRegister: (req, res) => {
        let resultValidation = validationResult(req)

        if(resultValidation.errors.length > 0){
            return res.render ('register', {errors: resultValidation.mapped(), old: req.body} )
        } else {
            if(req.file){
                db.Usuario.create({
                        email: req.body.email,
                        contrasenia: bcrypt.hashSync(req.body.password, 10),
                        imagen: "/images/usuarios/" + req.file.filename,
                        nombre: null,
                        apellido: null,
                        dni: null,
                        nacimiento: null,
                        provincia: null,
                        localidad: null,
                        domicilio: null,
                        cp: null,
                        telefono: null,
                        categoriauser_id: req.body.categoriauser_id,
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
                    nombre: null,
                    apellido: null,
                    dni: null,
                    nacimiento: null,
                    provincia: null,
                    localidad: null,
                    domicilio: null,
                    cp: null,
                    telefono: null,
                    categoriauser_id: req.body.categoriauser_id,
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
    }
    },
    perfil: (req, res) => {
        let id = req.params.idUsuario
        db.Usuario.findByPk(id)
            .then((usuarioAEditar) => 
                res.render('perfil', {usuarioAEditar})
        )},
    processPerfil: (req, res) => {
        db.Usuario.update({ 
            nombre: req.body.nombre,
            apellido: req.body.apellido,
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

        res.redirect('/')
    },
};

module.exports = userController
