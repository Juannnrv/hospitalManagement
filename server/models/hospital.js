const DatabaseDriver = require("../helpers/db");

class HospitalModel {
    static db = () => DatabaseDriver.getInstance().connection;

    static async getAllHospitals() {
        try {
            const [rows, fields] = await this.db().query("SELECT * FROM hospital");

            if (rows.length === 0) {
                return {
                    status: 404,
                    message: "Hospital not found",
                };
            }

            return {
                status: 200,
                message: "Hospitals fetched successfully",
                data: rows,
            };
        } catch (err) {
            console.error("Error while fetching hospitals", err);
            throw {
                status: 500,
                message: "Error while fetching hospitals",
                error: err.message,
            };
        }
    }

    static async getHospitalById(id) {
        try {
            const [ rows, fields ] = await this.db().query('select * from hospital where id = ?', [id]);

            if (rows.length === 0) {
                return {
                    status: 404,
                    message: 'Hospital not found'
                };
            }

            return {
                status: 200,
                message: 'Hospital fetched successfully',
                data: rows
            };
        }
        catch (err) {
            console.error('Error while fetching hospital', err);
            throw {
                status: 500,
                message: 'Error while fetching hospital',
                error: err.message
            };
        }
    }

    static async createHospital(hospital) {
        try {
            const [rows, fields] = await this.db().query('insert into hospital set ?', hospital);

            return {
                status: 201,
                message: 'Hospital created successfully',
                data: {
                    id: rows.insertId,
                    ...hospital
                }
            };
        }
        catch (err) {
            console.error('Error while creating hospital', err);
            throw {
                status: 500,
                message: 'Error while creating hospital',
                error: err.message
            };
        }

    }

    static async updateHospital(id, hospital) {
        try {
            const [result] = await this.db().query('update hospital set ? where id = ?', [hospital, id]);

            if (result.affectedRows === 0) {
                return {
                    status: 404,
                    message: 'Hospital not found'
                };
            }

            return {
                status: 200,
                message: 'Hospital updated successfully',
                data: {
                    id,
                    ...hospital
                }
            };
        }
        catch (err) {
            console.error('Error while updating hospital', err);
            throw {
                status: 500,
                message: 'Error while updating hospital',
                error: err.message
            };
        }
    }

    static async deleteHospital(id) {
        try {
            await this.db().query('DELETE FROM account WHERE hospital_id = ?', [id]);
    
            await this.db().query('DELETE FROM notice WHERE hospital_id = ?', [id]);
    
            const deletedHospital = await this.getHospitalById(id);
    
            const result = await this.db().query('DELETE FROM hospital WHERE id = ?', [id]);
    
            if (result.affectedRows === 0) {
                return {
                    status: 404,
                    message: 'Hospital not found'
                };
            }
    
            return {
                status: 200,
                message: 'Hospital deleted successfully',
                data: deletedHospital.data[0]
            };
        } catch (err) {
            console.error('Error while deleting hospital', err);
            throw {
                status: 500,
                message: 'Error while deleting hospital',
                error: err.message
            };
        }
    }
}

module.exports = HospitalModel;