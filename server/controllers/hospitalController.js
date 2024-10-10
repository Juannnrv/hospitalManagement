const HospitalModel = require('../models/hospital');

class HospitalController {
    static async getAllHospitals(req, res) {
        try {
            const result = await HospitalModel.getAllHospitals();
            res.status(result.status).json(result);
        } catch (err) {
            res.status(err.status).json({ message: err.message, error: err.error });
        }
    }

    static async getHospitalById(req, res) {
        try {
            const result = await HospitalModel.getHospitalById(req.params.id);
            res.status(result.status).json(result);
        } catch (err) {
            res.status(err.status).json({ message: err.message, error: err.error });
        }
    }

    static async createHospital(req, res) {
        try {
            const result = await HospitalModel.createHospital(req.body);
            res.status(result.status).json(result);
        } catch (err) {
            res.status(err.status).json({ message: err.message, error: err.error });
        }
    }

    static async updateHospital(req, res) {
        try {
            const result = await HospitalModel.updateHospital(req.params.id, req.body);
            res.status(result.status).json(result);
        } catch (err) {
            res.status(err.status).json({ message: err.message, error: err.error });
        }
    }

    static async deleteHospital(req, res) {
        try {
            const result = await HospitalModel.deleteHospital(req.params.id);
            res.status(result.status).json(result);
        } catch (err) {
            res.status(err.status).json({ message: err.message, error: err.error });
        }
    }
}

module.exports = HospitalController;