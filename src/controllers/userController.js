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
        let usuarioAEditar = usuarios.find( usuario => usuario.id == id)
        res.render('perfil', {usuarioAEditar})

        let nuevoUsuario = {
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
};

module.exports = userController