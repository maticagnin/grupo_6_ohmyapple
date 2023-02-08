const path = require('path');

const fs = require('fs');
const bcrypt = require('bcryptjs');
const db = require("../../database/models")

const usuariosFilePath = path.resolve(__dirname + '/../data/usuarios.json');
const usuarios = JSON.parse(fs.readFileSync(usuariosFilePath, 'utf-8'));

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
                        let usuarioBuscado = resultado;

                        if (usuarioBuscado == null){
                            res.render ('login', {errors: errors.mapped()})
                        }else{

                            let checkContrasenia = bcrypt.compareSync(req.body.password, usuarioBuscado.contrasenia);
                            
                            
                            if (checkContrasenia){
                                    req.session.usuarioLogueado = usuarioBuscado;
                                    res.redirect('/user/perfil/' + usuarioBuscado.id)
                        }else{
                            res.render ('login', {errors: errors.mapped()})
                        }
                    
                    }})
    
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
                    nombre: null,
                    apellido: null,
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