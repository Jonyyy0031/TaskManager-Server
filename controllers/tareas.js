import dotenv from "dotenv";
dotenv.config();

import { connection } from "../config/config.js";

const getTareas = (request, response) => {
    connection.query("SELECT * FROM tareas",
    (error, results) => {
        if(error)
            throw error;
        response.status(200).json(results);
    });
};


const postTareas = (request, response) => {
    const {ID_Tarea ,ID_Usuario, Titulo, Descripcion, Prioridad, FechaVencimiento, Categoria} = request.body;
    connection.query("INSERT INTO tareas (ID_Tarea ,ID_Usuario, Titulo, Descripcion, Prioridad, FechaVencimiento, Categoria) VALUES (?,?,?,?,?,?,?)", 
    [ID_Tarea,ID_Usuario, Titulo, Descripcion, Prioridad, FechaVencimiento, Categoria],
    (error, results) => {
        if(error)
            throw error;
        response.status(201).json({"Tarea añadida correctamente": results.affectedRows});
    });
};

const updateTareas = (request, response) => {
    const TareaID = request.params.ID_Tarea;
    const {Titulo, Descripcion, Prioridad, FechaVencimiento, Categoria} = request.body;
    connection.query("UPDATE tareas SET Titulo = IFNULL(?,Titulo), Descripcion = IFNULL(?,Descripcion), Prioridad = IFNULL(?,Prioridad), FechaVencimiento = IFNULL(?,FechaVencimiento), Categoria WHERE TareaID = ?", 
        [Titulo, Descripcion, Prioridad, FechaVencimiento, Categoria, TareaID],
        (error, results) => {
            if(error)
                throw error;
            response.status(201).json({"Tarea editada correctamente": results.affectedRows});
        });
};

const delTareas = (request, response) => {
    const ID_Tarea = request.params.ID_Tarea;
    connection.query("DELETE FROM tareas WHERE ID_Tarea = ?",
     [ID_Tarea],
    (error, results) => {
        if(error)
            throw error;
        response.status(201).json({"Tarea eliminada":results.affectedRows});
    });
};

export { getTareas, postTareas, updateTareas, delTareas}