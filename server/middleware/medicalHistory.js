const multer = require('multer');

const storage = multer.memoryStorage(); 

const fileFilter = (req, file, cb) => {
  if (file.mimetype === 'text/markdown' || file.mimetype === 'text/x-markdown' || file.mimetype === 'text/plain') {
    cb(null, true);
  } else {
    cb(new Error('Invalid file type, only .md, .markdown, and .txt are allowed'), false);
  }
};

const upload = multer({ 
  storage: storage,
  fileFilter: fileFilter
});

module.exports = upload;