const express = require('express');
const { getNoStaff, getStaff, createStaff, updateStaff, deleteStaff } = require('../controllers/staffController');
const staff = express.Router();

staff.get('/', getNoStaff);
staff.get('/current', getStaff);
staff.post('/', createStaff);
staff.put('/:id', updateStaff);
staff.delete('/:id', deleteStaff);

module.exports = staff;