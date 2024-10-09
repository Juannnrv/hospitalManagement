const express = require('express');
const { getAllPatients, getPatientById, createPatient, deletePatient } = require('../controllers/patientController');
const validatePatient = require('../validators/patientValidator');
const patient = express.Router();

patient.get('/', getAllPatients);
patient.get('/:id', getPatientById);
patient.post('/', upload.single('medical_history'), validatePatient, createPatient); 
patient.put('/:id', upload.single('medical_history'), validatePatient, updatePatient);
patient.delete('/:id', deletePatient);

module.exports = patient;