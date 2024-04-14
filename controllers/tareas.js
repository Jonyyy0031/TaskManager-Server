import dotenv from "dotenv";
dotenv.config();

import { connection } from "../config/config.js";

const getTareas = async (request, response) => {
    await connection.query("SELECT * FROM tareas",
    (error, results) => {
        if(error){
            console.log(error);
            return response.status(500).json({ error: "Error de servidor" });
            }
        response.status(200).json(results);
    });
};

const getTareaByID = async (request, response) => {
    const ID_Tarea = request.params.ID_Tarea
    await connection.query("SELECT * FROM tareas WHERE ID_Tarea = ?",
    [ID_Tarea],
    (error, results) => {
        if(error){
            console.log(error);
            return response.status(500).json({ error: "Error de servidor" });
            }
        response.status(200).json(results[0]);
    });
};


const postTareas  = async (request, response) => {
    const {ID_Lista, Titulo, Descripcion, Prioridad, Fechavencimiento} = request.body;
    if (!['Alto', 'Normal', 'Bajo'].includes(Prioridad)) {
        return response.status(400).json({ error: "Prioridad inválida" });
    }
    console.log(request.body)
     await connection.query("INSERT INTO tareas (ID_Lista, Titulo, Descripcion, Prioridad, Fechavencimiento) VALUES (?,?,?,?,?)", 
    [ID_Lista, Titulo, Descripcion, Prioridad, Fechavencimiento],
    (error, results) => {
        if(error){
            console.log(error);
            return response.status(500).json({ error: "Error de servidor" });
            }
        response.status(201).json({"Tarea añadida correctamente": results.affectedRows});
    });
};

const updateTareas = async (request, response) => {
    const ID_Tarea = request.params.ID_Tarea;
    const {Titulo, Descripcion, Prioridad, FechaVencimiento} = request.body;
    if (!['Alto', 'Normal', 'Bajo'].includes(Prioridad)) {
        return response.status(400).json({ error: "Prioridad inválida" });
    }
    await connection.query("UPDATE tareas SET Titulo = IFNULL(?,Titulo), Descripcion = IFNULL(?,Descripcion), Prioridad = IFNULL(?,Prioridad), FechaVencimiento = IFNULL(?,FechaVencimiento) WHERE ID_Tarea = ?", 
        [Titulo, Descripcion, Prioridad, FechaVencimiento, ID_Tarea],
        (error, results) => {
            if(error){
                console.log(error);
                return response.status(500).json({ error: "Error de servidor" });
                }
            response.status(201).json({"Tarea editada correctamente": results.affectedRows});
        });
};

const delTareas = async (request, response) => {
    const ID_Tarea = request.params.ID_Tarea;
    await connection.query("DELETE FROM tareas WHERE ID_Tarea = ?",
     [ID_Tarea],
    (error, results) => {
        if(error){
            console.log(error);
            return response.status(500).json({ error: "Error de servidor" });
            }
        response.status(201).json({"Tarea eliminada":results.affectedRows});
    });
};

export { getTareas, getTareaByID, postTareas, updateTareas, delTareas}