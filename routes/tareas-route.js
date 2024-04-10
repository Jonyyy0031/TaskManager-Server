import { Router } from "express";
import { checkAuth } from "../middleware/auth.js";
import { getTareas, postTareas, updateTareas, delTareas } from "../controllers/tareas.js";

const router = Router();

router.get("/tareas", checkAuth, getTareas);
router.post("/tareas", checkAuth, postTareas);
router.patch("/tareas/:ID_Tarea", checkAuth, updateTareas);
router.delete("/tareas/:ID_Tarea", checkAuth, delTareas);

export default router;