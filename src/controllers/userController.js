const path = require('path');

const fs = require('fs');
const bcrypt = require('bcryptjs');

const usuariosFilePath = path.resolve(__dirname + '/../data/usuarios.json');
const usuarios = JSON.parse(fs.readFileSync(usuariosFilePath, 'utf-8'));

const { validationResult } = require("express-validator");


const userController = {
    login: (req, res) => {
        res.render('login')
    },
    // processLogin: (req, res) => {
    //     let errors = validationResult(req);

    //     if(errors.isEmpty()){
    //         let usersJSON = fs.readFileSync('usuarios.json', 'utf-8');
    //         let users;
    //         if(usersJSON == ""){
    //             users = [];
    //         } else{
    //             users = JSON.parse(usersJSON);
    //         }

    //         for (let i = 0; i < users.length; i++){
    //             if (users[i].email == req.body.email){
    //                 if(bcrypt.compareSync(req.body.password, users[i].password)){
    //                     let usuarioALoguearse = users[i];
    //                     break;
    //                 }
    //             }
    //         }

    //         if(usuarioALoguearse == undefined){
    //             return res.render("login", {errors: [
    //                 {msg: "Credenciales invalidas"}
    //             ]});
    //         }

    //         req.session.usuarioLogueado = usuarioALoguearse;
    //         res.render("success");
    //     } else{
    //         return res.render("login", {errors: error.mapped()})
    //     }
    // },










    processLogin: (req, res) => {
        let errors = validationResult(req)
        if(errors.isEmpty()){
            let usuarioBuscado = usuarios.find( function(usuario) {
                if (usuario.email == req.body.email){
                    return usuario
                }
            })
            let checkContrasenia = bcrypt.compareSync(req.body.password, usuarioBuscado.password);
            console.log(usuarioBuscado)
            console.log(checkContrasenia)

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
            let nuevoUsuario = {
                id: usuarios[usuarios.length - 1 ].id + 1,
                email: req.body.email,
                password: bcrypt.hashSync(req.body.password, 15),
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
            
            req.session.usuarioLogueado = req.body.email;

            usuarios.push(nuevoUsuario);
            fs.writeFileSync(usuariosFilePath, JSON.stringify(usuarios, null, ' '));
            res.redirect('/user/perfil/' + nuevoUsuario.id)
        } else {
            let nuevoUsuario = {
                id: usuarios[usuarios.length - 1 ].id + 1,
                email: req.body.email,
                password: bcrypt.hashSync(req.body.password, 15),
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