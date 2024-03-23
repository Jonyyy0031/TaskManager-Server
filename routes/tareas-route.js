import { Router } from "express";
import { getTareas, postTareas, updateTareas, delTareas } from "../controllers/tareas.js";

const router = Router();

router.get("/tareas", getTareas);
router.post("/tareas", postTareas);
router.patch("tareas/:ID_Tarea", updateTareas);
router.delete("/tareas/:ID_Tarea", delTareas);

export default router;