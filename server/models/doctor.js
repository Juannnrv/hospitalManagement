const DatabaseDriver = require("../helpers/db");

class DoctorModel {
  static db = () => DatabaseDriver.getInstance().connection;

  static async getAllDoctors() {
    try {
      const query = `SELECT 
        d.id, 
        d.name,
        d.gender,
        d.email,
        d.phone,
        s.name as specialty,
        d.date_of_birth,
        d.status,
        d.license
      FROM 
        doctor d
      INNER JOIN 
        specialty s ON d.specialty_id = s.id
      GROUP BY 
        d.id, d.name, d.date_of_birth, d.status
      ORDER BY 
        d.id ASC;
      `;

      const [rows, fields] = await this.db().query(query);

      if (rows.length === 0) {
        return {
          status: 404,
          message: "No doctors found",
        };
      }

      return {
        status: 200,
        message: "Doctors fetched successfully",
        data: rows,
      };
    } catch (err) {
      console.error("Error while fetching doctors", err);
      throw {
        status: 500,
        message: "Error while fetching doctors",
        error: err.message,
      };
    }
  }

  static async getDoctorById(id) {
    try {
      const query = `SELECT 
        d.id, 
        d.name,
        d.gender,
        d.email,
        d.phone,
        s.name as specialty,
        d.date_of_birth,
        d.status,
        d.license
      FROM 
        doctor d
      INNER JOIN 
	      specialty s ON d.specialty_id = s.id
      WHERE 
        d.id = ${id}
      GROUP BY 
        d.id, d.name, d.date_of_birth, d.status
      ORDER BY 
        d.id ASC;
      `;

      const [rows, fields] = await this.db().query(query);

      if (rows.length === 0) {
        return {
          status: 404,
          message: "Doctor not found",
        };
      }

      return {
        status: 200,
        message: "Doctor fetched successfully",
        data: rows,
      };
    } catch (err) {
      console.error("Error while fetching doctor", err);
      throw {
        status: 500,
        message: "Error while fetching doctors",
        error: err.message,
      };
    }
  }

  static async createDoctor(doctor) {
    try {
      const [rows, fields] = await this.db().query(
        "INSERT INTO doctor SET ?",
        doctor
      );
      return {
        status: 201,
        message: "Doctor created successfully",
        data: {
          id: rows.insertId,
          ...doctor,
        },
        info: rows,
      };
    } catch (err) {
      console.error("Error while creating doctor", err);
      throw {
        status: 500,
        message: "Error while creating doctor",
        error: err.message,
      };
    }
  }

  static async updateDoctor(id, doctor) {
    try {
      const editedDoctor = await this.getDoctorById(id);

      if (editedDoctor.data.length === 0) {
        return {
          status: 404,
          message: "Doctor not found",
        };
      }

      const [rows, fields] = await this.db().query(
        "UPDATE doctor SET ? WHERE id = ?",
        [doctor, id]
      );

      return {
        status: 200,
        message: "Doctor updated successfully",
        data: {
          id: editedDoctor.data[0].id,
          ...doctor
        },
        info: rows,
      };
    } catch (err) {
      console.error("Error while updating doctor", err);
      throw {
        status: 500,
        message: "Error while updating doctor",
        error: err.message,
      };
    }
  }

  static async deleteDoctor(id) {
    try {
      const editedDoctor = await this.getDoctorById(id);
  
      if (editedDoctor.data.length === 0) {
        return {
          status: 404,
          message: "Doctor not found",
        };
      }
  
      await this.db().query(
        "DELETE FROM population WHERE doctor_id = ?",
        [id]
      );
  
      await this.db().query(
        "DELETE FROM staff WHERE doctor_id = ?",
        [id]
      );
  
      const [rows, fields] = await this.db().query(
        "DELETE FROM doctor WHERE id = ?",
        [id]
      );
  
      return {
        status: 200,
        message: "Doctor deleted successfully",
        data: editedDoctor.data[0],
        info: rows,
      };
    } catch (err) {
      console.error("Error while deleting doctor", err);
      throw {
        status: 500,
        message: "Error while deleting doctor",
        error: err.message,
      };
    }
  }
}

module.exports = DoctorModel;
