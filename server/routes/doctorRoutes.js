const express = require('express');
const { getAllDoctors, getDoctorById } = require('../controllers/doctorController');
const doctor = express.Router();

doctor.get('/', getAllDoctors);
doctor.get('/:id', getDoctorById);

module.exports = doctor;