const express = require('express');
const { getAllNotices, getNoticeById, createNotice, deleteNotice } = require('../controllers/noticeController');
const notice = express.Router();

notice.get('/', getAllNotices);
notice.get('/:id', getNoticeById);
notice.post('/', createNotice);
notice.delete('/:id', deleteNotice);

module.exports = notice;