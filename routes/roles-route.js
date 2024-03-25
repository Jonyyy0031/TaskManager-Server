import { Router } from "express";
import { getRoles, postRoles, updateRoles, delRoles } from "../controllers/roles.js";

const router = Router();

router.get("/roles", getRoles);
router.post("/roles", postRoles);
router.patch("/roles/:ID_Rol", updateRoles);
router.delete("/roles/:ID_Rol", delRoles);

export default router;