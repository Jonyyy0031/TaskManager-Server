import { Router } from 'express';
import { login, register } from '../controllers/auth.js';
import multer from "multer";

const router = Router();

const storage = multer.diskStorage({
    destination: (req, file, cb) =>{
        cb(null, './uploads')
    },
    filename: (req, file, cb) =>{
        const ext = file.originalname.split('.').pop();
        cb(null, `${Date.now()}.${ext}`)
    }
});
const upload = multer({storage})


router.post("/login", login);
router.post("/register", upload.single('file'), register)

export default router;
