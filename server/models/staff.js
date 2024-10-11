const DatabaseDriver = require("../helpers/db");

class StaffModel {
  static db = () => DatabaseDriver.getInstance().connection;

  static async getNoStaff() {
    try {
      const [rows, fields] = await this.db().query(`SELECT 
            d.id,
            d.name as doctor
        FROM 
            hospital h
        LEFT join
            staff s ON h.id = s.hospital_id
        RIGHT join
            doctor d ON s.doctor_id = d.id
        WHERE 
            s.hospital_id is null;`);

      if (rows.length === 0) {
        return {
          status: 404,
          message: "Staff not found for this hospital",
        };
      }

      return {
        status: 200,
        message: "Staff fetched successfully",
        data: rows,
      };
    } catch (err) {
      console.error("Error while fetching staff", err);
      throw {
        status: 500,
        message: "Error while fetching staff",
        error: err.message,
      };
    }
  }

  static async getStaff() {
    try {
      const [rows, fields] = await this.db().query(`SELECT 
          h.id AS hospital_id,
          d.id AS doctor_id,
          h.name AS hospital,
          d.name AS doctor,
          sp.name AS specialty
      FROM 
          hospital h
      RIGHT JOIN
          staff s ON h.id = s.hospital_id
      LEFT JOIN
          doctor d ON s.doctor_id = d.id
      LEFT JOIN
          specialty sp ON d.specialty_id = sp.id;`);

      if (rows.length === 0) {
        return {
          status: 404,
          message: "Staff not found",
        };
      }

      return {
        status: 200,
        message: "Staff fetched successfully",
        data: rows,
      };
    } catch (err) {
      console.error("Error while fetching staff", err);
      throw {
        status: 500,
        message: "Error while fetching staff",
        error: err.message,
      };
    }
  }

  static async createStaff(staff) {
    try {
      const query = `INSERT INTO staff (hospital_id, doctor_id) VALUES (?, ?);`;
      const [result] = await this.db().query(query, [
        staff.hospital_id,
        staff.doctor_id,
      ]);
  
      return {
        status: 201,
        message: "Staff created successfully",
        data: {
          id: result.insertId, 
          ...staff,
        },
      };
    } catch (err) {
      console.error(err);
      throw { status: 500, message: "Error creating staff", error: err.message };
    }
  }

  static async updateStaff(id, staff) {
    try {
      const query = `UPDATE staff SET ? WHERE hospital_id = ?;`;
      const [rows, fields] = await this.db().query(query, [staff, id]);

      return {
        status: 200,
        message: "Staff updated successfully",
        data: { ...staff },
      };
    } catch (err) {
      console.error(err);
      throw { status: 500, message: "Error updating staff" };
    }
  }

  static async deleteStaff(id) {
    try {
      const query = `DELETE FROM staff WHERE doctor_id = ?;`;
      const [rows, fields] = await this.db().query(query, id);

      if (rows.affectedRows === 0) {
        return {
          status: 404,
          message: "Staff not found",
        };
      }

      return {
        status: 200,
        message: "Staff deleted successfully",
      };
    } catch (err) {
      console.error(err);
      throw { status: 500, message: "Error deleting staff" };
    }
  }
}

module.exports = StaffModel;
