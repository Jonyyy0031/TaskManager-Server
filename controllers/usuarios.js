import dotenv from "dotenv";
dotenv.config();

import { connection } from "../config/config.js";

const getUsuarios = (request, response) => {
    connection.query("SELECT * FROM usuarios",
    (error, results) => {
        if(error){
            console.log(error);
            return response.status(500).json({ error: "Error de servidor" });
            }
        response.status(200).json(results);
    });
};

const postUsuario = (request, response) => {
    const {ID_Rol, Username, Password} = request.body;
    connection.query("INSERT INTO usuarios (ID_Rol, Username, Password) VALUES (?,?,?)", 
    [ID_Rol, Username, Password],
    (error, results) => {
        if(error){
            console.log(error);
            return response.status(500).json({ error: "Error de servidor" });
            }
        response.status(201).json({"Usuario añadido correctamente": results.affectedRows});
    });
};

const postUsuarioRegister = (request, response) => {
    const { username, email, password } = request.body;
    const ID_Rol = 1000;
    connection.query(
        "SELECT * FROM usuarios WHERE Username = ? OR email = ?",
        [username, email],
        (error, results) => {
            if(error){
        console.log(error);
                return response.status(500).json({ error: "Error de servidor" });
                }        
            if (results.length > 0) {
                const existingUser = results.find(user => user.Username === username);
                if (existingUser) {
                    response.status(400).json({ error: "El nombre de usuario ya está en uso" });
                } else {
                    response.status(400).json({ error: "El correo electrónico ya está en uso" });
                }
            } else {
                connection.query(
                    "INSERT INTO usuarios (ID_Rol, username, email, password) VALUES (?, ?, ?, ?)",
                    [ID_Rol, username, email, password],
                    (error, results) => {
                        if(error){
                            console.log(error);
                            return response.status(500).json({ error: "Error de servidor" });
                            }
                        response.status(201).json({ "Usuario añadido correctamente": results.affectedRows });
                    }
                );
            }
        }
    );
};


const updateUsuario = (request, response) => {
    const UsuarioID = request.params.ID_Usuario;
    const {ID_Rol, Username, Password} = request.body;
    connection.query("UPDATE usuarios SET ID_Rol = IFNULL(?,ID_Rol), Username = IFNULL(?,Username), Password = IFNULL(?,Password) WHERE UsuarioID = ?", 
        [ID_Rol, Username, Password, UsuarioID],
        (error, results) => {
            if(error)
                throw error;
            response.status(201).json({"Usuario editado correctamente": results.affectedRows});
        });
};

const delUsuarios = (request, response) => {
    const ID_Usuario = request.params.ID_Usuario;
    connection.query("DELETE FROM usuarios WHERE ID_Usuario = ?",
     [ID_Usuario],
    (error, results) => {
        if(error)
            throw error;
        response.status(201).json({"Usuario eliminado":results.affectedRows});
    });
};

export { getUsuarios, updateUsuario, postUsuario, postUsuarioRegister, delUsuarios }