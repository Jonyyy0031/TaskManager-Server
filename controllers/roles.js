import dotenv from "dotenv";
dotenv.config();

import { connection } from "../config/config.js";

const getRoles = (request, response) => {
  connection.query("SELECT * FROM roles", (error, results) => {
    if (error) {
      console.log(error);
      return response.status(500).json({ error: "Error de servidor" });
    }
    response.status(200).json(results);
  });
};

const getNombreRolbyID = (request, response) => {
  const RolID = request.params.ID_Rol;
  connection.query(
    "SELECT Nombre FROM roles WHERE ID_Rol = ?",
    [RolID],
    (error, results) => {
      if (error) {
        console.log(error);
        return response.status(500).json({ error: "error de servidor" });
      }
      return response.status(201).json(results[0]);
    }
  );
};

const postRoles = (request, response) => {
  const {Nombre} = request.body;
  connection.query(
    "SELECT * FROM roles WHERE Nombre = ?",
    [Nombre],
    (error, results) => {
      if (error) {
        console.log(error);
        return response.status(500).json({ error: "error de servidor" });
      }
      if (results.length > 0) {
        response.status(400).json({ error: "El nombre del rol ya existe" });
      } else {
        connection.query(
          "INSERT INTO roles (Nombre) VALUES (?)",
          [Nombre],
          (error, results) => {
            if (error) {
              console.log(error);
              return response.status(500).json({ error: "Error de servidor" });
            }
            response
              .status(201)
              .json({ "Rol añadido correctamente": results.affectedRows });
          }
        );
      }
    }
  );
};

const updateRoles = (request, response) => {
  const RolID = request.params.ID_Rol;
  const { Nombre } = request.body;
  connection.query(
    "SELECT COUNT(*) AS count FROM roles WHERE Nombre = ?",
    [Nombre],
    (error, results) => {
      if (error) {
        console.log(error);
        return response.status(500).json({ error: "Error de servidor" });
      }

      const count = results[0].count;

      if (count > 0) {
        return response.status(400).json({ error: "El nombre del rol ya existe" });
      }

      connection.query(
        "UPDATE roles SET Nombre = IFNULL(?, Nombre) WHERE ID_Rol = ?",
        [Nombre, RolID],
        (error, results) => {
          if (error) {
            console.log(error);
            return response.status(500).json({ error: "Error de servidor" });
          }
          response
            .status(201)
            .json({ "Rol editado correctamente": results.affectedRows });
        }
      );
    }
  );
};


const delRoles = (request, response) => {
  const ID_Rol = request.params.ID_Rol;
  connection.query(
    "DELETE FROM roles WHERE ID_Rol = ?",
    [ID_Rol],
    (error, results) => {
      if (error) {
        console.log(error);
        return response.status(500).json({ error: "Error de servidor" });
      }
      response.status(201).json({ "Rol eliminado": results.affectedRows });
    }
  );
};

export { getRoles, getNombreRolbyID, postRoles, updateRoles, delRoles };
