var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');

const tareaEsquema = new mongoose.Schema({
    nombre: {
      type: String,
      required: true
    },
    estado: {
      type: Boolean,
      default: false
    }
  });
  
const Tarea = mongoose.model('Tarea', tareaEsquema);

module.exports = Tarea;