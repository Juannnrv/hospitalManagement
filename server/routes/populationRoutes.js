const express = require('express');
const { getNoAppointments, getAllAppointments, createAppointment, updateAppointment, deleteAppointment } = require('../controllers/populationController');
const validatePopulation = require('../validators/populationValidator');
const population = express.Router();

population.get('/', getNoAppointments);
population.get('/current', getAllAppointments);
population.post('/', validatePopulation, createAppointment);
population.put('/:id', validatePopulation, updateAppointment);
population.delete('/:id', deleteAppointment);

module.exports = population;