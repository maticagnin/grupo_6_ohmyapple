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
            categoria:'user'
        }
        usuarios.push(nuevoUsuario);
        fs.writeFileSync(usuariosFilePath, JSON.stringify(usuarios, null, ' '));
        res.redirect('/user/perfil')
    },
    perfil: (req, res) => {
        res.render('perfil')
    },
    processPerfil: (req,res) => {
        let nuevoUsuario = {
            id: usuarios[usuarios.length - 1 ].id + 1,
            ...req.body,
            categoria:'user'
        }
        usuarios.push(nuevoUsuario);
        fs.writeFileSync(usuariosFilePath, JSON.stringify(usuarios, null, ' '));
        res.redirect('/user/perfil')
    }
};

module.exports = userController