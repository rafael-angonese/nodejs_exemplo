const express = require('express');
const app = express();
require('dotenv').config();

var UsuariosController = require("./app/controllers/UsuariosController")
var LoginController = require("./app/controllers/LoginController")


app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "*");
    next();
});

app.use("/usuarios", UsuariosController)
app.use("/login", LoginController)


app.listen(3333, () => console.log('server run'));



