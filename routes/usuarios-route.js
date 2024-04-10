import { Router } from "express";
import { checkAuth } from "../middleware/auth.js";
import {checkRoleAuth} from "../middleware/roleAuth.js"
import { getUsuarios, postUsuario, updateUsuario, delUsuarios, getUsuariobyID } from "../controllers/usuarios.js";

const router = Router();


router.get("/usuarios", checkAuth, checkRoleAuth(1), getUsuarios);
router.get("/usuarios/:ID_Usuario", checkAuth, checkRoleAuth(1), getUsuariobyID);
router.post("/usuarios", checkAuth, checkAuth, checkRoleAuth(1),  postUsuario);
router.patch("/usuarios/:ID_Usuario", checkAuth, checkRoleAuth(1), updateUsuario);
router.delete("/usuarios/:ID_Usuario",checkAuth, checkRoleAuth(1),  delUsuarios);

export default router;