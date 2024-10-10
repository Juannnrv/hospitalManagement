const express = require('express');
const { getAllDoctors, getDoctorById, createDoctor, updateDoctor, deleteDoctor, createContactDoctor, deleteContactDoctor } = require('../controllers/doctorController');
const validateDoctor = require('../validators/doctorValidator');
const doctor = express.Router();

doctor.get('/', getAllDoctors);
doctor.get('/:id', getDoctorById);
doctor.post('/', validateDoctor, createDoctor);
doctor.post('/contact', createContactDoctor);
doctor.patch('/:id', updateDoctor);
doctor.delete('/:id', deleteDoctor);
doctor.delete('/contact/:id', deleteContactDoctor);

module.exports = doctor;