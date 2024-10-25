var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');

const tareaEsquema = new mongoose.Schema({
    nombre: String,
    Estado: Boolean
  });
  
const Tarea = mongoose.model('Tarea', tareaEsquema);

module.exports = Tarea;