import { Router } from "express";
import { checkAuth } from "../middleware/auth.js";
import { getTareas, postTareas, updateTareas, delTareas, getTareaByID } from "../controllers/tareas.js";

const router = Router();

router.get("/tareas", checkAuth, getTareas);
router.get("/tareas/:ID_Tarea", checkAuth, getTareaByID)
router.post("/tareas", checkAuth, postTareas);
router.patch("/tareas/:ID_Tarea", checkAuth, updateTareas);
router.delete("/tareas/:ID_Tarea", checkAuth, delTareas);

export default router;