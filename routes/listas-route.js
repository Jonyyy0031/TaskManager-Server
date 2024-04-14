import { Router } from "express";
import { checkAuth } from "../middleware/auth.js";
import { getListas, postListas, updateListas, delListas, getListasbyIDUsuario, getListaByID } from "../controllers/listas.js";

const router = Router();

router.get("/listas", checkAuth, getListas);
router.get("/listas/:ID_Lista", checkAuth, getListaByID);
router.get("/listasu/:ID_Usuario", checkAuth, getListasbyIDUsuario);
router.post("/listas", checkAuth, postListas);
router.patch("/listas/:ID_Lista", checkAuth, updateListas);
router.delete("/listas/:ID_Lista", checkAuth, delListas);

export default router;