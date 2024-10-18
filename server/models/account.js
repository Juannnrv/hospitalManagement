const DatabaseDriver = require("../helpers/db");
const PatientModel = require("../models/patient");
const HospitalModel = require("../models/hospital");

class AccountModel {
  static db = () => DatabaseDriver.getInstance().connection;

  static async getAllAccounts() {
    try {
      const query = `SELECT 
                a.id, 
                p.name as patient_name,
                p.gender as patient_gender,
                h.name as hospital_name,
                h.name as hospital_name,
                a.date,
                a.price,
                a.description
            FROM 
                account a
            INNER JOIN 
                hospital h ON a.hospital_id = h.id
            INNER JOIN 
                patient p ON a.patient_id = p.id
            ORDER BY 
                a.id ASC;
            `;

      const [rows, fields] = await this.db().query(query);

      if (rows.length === 0) {
        return {
          status: 404,
          message: "No accounts found",
        };
      }

      return {
        status: 200,
        message: "Accounts fetched successfully",
        data: rows,
      };
    } catch (err) {
      console.error("Error while fetching accounts", err);
      throw {
        status: 500,
        message: "Error while fetching accounts",
        error: err.message,
      };
    }
  }

  static async getAccountById(id) {
    try {
      const query = `SELECT 
                a.id, 
                p.name as patient_name,
                h.name as hospital_name,
                a.date,
                a.price,
                a.date,
                a.description
            FROM 
                account a
            INNER JOIN 
                hospital h ON a.hospital_id = h.id
            INNER JOIN 
                patient p ON a.patient_id = p.id
            WHERE 
                a.id = ?;
            `;

      const [rows, fields] = await this.db().query(query, [id]);

      if (rows.length === 0) {
        return {
          status: 404,
          message: "Account not found",
        };
      }

      return {
        status: 200,
        message: "Account fetched successfully",
        data: rows[0],
      };
    } catch (err) {
      console.error("Error while fetching account", err);
      throw {
        status: 500,
        message: "Error while fetching account",
        error: err.message,
      };
    }
  }

  static async createAccount(account) {
    try {
      const query = `INSERT INTO account 
                (hospital_id, patient_id, price, date, description) 
            VALUES 
                (?, ?, ?, ?, ?);
            `;

      const [result] = await this.db().query(query, [
        account.hospital_id,
        account.patient_id,
        account.price,
        account.date,
        account.description,
      ]);

      const hospital = await HospitalModel.getHospitalById(account.hospital_id);
      const patient = await PatientModel.getPatientById(account.patient_id);

      return {
        status: 201,
        message: "Account created successfully",
        data: {
          id: result.insertId,
          ...account,
          hospital_name: hospital.data[0].name,
          patient_name: patient.data[0].name,
        },
      };
    } catch (err) {
      console.error("Error while creating account", err);
      throw {
        status: 500,
        message: "Error while creating account",
        error: err.message,
      };
    }
  }

  static async updateAccount(id, account) {
    try {
      const query = `UPDATE account SET ? WHERE id = ?;`;

      const [result] = await this.db().query(query, [account, id]);

      const hospital = await HospitalModel.getHospitalById(account.hospital_id);
      const patient = await PatientModel.getPatientById(account.patient_id);

      return {
        status: 200,
        message: "Account updated successfully",
        data: {
          id: id,
          ...account,
          hospital_name: hospital.data[0].name,
          patient_name: patient.data[0].name,
        },
      };
    } catch (err) {
      console.error("Error while updating account", err);
      throw {
        status: 500,
        message: "Error while updating account",
        error: err.message,
      };
    }
  }

  static async deleteAccount(id) {
    try {
      const { data: accountToDelete } = await this.getAccountById(id);

      if (!accountToDelete) {
        return {
          status: 404,
          message: "Account not found",
        };
      }

      const query = `DELETE FROM account WHERE id = ?;`;

      await this.db().query(query, [id]);

      return {
        status: 200,
        message: "Account deleted successfully",
        data: {
          id: id,
          ...editedaccount,
        },
      };
    } catch (err) {
      console.error("Error while deleting account", err);
      throw {
        status: 500,
        message: "Error while deleting account",
        error: err.message,
      };
    }
  }
}

module.exports = AccountModel;
