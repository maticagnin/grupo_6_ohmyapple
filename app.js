const express = require ('express');

const path = require ('path');

const app = express();

const methodOverride = require('method-override');

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use(methodOverride('_method'));
app.use(cookieParser());

app.set('views', path.join('src/views'));

app.set('view engine', 'ejs');

const mainRutas = require("./src/routes/main.js")
const productsRutas = require("./src/routes/products.js")
const userRutas = require("./src/routes/users.js")

app.use("/", mainRutas);
app.use("/productos", productsRutas);
app.use("/user", userRutas);


app.listen(3000, () => console.log ('Servidor corriendo en puerto 3000...'));