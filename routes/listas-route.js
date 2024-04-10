import { Router } from "express";
import { checkAuth } from "../middleware/auth.js";
import { getListas, getNombreListabyID, postListas, updateListas, delListas } from "../controllers/listas.js";

const router = Router();

router.get("/listas", checkAuth, getListas);
router.get("/listas/:ID_Lista", checkAuth, getNombreListabyID);
router.post("/listas", checkAuth, postListas);
router.patch("/listas/:ID_Lista", checkAuth, updateListas);
router.delete("/listas/:ID_Lista", checkAuth, delListas);

export default router;