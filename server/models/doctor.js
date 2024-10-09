const DatabaseDriver = require("../helpers/db");

class DoctorModel {
  static db = () => DatabaseDriver.getInstance().connection;

  static async getAllDoctors() {
    try {
      const [rows, fields] = await this.db().query("SELECT * FROM doctor");
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
        const [rows, fields] = await this.db().query("INSERT INTO doctor SET ?", doctor);
        return { status: 201, message: "Doctor created successfully", data: doctor, info: rows };
    } catch (err) {
        console.error("Error while creating doctor", err);
        throw { status: 500, message: "Error while creating doctor", error: err.message };
    }
}
}

module.exports = DoctorModel;
