const express = require('express');
const { getAllPatients, getPatientById, createPatient, updatePatient, deletePatient } = require('../controllers/patientController');
const validatePatient = require('../validators/patientValidator');
const upload = require('../middleware/medicalHistory');
const { limit } = require('../middleware/requestLimit');
const patient = express.Router();

patient.get('/', limit('get'), getAllPatients);
patient.get('/:id', limit('get'), getPatientById);
patient.post('/', limit('post'), upload.single('medical_history'), validatePatient, createPatient); 
patient.put('/:id', limit('put'), upload.single('medical_history'), validatePatient, updatePatient);
patient.delete('/:id', limit('delete'), deletePatient);

module.exports = patient;