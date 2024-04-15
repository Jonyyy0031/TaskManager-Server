import dotenv from "dotenv";
dotenv.config();

import { connection } from "../config/config.js";
import { encrypt } from "../helpers/handleBcrypt.js";

const getUsuarios = async (request, response) => {
  await connection.query(
    "SELECT * FROM usuarios INNER JOIN roles WHERE usuarios.ID_Rol = roles.ID_Rol",
    (error, results) => {
      if (error) {
        console.log(error);
        return response.status(500).json({ error: "Error de servidor" });
      }
      response.status(200).json(results);
    }
  );
};

const getUsuariobyID = async (request, response) => {
  const UsuarioID = request.params.ID_Usuario;
  await connection.query(
    "SELECT * FROM usuarios WHERE ID_Usuario = ?",
    [UsuarioID],
    (error, results) => {
      if (error) {
        console.log(error);
        return response.status(500).json({ error: "Error de servidor" });
      }
      response.status(200).json(results[0]);
    }
  );
};

const postUsuario = async (request, response) => {
  const { ID_Rol, email, username, password } = request.body;
  const fechareg = new Date().toISOString().slice(0, 10);
  const hashpassword = await encrypt(password);

  if (!request.file) {
    return response
      .status(400)
      .json({ error: "No se ha proporcionado ninguna imagen" });
  }

  await connection.query(
    "SELECT * FROM usuarios WHERE Username = ? OR email = ?",
    [username, email],
    async (error, results) => {
      if (error) {
        console.log(error);
        return response.status(500).json({ error: "Error de servidor" });
      }
      if (results.length > 0) {
        const existingUser = results.find((user) => user.Username === username);
        if (existingUser) {
          return response
            .status(400)
            .json({ error: "El nombre de usuario ya esta en uso" });
        } else {
          return response
            .status(400)
            .json({ error: "El correo electronico ya esta en uso" });
        }
      } else {
        const imagePath = request.file.path.replace(/\\/g, "/");
        console.log(imagePath);
        await connection.query(
          "INSERT INTO usuarios (ID_Rol, username, email, password, fechareg, imagen) VALUES (?,?,?,?,?,?)",
          [ID_Rol, username, email, hashpassword, fechareg, imagePath],
          async (error, results) => {
            if (error) {
              console.log(error);
              return response.status(500).json({ error: "Error de servidor" });
            }
            response.status(201).json({
              "Usuario añadido correctamente": results.affectedRows,
            });
          }
        );
      }
    }
  );
};

const updateUsuario = async (request, response) => {
  const UsuarioID = request.params.ID_Usuario;
  const { ID_Rol, username, email, password } = request.body;
  const hashpassword = await encrypt(password);


  await connection.query(
    "SELECT * FROM usuarios WHERE Username = ? OR email = ?",
    [username, email],
    async (error, results) => {
      if (error) {
        console.log(error);
        return response.status(500).json({ error: "Error de servidor" });
      }
      if (results.length > 0) {
        const existingUser = results.find((user) => user.Username === username);
        if (existingUser) {
          return response
            .status(400)
            .json({ error: "El nombre de usuario ya esta en uso" });
        } else {
          return response
            .status(400)
            .json({ error: "El correo electronico ya esta en uso" });
        }
      } else {

        await connection.query(
          "UPDATE usuarios SET ID_Rol = IFNULL(?,ID_Rol), Username = IFNULL(?,Username), Email = IFNULL(?,Email), Password = IFNULL(?,Password), Fechareg = Fechareg WHERE ID_Usuario = ?",
          [ID_Rol, username, email, hashpassword, UsuarioID],
          (error, results) => {
            if (error) {
              console.log(error);
              return response.status(500).json({ error: "Error de servidor" });
            }
            response
              .status(201)
              .json({ "Usuario editado correctamente": results.affectedRows });
          }
        );
      }
    }
  );
};

const delUsuarios = async (request, response) => {
  const ID_Usuario = request.params.ID_Usuario;
  await connection.query(
    "DELETE FROM usuarios WHERE ID_Usuario = ?",
    [ID_Usuario],
    (error, results) => {
      if (error) {
        console.log(error);
        return response.status(500).json({ error: "Error de servidor" });
      }
      response.status(201).json({ "Usuario eliminado": results.affectedRows });
    }
  );
};

export { getUsuarios, getUsuariobyID, updateUsuario, postUsuario, delUsuarios };
