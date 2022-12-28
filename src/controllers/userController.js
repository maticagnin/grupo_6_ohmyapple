const path = require('path');

const fs = require('fs');

const usuariosFilePath = path.resolve(__dirname + '/../data/usuarios.json');
const usuarios = JSON.parse(fs.readFileSync(usuariosFilePath, 'utf-8'));

const { validationResult } = require("express-validator");


const userController = {
    login: (req, res) => {
        res.render('login')
    },
    processLogin: (req, res) => {
        let errors = validationResult(req)
        if (errors.isEmpty()){
        let emailBuscado = usuarios.find(function(usuario) {
            if (usuario.email == req.body.email){
                let contraseñaUsuario = usuario.password;
                if (contraseñaUsuario == req.body.password){
                    res.redirect('/user/perfil')
                }else{
                    res.redirect('/')
                }
            }else{
                res.redirect('/')
            }
        })}else{
            res.render("login", {errors: errors.mapped()})
        }
    },
    register: (req, res) => {
        res.render('register')
    },
    processRegister: (req, res) => {
        let nuevoUsuario = {
            id: usuarios[usuarios.length - 1 ].id + 1,
            ...req.body,
            categoria:'user',
            nombres: '',
            apellidos: '',
            dni: '',
            nacimiento: '',
            provincia: '',
            localidad: '',
            domicilio: '',
            cp: '',
            telefono: ''

        }
        usuarios.push(nuevoUsuario);
        fs.writeFileSync(usuariosFilePath, JSON.stringify(usuarios, null, ' '));
        res.redirect('/user/perfil/:idUsuario')
    },
    perfil: (req, res) => {
        let id = req.params.idUsuario
        let usuario = usuarios.find( usuario => usuario.id == id)
        res.render('perfil', {usuario})
    },
    processPerfil: (req, res) => {
        let id = req.params.idUsuario
        let usuario = usuarios.find( usuario => usuario.id == id)
        res.render('perfil', {usuario})

        usuario = {
            id: usuarioAEditar.id,
            ...req.body,
            categoria:'user',
            nombres: req.body.nombres,
            apellidos: req.body.apellidos,
            dni: req.body.dni,
            nacimiento: req.body.nacimiento,
            provincia: req.body.provincia,
            localidad: req.body.localidad,
            domicilio: req.body.domicilio,
            cp: req.body.cp,
            telefono: req.body.telefono
        };

        let nuevoUsuario = usuarios.map( usuario => {
            if(usuario.id == usuario.id) {
                return (usuario = {...usuario});
            }
            return usuario
        });

        fs.writeFileSync(usuariosFilePath, JSON.stringify(nuevoUsuario, null, ' '));
        res.redirect('/perfil/:idUsuario')
    },
};

module.exports = userController