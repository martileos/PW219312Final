const path = require("path");
const express = require('express');
const mysql = require("mysql");
const myConnection = require("express-myconnection");
const app = express();
//Importar rutas
const indiceRutas = require("./rutas/index")

//Config
app.set("port", process.env.PORT || 3000);
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "vistas"));
app.use(express.static(__dirname + '/vistas/assets'));

//Middleware
app.use(myConnection(mysql,{
    host:  "localhost",
    user:   "root",
    password:   "",
    port:   3306,
    database:   "Restaurante"
}, "single"));
app.use(express.urlencoded({extended: false}));

//Usar rutas
app.use("/", indiceRutas);


app.listen(app.get("port"),() =>{
    console.log("Escuchando el puerto 3000.");
});