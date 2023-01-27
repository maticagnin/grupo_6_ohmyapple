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
        let errors = validationResult(req)
        if(errors.isEmpty()){
            let usuarioBuscado = db.Usuario.findOne({
                where: {
                    email: req.body.email
                }
            })

            
            console.log(usuarioBuscado)
            let checkContrasenia = bcrypt.compareSync(req.body.password, usuarioBuscado.contrasenia);

            // if(req.body.recordar != undefined){
            //     res.cookie("recordame", usuarioBuscado.email, { maxAge: 60000 })
            // }
            
            req.session.usuarioLogueado = usuarioBuscado;

            if (checkContrasenia){
                res.redirect('/user/perfil/' + usuarioBuscado.id)
            }
        } else {
            res.render ('login', {errors: errors.mapped()})
        }
    },
    register: (req, res) => {
        res.render('register')
    },
    processRegister: (req, res) => {
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
            
    },
    perfil: (req, res) => {
        let id = req.params.idUsuario
        let usuarioAEditar = db.Usuario.findByPk(id)
            .then((usuarioAEditar) => 
                res.render('perfil', {usuarioAEditar})
        )},
    processPerfil: (req, res) => {
        let id = req.params.idUsuario
        db.Usuario.Update
        let usuarioAEditar = usuarios.find( usuario => usuario.id == id)

        usuarioAEditar = {
            id: usuarioAEditar.id,
            email: usuarioAEditar.email,
            usuario: usuarioAEditar.usuario,
            password: usuarioAEditar.password,
            imagen: usuarioAEditar.imagen,
            categoria: usuarioAEditar.categoria,
            ...req.body,

        };

        let nuevoUsuario = usuarios.map( usuario => {
            if(usuario.id == usuarioAEditar.id) {
                return (usuario = {...usuarioAEditar});
            }
            return usuario
        });

        fs.writeFileSync(usuariosFilePath, JSON.stringify(nuevoUsuario, null, ' '));
        res.redirect('/user/perfil/' + usuarioAEditar.id)
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