const path = require('path');

const fs = require('fs');

const usuariosFilePath = path.resolve(__dirname + '/../data/usuarios.json');
const usuarios = JSON.parse(fs.readFileSync(usuariosFilePath, 'utf-8'));

const userController = {
    login: (req, res) => {
        res.render('login')
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