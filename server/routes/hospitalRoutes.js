const express = require('express');
const { getAllHospitals, getHospitalById, createHospital, updateHospital, deleteHospital } = require('../controllers/hospitalController');
const validateHospital = require('../validators/hospitalValidator');
const { limit } = require('../middleware/requestLimit');
const hospital = express.Router();

hospital.get('/', limit('get'), getAllHospitals);
hospital.get('/:id', limit('get'), getHospitalById);
hospital.post('/', limit('post'), validateHospital, createHospital);
hospital.put('/:id', limit('put'), updateHospital);
hospital.delete('/:id', limit('delete'), deleteHospital);

module.exports = hospital;

