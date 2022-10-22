const express = require ('express');

const path = require ('path');

const app = express();

const publicpath = path.resolve(__dirname, './public')
app.use (express.static(publicpath));

app.listen(3000, () => console.log ('Servidor corriendo en puerto 3000...'));

app.get('/', (req,res)=> {
    res.sendFile(path.resolve(__dirname,'./views/home.html'));

})

app.get('/carrito', (req,res)=> {
    res.sendFile(path.resolve(__dirname,'./views/carrito.html'));

})

app.get('/detalleDeProd', (req,res)=> {
    res.sendFile(path.resolve(__dirname,'./views/detalledeprod.html'));

})

app.get('/login', (req,res)=> {
    res.sendFile(path.resolve(__dirname,'./views/login.html'));

})

app.get('/register', (req,res)=> {
    res.sendFile(path.resolve(__dirname,'./views/register.html'));

})