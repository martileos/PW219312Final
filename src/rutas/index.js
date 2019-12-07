const express = require('express');
const bodyParser = require('body-parser');
const rutas = express.Router();

const MesaController = require('../controllers/MesaController.js');

rutas.post('/crear_mesa/', bodyParser.json(), MesaController.resgistrar_mesa);//Eliminar Mesa
rutas.delete('/delete/:id',MesaController.delete);//Eliminar Mesa
rutas.put('/update/:id',MesaController.edit);//Actualizar numero de personas en mesa
module.exports = rutas;