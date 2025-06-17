// middlewares/upload.js
import multer from 'multer';

const storage = multer.memoryStorage(); // on stocke temporairement en mémoire
const upload = multer({ storage });

export default upload;
