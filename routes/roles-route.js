import { Router } from "express";
import { getRoles, postRoles, updateRoles, delRoles, getNombreRolbyID } from "../controllers/roles.js";
import { checkAuth } from "../middleware/auth.js";
import { checkRoleAuth } from "../middleware/roleAuth.js";
const router = Router();

router.get("/roles", checkAuth, checkRoleAuth(1), getRoles);
router.get("/roles/:ID_Rol", checkAuth, checkRoleAuth(1), getNombreRolbyID);
router.post("/roles", checkAuth, checkRoleAuth(1), postRoles);
router.patch("/roles/:ID_Rol", checkAuth, checkRoleAuth(1), updateRoles);
router.delete("/roles/:ID_Rol", checkAuth, checkRoleAuth(1), delRoles);

export default router;