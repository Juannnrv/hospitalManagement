const express = require('express');
const { getNoStaff, getStaff, createStaff, updateStaff, deleteStaff } = require('../controllers/staffController');
const validatePopulation = require('../validators/staffValidator');
const { limit } = require('../middleware/requestLimit');
const staff = express.Router();

staff.get('/', limit('get'), getNoStaff);
staff.get('/current', limit('get'), getStaff);
staff.post('/', limit('post'), createStaff, validatePopulation);
staff.put('/:id', limit('put'), updateStaff, validatePopulation);
staff.delete('/:id', limit('delete'), deleteStaff);

module.exports = staff;