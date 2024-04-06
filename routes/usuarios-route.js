import { Router } from "express";

import { getUsuarios, postUsuario, updateUsuario, delUsuarios, postUsuarioRegister, getUsuariobyID } from "../controllers/usuarios.js";

const router = Router();

router.get("/usuarios", getUsuarios);
router.get("/usuarios/:ID_Usuario", getUsuariobyID);
router.post("/usuarios", postUsuario);
router.post("/usuariosregister", postUsuarioRegister)
router.patch("/usuarios/:ID_Usuario", updateUsuario);
router.delete("/usuarios/:ID_Usuario", delUsuarios);

export default router;