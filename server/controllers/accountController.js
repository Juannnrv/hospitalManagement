const AccountModel = require("../models/account");

class AccountController {
    static async getAllAccounts(req, res) {
        try {
            const response = await AccountModel.getAllAccounts();
            return res.status(response.status).json(response);
        } catch (err) {
            return res.status(err.status).json(err);
        }
    }

    static async getAccountById(req, res) {
        try {
            const id = req.params.id;
            const response = await AccountModel.getAccountById(id);
            return res.status(response.status).json(response);
        } catch (err) {
            return res.status(err.status).json(err);
        }
    }

    static async createAccount(req, res) {
        try {
            const account = req.body;
            const response = await AccountModel.createAccount(account);
            return res.status(response.status).json(response);
        } catch (err) {
            return res.status(err.status).json(err);
        }
    }

    static async updateAccount(req, res) {
        try {
            const id = req.params.id;
            const account = req.body;
            const response = await AccountModel.updateAccount(id, account);
            return res.status(response.status).json(response);
        } catch (err) {
            return res.status(err.status).json(err);
        }
    }

    static async deleteAccount(req, res) {
        try {
            const id = req.params.id;
            const response = await AccountModel.deleteAccount(id);
            return res.status(response.status).json(response);
        } catch (err) {
            return res.status(err.status).json(err);
        }
    }
}

module.exports = AccountController;