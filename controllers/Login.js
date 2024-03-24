// Importa los módulos necesarios
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import { connection } from "../config/config.js";

dotenv.config();

const login = (req, res) => {
  const { email, password } = req.body;
  connection.query(
    "SELECT usuarios.*, roles.Nombre FROM usuarios INNER JOIN roles ON usuarios.ID_Rol = roles.ID_Rol WHERE email = ?",
    [email],
    (error, results) => {
      if (error) {
        console.log(error);
        return res.status(500).json({ error: "Error de servidor" });
      }

      if (results.length === 0) {
        return res.status(401).json({ error: "Credenciales inválidas" });
      }

      const user = results[0];

      if (password === user.Password) {
        const token = jwt.sign(
          { ID_Usuario: user.ID_Usuario, email: user.email },
          "tu_secreto",
          { expiresIn: "1h" }
        );
        return res.status(200).json({ token, ID_Rol: user.ID_Rol });
      } else {
        return res.status(401).json({ error: "Credenciales inválidas" });
      }
    }
  );
};

export { login };
