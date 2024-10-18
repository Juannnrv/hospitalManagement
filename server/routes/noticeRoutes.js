const express = require('express');
const { getAllNotices, getNoticeById, createNotice, updateNotice, deleteNotice } = require('../controllers/noticeController');
const validateNotice = require('../validators/noticeValidator');
const { limit } = require('../middleware/requestLimit');
const notice = express.Router();

notice.get('/', limit('get'), getAllNotices);
notice.get('/:id', limit('get'), getNoticeById);
notice.put('/:id', limit('put'), updateNotice, validateNotice);
notice.post('/', limit('post'), createNotice, validateNotice);
notice.delete('/:id', limit('delete'), deleteNotice);

module.exports = notice;