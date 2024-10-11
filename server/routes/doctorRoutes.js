const express = require('express');
const { getAllDoctors, getDoctorById, createDoctor, updateDoctor, deleteDoctor } = require('../controllers/doctorController');
const validateDoctor = require('../validators/doctorValidator');
const doctor = express.Router();

doctor.get('/', getAllDoctors);
doctor.get('/:id', getDoctorById);
doctor.post('/', validateDoctor, createDoctor);
doctor.put('/:id', updateDoctor);
doctor.delete('/:id', deleteDoctor);

module.exports = doctor;