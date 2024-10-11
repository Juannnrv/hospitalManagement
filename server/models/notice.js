const DatabaseDriver = require("../helpers/db");
const HospitalModel = require("./hospital");

class NoticeModel {
  static db = () => DatabaseDriver.getInstance().connection;

  static async getAllNotices() {
    try {
      const [rows, fields] = await this.db().query(`select 
        n.id,
          h.name as hospital_name,
          n.date,
          n.name,
          n.description
      from 
        notice n
      right join
        hospital h on n.hospital_id = h.id`);

      if (rows.length === 0) {
        return {
          status: 404,
          message: "Notice not found",
        };
      }

      return {
        status: 200,
        message: "Notices fetched successfully",
        data: rows,
      };
    } catch (err) {
      console.error("Error while fetching notices", err);
      throw {
        status: 500,
        message: "Error while fetching notices",
        error: err.message,
      };
    }
  }

  static async getNoticeById(id) {
    try {
      const [rows, fields] = await this.db().query(`select 
      n.id,
        h.name as hospital_name,
        n.date,
        n.name,
        n.description
    from 
      notice n
    right join
      hospital h on n.hospital_id = h.id
    where
      n.id = ?`, [id]);

      if (rows.length === 0) {
        return {
          status: 404,
          message: "Notice not found",
        };
      }

      return {
        status: 200,
        message: "Notice fetched successfully",
        data: rows,
      };
    } catch (err) {
      console.error("Error while fetching notice", err);
      throw {
        status: 500,
        message: "Error while fetching notices",
        error: err.message,
      };
    }
  }

  static async createNotice(notice) {
    try {
      const [rows, fields] = await this.db().query("INSERT INTO notice SET ?", notice);
  
      const hospitalResult = await HospitalModel.getHospitalById(notice.hospital_id);
      const hospitalName = hospitalResult.data[0].name;
  
      return {
        status: 201,
        message: "Notice created successfully",
        data: { id: rows.insertId, ...notice, hospital_name: hospitalName },
      };
    } catch (err) {
      console.error("Error while creating notice", err);
      throw {
        status: 500,
        message: "Error while creating notice",
        error: err.message,
      };
    }
  }

  static async updateNotice(id, notice) {
    try {
      const editedNotice = await this.getNoticeById(id);
  
      if (editedNotice.data.length === 0) {
        return {
          status: 404,
          message: "Notice not found",
        };
      }
  
      const { hospital_name, ...noticeData } = notice;
  
      const [rows, fields] = await this.db().query("UPDATE notice SET ? WHERE id = ?", [noticeData, id]);
  
      const hospitalResult = await HospitalModel.getHospitalById(notice.hospital_id);
      const hospitalName = hospitalResult.data[0].name;
  
      return {
        status: 200,
        message: "Notice updated successfully",
        data: { id, ...noticeData, hospital_name: hospitalName },
      };
    } catch (err) {
      console.error("Error while updating notice", err);
      throw {
        status: 500,
        message: "Error while updating notice",
        error: err.message,
      };
    }
  }

  static async deleteNotice(id) {
    try {
      const deletedNotice = await this.getNoticeById(id);

      const result = await this.db().query("DELETE FROM notice WHERE id = ?", [
        id,
      ]);

      if (result.affectedRows === 0) {
        return {
          status: 404,
          message: "Notice not found",
          data: deletedNotice.data[0],
        };
      }

      return {
        status: 200,
        message: "Notice deleted successfully",
        data: deletedNotice.data[0],
      };
    } catch (err) {
      console.error("Error while deleting notice", err);
      throw {
        status: 500,
        message: "Error while deleting notice",
        error: err.message,
      };
    }
  }
}

module.exports = NoticeModel;
