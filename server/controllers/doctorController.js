const DoctorModel = require('../models/doctor');

class DoctorController {
    static async getAllDoctors(req, res) {
        try {
            const result = await DoctorModel.getAllDoctors();
            res.status(result.status).json(result);
        } catch (err) {
            res.status(err.status).json({ message: err.message, error: err.error });
        }
    }

    static async getDoctorById(req, res) {
        try {
            const result = await DoctorModel.getDoctorById(req.params.id);
            res.status(result.status).json(result);
        } catch (err) {
            res.status(err.status).json({ message: err.message, error: err.error });
        }
    }

    static async createDoctor(req, res) {
        try {
            const result = await DoctorModel.createDoctor(req.body);
            res.status(result.status).json(result);
        } catch (err) {
            res.status(err.status).json({ message: err.message, error: err.error });
        }
    }

    static async updateDoctor(req, res) {
        try {
            const result = await DoctorModel.updateDoctor(req.params.id, req.body);
            res.status(result.status).json(result);
        } catch (err) {
            res.status(err.status).json({ message: err.message, error: err.error });
        }
    }

    static async deleteDoctor(req, res) {
        try {
            const result = await DoctorModel.deleteDoctor(req.params.id);
            res.status(result.status).json(result);
        } catch (err) {
            res.status(err.status).json({ message: err.message, error: err.error });
        }
    }
}

module.exports = DoctorController;