import multer from 'multer';

const storge = multer.memoryStorage()
const upload = multer({ storage: storge })
export default upload;