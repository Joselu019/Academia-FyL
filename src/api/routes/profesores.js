const express = require('express');
const router = express.Router();
const { getTeachers, getTeacherById, createTeacher, updateTeacher, deleteTeacher } = require('../controllers/profesorController');
const { getTeacherSchedulesByDate } = require('../controllers/profesorHorarioController');

// Obtener todos los profesores
router.get('/', getTeachers);

// Obtener un profesor por ID
router.get('/:id', getTeacherById);

// Obtener horarios de un profesor por fecha
router.get('/:id/horarios', getTeacherSchedulesByDate);

// Crear un nuevo profesor
router.post('/', createTeacher);

// Actualizar un profesor existente
router.put('/:id', updateTeacher);

// Eliminar un profesor
router.delete('/:id', deleteTeacher);

module.exports = router;