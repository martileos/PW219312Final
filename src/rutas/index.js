const express = require("express");
const bodyParser = require('body-parser');
const rutas = express.Router();
const customerController  = require("../Controles/customerController");
const platillosController = require("../Controles/platillosController");
const mesaController = require("../controllers/MesaController");

//GET
rutas.get("/", mesaController.list);
rutas.get("/clientes", customerController.list);
rutas.get("/productos", platillosController.list);


//POST
rutas.post("/agregarCliente", bodyParser.json(), customerController.agregarCliente);
rutas.post("/actualizarCliente", bodyParser.json(), customerController.actualizarCliente);
rutas.post("/borrarCliente", bodyParser.json(), customerController.deleteCliente);
rutas.post("/agregarPlatillo", bodyParser.json(), platillosController.crear);
rutas.post("/actualizarPlatillo", bodyParser.json(), platillosController.update);
rutas.post("/borrarPlatillo", bodyParser.json(), platillosController.deletePlatillo);
rutas.post("/asignarPlatillo", bodyParser.json(), platillosController.asignar);
rutas.post("/consultarMesa", bodyParser.json(), mesaController.consultarMesa);
rutas.post("/actualizarMesa", bodyParser.json(), mesaController.actualizarMesa);


// rutas.post("/actualizarMesa", bodyParser.json(), customerController.actualizarMesa);
module.exports = rutas;