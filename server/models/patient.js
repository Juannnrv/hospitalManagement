const DatabaseDriver = require("../helpers/db");

class PatientModel {
    static db = () => DatabaseDriver.getInstance().connection;

    static async getAllPatients() {
        try {
            const [rows, fields] = await this.db().query("SELECT * FROM patient");

            if (rows.length === 0) {
                return {
                    status: 404,
                    message: "No patients found",
                };
            }

            return {
                status: 200,
                message: "Patients fetched successfully",
                data: rows,
            };
        } catch (err) {
            console.error("Error while fetching patients", err);
            throw {
                status: 500,
                message: "Error while fetching patients",
                error: err.message,
            };
        }
    }

    static async getPatientById(id) {
        try {
            const [rows, fields] = await this.db().query(
                "SELECT * FROM patient WHERE id = ?",
                [id]
            );

            if (rows.length === 0) {
                return {
                    status: 404,
                    message: "Patient not found",
                };
            }

            return {
                status: 200,
                message: "Patient fetched successfully",
                data: rows[0],
            };
        } catch (err) {
            console.error("Error while fetching patient", err);
            throw {
                status: 500,
                message: "Error while fetching patient",
                error: err.message,
            };
        }
    }

    static async createPatient(patient) {
        try {
            const fields = Object.keys(patient).join(', ');
            const values = Object.values(patient);
            const placeholders = values.map(() => '?').join(', ');

            const sql = `INSERT INTO patient (${fields}) VALUES (${placeholders})`;

            const [result] = await this.db().query(sql, values);

            return {
                status: 201,
                message: "Patient created successfully",
                data: {
                    id: result.insertId,
                    ...patient,
                },
            };
        } catch (err) {
            console.error("Error while creating patient", err);
            throw {
                status: 500,
                message: "Error while creating patient",
                error: err.message,
            };
        }
    }

    static async updatePatient(id, patientData, file) {
        try {
            const updatedPatient = await this.getPatientById(id);

            if (updatedPatient.status !== 200) {
                return updatedPatient;
            }

            if (file) {
                patientData.medical_history = file.buffer.toString("utf-8");
            }

            const [result] = await this.db().query(
                "UPDATE patient SET ? WHERE id = ?",
                [patientData, id]
            );

            return {
                status: 200,
                message: "Patient updated successfully",
                data: {
                    id: id,
                    ...patientData,
                },
            };
        } catch (err) {
            console.error("Error while updating patient", err);
            throw {
                status: 500,
                message: "Error while updating patient",
                error: err.message,
            };
        }
    }

    static async deletePatient(id) {
        try {
            const deletedPatient = await this.getPatientById(id);

            if (deletedPatient.status !== 200) {
                return deletedPatient;
            }

            const [result] = await this.db().query(
                "DELETE FROM patient WHERE id = ?",
                [id]
            );

            if (result.affectedRows === 0) {
                return {
                    status: 404,
                    message: "Patient not found",
                };
            }

            return {
                status: 200,
                message: "Patient deleted successfully",
                data: deletedPatient.data,
            };
        } catch (err) {
            console.error("Error while deleting patient", err);
            throw {
                status: 500,
                message: "Error while deleting patient",
                error: err.message,
            };
        }
    }
}

module.exports = PatientModel;