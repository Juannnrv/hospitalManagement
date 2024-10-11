const PopulationModel = require("../models/population");

class PopulationController {
    static async getNoAppointments(req, res) {
        try {
            const result = await PopulationModel.getNoAppointments();
            res.status(result.status).json(result);
        } catch (err) {
            res.status(err.status).json({ message: err.message, error: err.error });
        }
    }

    static async getAllAppointments(req, res) {
        try {
            const result = await PopulationModel.getAllAppointments();
            res.status(result.status).json(result);
        } catch (err) {
            res.status(err.status).json({ message: err.message, error: err.error });
        }
    }

    static async createAppointment(req, res) {
        try {
            const result = await PopulationModel.createAppointment(req.body);
            res.status(result.status).json(result);
        } catch (err) {
            res.status(err.status).json({ message: err.message, error: err.error });
        }
    }

    static async updateAppointment(req, res) {
        try {
            const result = await PopulationModel.updateAppointment(req.params.id, req.body);
            res.status(result.status).json(result);
        } catch (err) {
            res.status(err.status).json({ message: err.message, error: err.error });
        }
    }

    static async deleteAppointment(req, res) {
        try {
            const result = await PopulationModel.deleteAppointment(req.params.id);
            res.status(result.status).json(result);
        } catch (err) {
            res.status(err.status).json({ message: err.message, error: err.error });
        }
    }
}

module.exports = PopulationController;