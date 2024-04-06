import { Router } from "express";
import { getRoles, postRoles, updateRoles, delRoles, getNombreRolbyID } from "../controllers/roles.js";

const router = Router();

router.get("/roles", getRoles);
router.get("/roles/:ID_Rol", getNombreRolbyID);
router.post("/roles", postRoles);
router.patch("/roles/:ID_Rol", updateRoles);
router.delete("/roles/:ID_Rol", delRoles);

export default router;