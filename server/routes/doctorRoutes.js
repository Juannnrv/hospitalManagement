const express = require('express');
const { getAllDoctors, getDoctorById, createDoctor, updateDoctor, deleteDoctor } = require('../controllers/doctorController');
const validateDoctor = require('../validators/doctorValidator');
const { limit } = require('../middleware/requestLimit');
const doctor = express.Router();

doctor.get('/', limit('get'), getAllDoctors);
doctor.get('/:id', limit('get'), getDoctorById);
doctor.post('/', limit('post'), validateDoctor, createDoctor);
doctor.put('/:id', limit('put'), updateDoctor);
doctor.delete('/:id', limit('delete'), deleteDoctor);

module.exports = doctor;