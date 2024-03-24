import dotenv from "dotenv";
dotenv.config();

import { connection } from "../config/config.js";

const getRoles = (request, response) => {
    connection.query("SELECT * FROM roles",
    (error, results) => {
        if(error){
            console.log(error);
            return response.status(500).json({ error: "Error de servidor" });
            }
        response.status(200).json(results);
    });
};


const postRoles = (request, response) => {
    const {ID_Rol, Nombre} = request.body;
    connection.query("INSERT INTO roles (ID_Rol, Nombre) VALUES (?,?)", 
    [ID_Rol, Nombre],
    (error, results) => {
        if(error){
            console.log(error);
            return response.status(500).json({ error: "Error de servidor" });
            }
        response.status(201).json({"Rol añadido correctamente": results.affectedRows});
    });
};

const updateRoles = (request, response) => {
    const {ID_Rol, Nombre} = request.body;
    connection.query("UPDATE roles SET Nombre = IFNULL(?, Nombre) WHERE ID_Rol = ?", 
        [Nombre, ID_Rol],
        (error, results) => {
            if(error){
                console.log(error);
                return response.status(500).json({ error: "Error de servidor" });
                }
            response.status(201).json({"Rol editado correctamente": results.affectedRows});
        });
}


const delRoles = (request, response) => {
    const ID_Rol = request.params.ID_Rol;
    connection.query("DELETE FROM roles WHERE ID_Rol = ?",
     [ID_Rol],
    (error, results) => {
        if(error){
            console.log(error);
            return response.status(500).json({ error: "Error de servidor" });
            }
        response.status(201).json({"Rol eliminado":results.affectedRows});
    });
};

export{
    getRoles, postRoles, updateRoles, delRoles
}
