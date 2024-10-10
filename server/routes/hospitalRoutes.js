const express = require('express');
const { getAllHospitals, getHospitalById, createHospital, updateHospital, deleteHospital } = require('../controllers/hospitalController');
const validateHospital = require('../validators/hospitalValidator');
const hospital = express.Router();

hospital.get('/', getAllHospitals);
hospital.get('/:id', getHospitalById);
hospital.post('/', validateHospital, createHospital);
hospital.put('/:id', updateHospital);
hospital.delete('/:id', deleteHospital);

module.exports = hospital;

