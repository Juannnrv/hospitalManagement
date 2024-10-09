const PatientModel = require('../models/patient');

class PatientController {
    static async getAllPatients(req, res) {
        try {
            const result = await PatientModel.getAllPatients();
            res.status(result.status).json(result);
        } catch (err) {
            res.status(err.status).json({ message: err.message, error: err.error });
        }
    }

    static async getPatientById(req, res) {
        try {
            const result = await PatientModel.getPatientById(req.params.id);
            res.status(result.status).json(result);
        } catch (err) {
            res.status(err.status).json({ message: err.message, error: err.error });
        }
    }

    static async createPatient(req, res) {
        try {
          if (!req.body) {
            return res.status(400).json({
              message: "Invalid request: no data provided",
            });
          }
      
          const patient = req.body;
      
          if (req.file) {
            patient.medical_history = req.file.buffer.toString('utf-8');
          }
      
          const result = await PatientModel.createPatient(patient);
      
          return res.status(result.status).json(result);
        } catch (err) {
          console.error("Error while creating patient", err);
          return res.status(err.status || 500).json({
            message: err.message || "Error while creating patient",
            error: err.error || err,
          });
        }
      };

      static async updatePatient(req, res) {
        try {
          const patientData = req.body;
          const file = req.file;
      
          const result = await PatientModel.updatePatient(req.params.id, patientData, file);
      
          if (!result.status) {
            return res.status(500).json({
              message: "Error while updating patient",
              error: "Invalid status code returned from model",
            });
          }
      
          return res.status(result.status).json(result);
        } catch (err) {
          console.error("Error while updating patient", err);
          return res.status(500).json({
            message: "Error while updating patient",
            error: err.message,
          });
        }
      }

    static async deletePatient(req, res) {
        try {
            const result = await PatientModel.deletePatient(req.params.id);
            res.status(result.status).json(result);
        } catch (err) {
            res.status(err.status).json({ message: err.message, error: err.error });
        }
    }
}

module.exports = PatientController;