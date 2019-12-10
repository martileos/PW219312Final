const express = require("express");
const bodyParser = require('body-parser');
const rutas = express.Router();
const customerController  = require("../Controles/customerController");
const platillosController = require("../Controles/platillosController");

//GET
rutas.get("/", customerController.list);

//POST
rutas.post("/agregarCliente", bodyParser.json(), customerController.agregarCliente);
rutas.post("/agregarPlatillo", bodyParser.json(), platillosController.crear);
rutas.post("/actualizarPlatillo", bodyParser.json(), platillosController.update);
rutas.post("/borrarPlatillo", bodyParser.json(), platillosController.deletePlatillo);

// rutas.post("/actualizarMesa", bodyParser.json(), customerController.actualizarMesa);
module.exports = rutas;