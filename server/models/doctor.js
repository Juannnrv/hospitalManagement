const DatabaseDriver = require("../helpers/db");

class DoctorModel {
  static db = () => DatabaseDriver.getInstance().connection;

  static async getAllDoctors() {
    try {
      const query = `
      SELECT 
          d.id, d.name, d.email, d.phone, s.name AS specialty, 
          d.gender, d.date_of_birth, d.license, d.status, dc.type, dc.contact
        FROM 
          doctor d
        INNER JOIN 
          specialty s
        ON 
          d.specialty_id = s.id
		right join
			doctor_contact dc
            ON d.id = dc.doctor_id
		
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

      const query = `
      SELECT 
        doctor.id, 
        doctor.name,
        doctor.email,
        doctor.phone,
        specialty.name AS specialty, 
        doctor.gender,
        doctor.date_of_birth,
        doctor.license, 
        doctor.status
      FROM 
        doctor
      INNER JOIN 
        specialty ON doctor.specialty_id = specialty.id
      WHERE
        doctor.id = ${id};
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
          ...doctor,
          id: rows.insertId,
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
        data: editedDoctor.data[0],
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

      const [rows, fields] = await this.db().query(
        "DELETE FROM doctor WHERE id = ?",
        [id]
      );

      if (editedDoctor.data.length === 0) {
        return {
          status: 404,
          message: "Doctor not found",
        };
      }

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
