var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
const Tarea = require('../models/lista.models');

function obtenerDiaActual() {
    const dia = { weekday: 'long' };
    return new Date().toLocaleDateString('es-ES', dia);
  }

async function obtenerSaludo(req, res) {
    const diaActual = obtenerDiaActual();
    const saludos = [
      `Hoy es ${diaActual}, ¡qué gran noticia!`,
      `Es ${diaActual}, ¡hay que empezar con todo!`,
      `Es un nuevo ${diaActual}, ¡aprovechémoslo al máximo!`
    ];

      let saludoAleatorio = saludos[Math.floor(Math.random() * saludos.length)];

      res.json(saludoAleatorio);
};

async function listaTareas(req, res) {
    try {
      const tareas = await Tarea.find();
      res.json({ tareas: tareas.length > 0 ? tareas : "No hay tareas disponibles" });
    } catch (error) {
      res.status(500).json({ message: "Error al obtener las tareas" });
    }
  };

async function crearTarea(req, res) {
    try {
      const { nombre, Estado } = req.body;
  
      const nuevaTarea = new Tarea({
        nombre: nombre,
        Estado: Estado || false
      });

      await nuevaTarea.save();
  
      res.status(200).json({ tarea: nuevaTarea });
    } catch (error) {
      console.error("Error al crear la tarea: ", error);
      res.status(500).json({ message: "Error al crear la tarea"});
    }
};

async function eliminarTarea(req, res) {
    try {
      const { idTarea } = req.body;

      const tareaEliminada = await Tarea.findByIdAndDelete(idTarea);
  
      if (!tareaEliminada) {
        return res.status(404).json({ message: "Tarea no encontrada" });
      }

      res.status(200).json({ message: "Tarea eliminada exitosamente", tarea: tareaEliminada });
    } catch (error) {
      res.status(500).json({ message: "Error al eliminar la tarea" });
    }
  };

async function concluirTarea(req, res) {
    try {
      const { idTarea } = req.body;
  
      const tareaActualizada = await Tarea.findByIdAndUpdate(
        idTarea, 
        { Estado: true },
        { new: true } 
      );
  
      if (!tareaActualizada) {
        return res.status(404).json({ message: "Tarea no encontrada" });
      }
  
      res.status(200).json({ message: "Tarea marcada como concluida", tarea: tareaActualizada });
    } catch (error) {
      res.status(500).json({ message: "Error al concluir la tarea" });
    }
};

module.exports = {
    obtenerSaludo,
    listaTareas,
    crearTarea,
    eliminarTarea,
    concluirTarea
}