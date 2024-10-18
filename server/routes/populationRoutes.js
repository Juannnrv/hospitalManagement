const express = require('express');
const { getNoAppointments, getAllAppointments, createAppointment, updateAppointment, deleteAppointment } = require('../controllers/populationController');
const validatePopulation = require('../validators/populationValidator');
const { limit } = require('../middleware/requestLimit');
const population = express.Router();

population.get('/', limit('get'), getNoAppointments);
population.get('/current', limit('get'), getAllAppointments);
population.post('/', limit('post'), validatePopulation, createAppointment);
population.put('/:id', limit('put'), validatePopulation, updateAppointment);
population.delete('/:id', limit('delete'), deleteAppointment);

module.exports = population;