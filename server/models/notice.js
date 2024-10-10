const DatabaseDriver = require("../helpers/db");

class NoticeModel {
  static db = () => DatabaseDriver.getInstance().connection;

  static async getAllNotices() {
    try {
      const [rows, fields] = await this.db().query("SELECT * FROM notice");

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
      const [rows, fields] = await this.db().query(
        "SELECT * FROM notice WHERE id = ?",
        [id]
      );

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
      const [ rows, fields ]= await this.db().query("INSERT INTO notice SET ?", notice);

      return {
        status: 201,
        message: "Notice created successfully",
        data: { id: rows.insertId, ...notice },
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
