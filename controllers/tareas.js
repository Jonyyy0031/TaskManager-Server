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


const postTareas  = async (request, response) => {
    const {ID_Tarea ,ID_Usuario, Titulo, Descripcion, Prioridad, FechaVencimiento, Categoria} = request.body;
     await connection.query("INSERT INTO tareas (ID_Tarea ,ID_Usuario, Titulo, Descripcion, Prioridad, FechaVencimiento, Categoria) VALUES (?,?,?,?,?,?,?)", 
    [ID_Tarea,ID_Usuario, Titulo, Descripcion, Prioridad, FechaVencimiento, Categoria],
    (error, results) => {
        if(error){
            console.log(error);
            return response.status(500).json({ error: "Error de servidor" });
            }
        response.status(201).json({"Tarea añadida correctamente": results.affectedRows});
    });
};

const updateTareas = async (request, response) => {
    const TareaID = request.params.ID_Tarea;
    const {Titulo, Descripcion, Prioridad, FechaVencimiento, Categoria} = request.body;
    await connection.query("UPDATE tareas SET Titulo = IFNULL(?,Titulo), Descripcion = IFNULL(?,Descripcion), Prioridad = IFNULL(?,Prioridad), FechaVencimiento = IFNULL(?,FechaVencimiento), Categoria WHERE TareaID = ?", 
        [Titulo, Descripcion, Prioridad, FechaVencimiento, Categoria, TareaID],
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

export { getTareas, postTareas, updateTareas, delTareas}