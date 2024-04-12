    import { Router } from "express";
    import { checkAuth } from "../middleware/auth.js";
    import {checkRoleAuth} from "../middleware/roleAuth.js"
    import { getUsuarios, postUsuario, updateUsuario, delUsuarios, getUsuariobyID } from "../controllers/usuarios.js";
    import multer from "multer";
    import sharp from "sharp";

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

    router.post("/usuarios", checkAuth, checkAuth, checkRoleAuth(1), upload.single('file'),  postUsuario);


    router.get("/usuarios", checkAuth, checkRoleAuth(1), getUsuarios);
    router.get("/usuarios/:ID_Usuario", checkAuth, checkRoleAuth(1), getUsuariobyID);

    router.patch("/usuarios/:ID_Usuario", checkAuth, checkRoleAuth(1), upload.single('file'), updateUsuario);
    router.delete("/usuarios/:ID_Usuario",checkAuth, checkRoleAuth(1),  delUsuarios);

    export default router;