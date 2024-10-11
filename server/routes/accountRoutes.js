const express = require('express');
const { getAllAccounts, getAccountById, createAccount, updateAccount, deleteAccount } = require('../controllers/accountController');
const validateAccount = require('../validators/accountValidator');
const account = express.Router();

account.get('/', getAllAccounts);
account.get('/:id', getAccountById);
account.post('/', validateAccount, createAccount);
account.put('/:id', validateAccount, updateAccount);
account.delete('/:id', deleteAccount);

module.exports = account;