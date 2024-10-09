const express = require('express');
const { getAllDoctors, getDoctorById, createDoctor } = require('../controllers/doctorController');
const validateDoctor = require('../validators/doctorValidator');
const doctor = express.Router();

doctor.get('/', getAllDoctors);
doctor.get('/:id', getDoctorById);
doctor.post('/', validateDoctor, createDoctor);

module.exports = doctor;