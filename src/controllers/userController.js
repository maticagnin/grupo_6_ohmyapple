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
        if(req.file){
            let nuevoUsuario = {
                id: usuarios[usuarios.length - 1 ].id + 1,
                ...req.body,
                imagen: req.file.filename, 
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
            res.redirect('/user/perfil/' + nuevoUsuario.id)
        } else {
            let nuevoUsuario = {
                id: usuarios[usuarios.length - 1 ].id + 1,
                ...req.body,
                imagen: 'default.png', 
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
            res.redirect('/user/perfil/' + nuevoUsuario.id)
        }
            
    },
    perfil: (req, res) => {
        let id = req.params.idUsuario
        let usuarioAEditar = usuarios.find( usuario => usuario.id == id)
        res.render('perfil', {usuarioAEditar})
    },
    processPerfil: (req, res) => {
        let id = req.params.idUsuario
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
    }
};

module.exports = userController