import dotenv from "dotenv";
dotenv.config();

import { connection } from "../config/config.js";

const getListas = async (request, response) => {
   await connection.query("SELECT * FROM listas",
   (error, results) => {
    if (error) {
      console.log(error);
      return response.status(500).json({ error: "Error de servidor" });
    }
    response.status(200).json(results);
  });
};

const getListaByID = async (request, response) => {
  const ID_Lista = request.params.ID_Lista;
  await connection.query("SELECT * FROM listas WHERE ID_Lista = ?",
  [ID_Lista],
  (error, results) => {
   if (error) {
     console.log(error);
     return response.status(500).json({ error: "Error de servidor" });
   }
   response.status(200).json(results[0]);
 });
};

const getListasbyIDUsuario = async (request, response) => {
  const ID_Usuario = request.params.ID_Usuario;
   await connection.query(
    "SELECT * FROM listas WHERE ID_Usuario = ?",
    [ID_Usuario],
    (error, results) => {
      if (error) {
        console.log(error);
        return response.status(500).json({ error: "error de servidor" });
      }
      response.status(201).json(results);
    }
  );
};

const postListas = async (request, response) => {
  const {ID_Usuario, Nombre } = request.body;
   await connection.query(
    "SELECT * FROM listas WHERE Nombre = ?",
    [Nombre],
    (error, results) => {
      if (error) {
        console.log(error);
        return response.status(500).json({ error: "error de servidor" });
      }
      if (results.length > 0) {
        response.status(400).json({ error: "El nombre de la lista ya existe" });
      } else {
        connection.query(
          "INSERT INTO listas (ID_Usuario, Nombre) VALUES (?,? )",
          [ID_Usuario, Nombre],
          (error, results) => {
            if (error) {
              console.log(error);
              return response.status(500).json({ error: "Error de servidor" });
            }
            response
              .status(201)
              .json({ "Lista añadida correctamente": results.affectedRows });
          }
        );
      }
    }
  );
};

const updateListas = async (request, response) => {
  const ID_Lista = request.params.ID_Lista;
  const { Nombre } = request.body;
  await connection.query(
    "SELECT COUNT(*) AS count FROM listas WHERE Nombre = ?",
    [Nombre],
    (error, results) => {
      if (error) {
        console.log(error);
        return response.status(500).json({ error: "Error de servidor" });
      }

      const count = results[0].count;

      if (count > 0) {
        return response
          .status(400)
          .json({ error: "El nombre de la lista ya existe" });
      }

      connection.query(
        "UPDATE listas SET Nombre = IFNULL(?, Nombre) WHERE ID_Lista = ?",
        [Nombre, ID_Lista],
        (error, results) => {
          if (error) {
            console.log(error);
            return response.status(500).json({ error: "Error de servidor" });
          }
          response
            .status(201)
            .json({ "Lista editada correctamente": results.affectedRows });
        }
      );
    }
  );
};

const delListas = async (request, response) => {
  const ID_Lista = request.params.ID_Lista;
  await connection.query(
    "DELETE FROM listas WHERE ID_Lista = ?",
    [ID_Lista],
    (error, results) => {
      if (error) {
        console.log(error);
        return response.status(500).json({ error: "Error de servidor" });
      }
      response.status(201).json({ "Lista eliminada": results.affectedRows });
    }
  );
};

export { getListas, getListaByID, getListasbyIDUsuario, postListas, updateListas, delListas };
