const StaffModel = require("../models/staff");

class StaffController {
    static async getNoStaff(req, res) {
        try {
            const result = await StaffModel.getNoStaff();
            res.status(result.status).json(result);
        } catch (err) {
            res.status(err.status).json({ message: err.message, error: err.error });
        }
    }

    static async getStaff(req, res) {
        try {
            const result = await StaffModel.getStaff();
            res.status(result.status).json(result);
        } catch (err) {
            res.status(err.status).json({ message: err.message, error: err.error });
        }
    }

    static async createStaff(req, res) {
        try {
            const result = await StaffModel.createStaff(req.body);
            res.status(result.status).json(result);
        } catch (err) {
            res.status(err.status).json({ message: err.message, error: err.error });
        }
    }

    static async updateStaff(req, res) {
        try {
            const result = await StaffModel.updateStaff(req.params.id, req.body);
            res.status(result.status).json(result);
        } catch (err) {
            res.status(err.status).json({ message: err.message, error: err.error });
        }
    }

    static async deleteStaff(req, res) {
        try {
            const result = await StaffModel.deleteStaff(req.params.id);
            res.status(result.status).json(result);
        } catch (err) {
            res.status(err.status).json({ message: err.message, error: err.error });
        }
    }
}

module.exports = StaffController;