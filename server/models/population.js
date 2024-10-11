const DatabaseDriver = require("../helpers/db");

class PopulationModel {
  static db = () => DatabaseDriver.getInstance().connection;

  static async getNoAppointments() {
    try {
      const query = `SELECT 
            p.id,
            p.name,
            p.status
        FROM
            patient p
        LEFT JOIN
            population po ON p.id = po.patient_id
        WHERE
            po.doctor_id IS NULL;
            `;

      const [rows, fields] = await this.db().query(query);

      if (rows.length === 0) {
        return {
          status: 404,
          message: "No appointments found",
        };
      }

      return {
        status: 200,
        message: "Appointments fetched successfully",
        data: rows,
      };
    } catch (err) {
      console.error("Error while fetching appointments", err);
      throw {
        status: 500,
        message: "Error while fetching appointments",
        error: err.message,
      };
    }
  }

  static async getAllAppointments() {
    try {
      const query = `SELECT 
            p.id,
            p.name as patient,
            d.name as doctor,
            s.name as doctor_specialty,
            p.status
        FROM
            patient p
        RIGHT JOIN
            population po ON p.id = po.patient_id
        LEFT JOIN
            doctor d ON po.doctor_id = d.id
        LEFT JOIN
            specialty s on d.specialty_id = s.id;`;

      const [rows, fields] = await this.db().query(query);

      if (rows.length === 0) {
        return {
          status: 404,
          message: "No appointments found",
        };
      }

      return {
        status: 200,
        message: "Appointments fetched successfully",
        data: rows,
      };
    } catch (err) {
      console.error("Error while fetching appointments", err);
      throw {
        status: 500,
        message: "Error while fetching appointments",
        error: err.message,
      };
    }
  }

  static async createAppointment(appointment) {
    try {
      const query = `INSERT INTO population (patient_id, doctor_id) VALUES (?, ?);`;
      const [rows] = await this.db().query(query, [
        appointment.patient_id,
        appointment.doctor_id,
      ]);

      return {
        status: 201,
        message: "Appointment created",
        data: { ...appointment },
      };
    } catch (err) {
      console.error(err);
      throw { status: 500, message: "Error creating appointment" };
    }
  }

  static async updateAppointment(id, appointment) {
    try {

      const query = `UPDATE population SET ? WHERE patient_id = ?;`;
      const [rows, fields] = await this.db().query(query, [appointment, id]);

      return {
        status: 200,
        message: "Appointment updated successfully",
        data: {
          ...appointment,
        },
      };
    } catch (err) {
      console.error("Error while updating appointment", err);
      throw {
        status: 500,
        message: "Error while updating appointment",
        error: err.message,
      };
    }
  }

  static async deleteAppointment(id) {
    try {
      const query = `DELETE FROM population WHERE patient_id = ?;`;
      const [rows, fields] = await this.db().query(query, id);

      if (rows.affectedRows === 0) {
        return {
          status: 404,
          message: "Appointment not found",
        };
      }

      return {
        status: 200,
        message: "Appointment deleted successfully",
      };
    } catch (err) {
      console.error("Error while deleting appointment", err);
      throw {
        status: 500,
        message: "Error while deleting appointment",
        error: err.message,
      };
    }
  }
}

module.exports = PopulationModel;
