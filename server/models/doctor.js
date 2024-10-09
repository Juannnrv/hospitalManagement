const DatabaseDriver = require("../helpers/db");

class DoctorModel {
  static db = () => DatabaseDriver.getInstance().connection;

  static async getAllDoctors() {
    try {
      const [rows, fields] = await this.db().query("SELECT * FROM doctor");

      if (rows.length === 0) {
        return {
          status: 404,
          message: "Doctor not found",
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
      const [rows, fields] = await this.db().query(
        "SELECT * FROM doctor WHERE id = ?",
        [id]
      );

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
