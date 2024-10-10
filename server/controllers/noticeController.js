const noticeModel = require('../models/notice');

class NoticeController {
    static async getAllNotices(req, res) {
        try {
            const result = await noticeModel.getAllNotices();
            res.status(result.status).json(result);
        } catch (err) {
            res.status(err.status).json({ message: err.message, error: err.error });
        }
    }

    static async getNoticeById(req, res) {
        try {
            const result = await noticeModel.getNoticeById(req.params.id);
            res.status(result.status).json(result);
        } catch (err) {
            res.status(err.status).json({ message: err.message, error: err.error });
        }
    }

    static async createNotice(req, res) {
        try {
            const result = await noticeModel.createNotice(req.body);
            res.status(result.status).json(result);
        } catch (err) {
            res.status(err.status).json({ message: err.message, error: err.error });
        }
    }

    static async deleteNotice(req, res) {
        try {
            const result = await noticeModel.deleteNotice(req.params.id);
            res.status(result.status).json(result);
        } catch (err) {
            res.status(err.status).json({ message: err.message, error: err.error });
        }
    }
}

module.exports = NoticeController;