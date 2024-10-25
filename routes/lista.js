var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');

var listaControllers = require('../controllers/lista.controllers');

router.get('/listado-tareas', listaControllers.listaTareas);

router.post('/crear-tarea', listaControllers.crearTarea);

router.post('/eliminar-tarea', listaControllers.eliminarTarea);

router.post('/concluir-tarea', listaControllers.concluirTarea);
  
module.exports = router;