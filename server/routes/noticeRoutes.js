const express = require('express');
const { getAllNotices, getNoticeById, createNotice, updateNotice, deleteNotice } = require('../controllers/noticeController');
const validateNotice = require('../validators/noticeValidator');
const notice = express.Router();

notice.get('/', getAllNotices);
notice.get('/:id', getNoticeById);
notice.put('/:id', updateNotice, validateNotice);
notice.post('/', createNotice, validateNotice);
notice.delete('/:id', deleteNotice);

module.exports = notice;