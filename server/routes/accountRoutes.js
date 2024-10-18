const express = require('express');
const { getAllAccounts, getAccountById, createAccount, updateAccount, deleteAccount } = require('../controllers/accountController');
const validateAccount = require('../validators/accountValidator');
const { limit } = require('../middleware/requestLimit');
const account = express.Router();

account.get('/', limit('get'), getAllAccounts);
account.get('/:id', limit('get'), getAccountById);
account.post('/', limit('post'), validateAccount, createAccount);
account.put('/:id', limit('put'), validateAccount, updateAccount);
account.delete('/:id', limit('delete'), deleteAccount);

module.exports = account;