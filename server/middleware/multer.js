const multer = require('multer');
const storge = multer.memoryStorage()
const upload = multer({ storage: storge })

module.exports = upload;
