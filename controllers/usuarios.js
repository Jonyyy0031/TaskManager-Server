import dotenv from "dotenv";
dotenv.config();

import { connection } from "../config/config.js";

const getUsuarios =  async (request, response) => {
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
  const fechaact = new Date();
  const dia = fechaact.getDate().toString().padStart(2, "0");
  const mes = (fechaact.getMonth() + 1).toString().padStart(2, "0");
  const año = fechaact.getFullYear();

  const fechareg = `${año}-${mes}-${dia}`;

  const imagen = request.files ? request.files.imagen : null;
  let imagenPath = null;

 await connection.query(
    "SELECT * FROM usuarios WHERE Username = ? OR email = ?",
    [username, email],
    (error, results) => {
      if (error) {
        console.log(error);
        return response.status(500).json({ error: "Error de servidor" });
      }
      if (results.length > 0) {
        const existingUser = results.find((user) => user.Username === username);
        if (existingUser) {
          response
            .status(400)
            .json({ error: "El nombre de usuario ya esta en uso" });
        } else {
          response
            .status(400)
            .json({ error: "El correo electronico ya esta en uso" });
        }
      } else {
        if (imagen) {
          const nombreArchivo = `${username}-${imagen.name}`;
          const rutaArchivo = path.join(__dirname, "uploads", nombreArchivo);

          imagen.mv(rutaArchivo, (error) => {
            if (error) {
              console.log(error);
              return response
                .status(500)
                .json({ error: "Error al subir la imagen de perfil" });
            }

            imagenPath = `/uploads/${nombreArchivo}`;

            connection.query(
              "INSERT INTO usuarios (ID_Rol, username, email, password, fechareg, imagen) VALUES (?,?,?,?,?,?)",
              [ID_Rol, username, email, password, fechareg, imagenPath],
              (error, results) => {
                if (error) {
                  console.log(error);
                  return response
                    .status(500)
                    .json({ error: "Error de servidor" });
                }
                response.status(201).json({
                  "Usuario añadido correctamente": results.affectedRows,
                });
              }
            );
          });
        } else {
          connection.query(
            "INSERT INTO usuarios (ID_Rol, username, email, password, fechareg) VALUES (?,?,?,?,?)",
            [ID_Rol, username, email, password, fechareg],
            (error, results) => {
              if (error) {
                console.log(error);
                return response
                  .status(500)
                  .json({ error: "Error de servidor" });
              }
              response.status(201).json({
                "Usuario añadido correctamente": results.affectedRows,
              });
            }
          );
        }
      }
    }
  );
};

const postUsuarioRegister = (request, response) => {
  const { username, email, password } = request.body;
  const ID_Rol = 1000;
  const fechareg = new Date().toISOString().slice(0, 10);
  connection.query(
    "SELECT * FROM usuarios WHERE Username = ? OR Email = ?",
    [username, email],
    (error, results) => {
      if (error) {
        console.log(error);
        console.log(results);
        return response.status(500).json({ error: "Error de servidor" });
      }
      if (results.length > 0) {
        const existingUser = results.find((user) => user.Username === username);
        if (existingUser) {
          response
            .status(400)
            .json({ error: "El nombre de usuario ya está en uso" });
        } else {
          response
            .status(400)
            .json({ error: "El correo electrónico ya está en uso" });
        }
      } else {
        connection.query(
          "INSERT INTO usuarios (ID_Rol, username, email, password, fechareg) VALUES (?, ?, ?, ?, ?)",
          [ID_Rol, username, email, password, fechareg],
          (error, results) => {
            if (error) {
              console.log(error);
              return response.status(500).json({ error: "Error de servidor" });
            }
            response
              .status(201)
              .json({ "Usuario añadido correctamente": results });
          }
        );
      }
    }
  );
};

const updateUsuario = async (request, response) => {
  const UsuarioID = request.params.ID_Usuario;
  const { ID_Rol, username, email, password } = request.body;
  await connection.query(
    "UPDATE usuarios SET ID_Rol = IFNULL(?,ID_Rol), Username = IFNULL(?,Username), Email = IFNULL(?,Email), Password = IFNULL(?,Password), Fechareg = Fechareg WHERE ID_Usuario = ?",
    [ID_Rol, username, email, password, UsuarioID],
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

export {
  getUsuarios,
  getUsuariobyID,
  updateUsuario,
  postUsuario,
  postUsuarioRegister,
  delUsuarios,
};
