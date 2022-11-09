const express = require ('express');

const path = require ('path');

const app = express();

app.use(express.static(path.join(__dirname, 'public')));
console.log(__dirname)
app.set('views', path.join('src/views'))

app.set('view engine', 'ejs');

const mainRutas = require("./src/routes/main.js")
const productsRutas = require("./src/routes/products.js")
const userRutas = require("./src/routes/users.js")

app.use("/", mainRutas);
app.use("/productos", productsRutas);
app.use("/user", userRutas);

app.listen(3000, () => console.log ('Servidor corriendo en puerto 3000...'));