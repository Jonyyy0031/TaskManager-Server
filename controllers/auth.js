import dotenv from "dotenv";
import { tokenSign } from "../helpers/generateToken.js";
import { connection } from "../config/config.js";
import { encrypt, compare } from "../helpers/handleBcrypt.js";

dotenv.config();

const login = async (req, res) => {
  const { email, password } = req.body;
  await connection.query(
    "SELECT usuarios.*, roles.Nombre FROM usuarios INNER JOIN roles ON usuarios.ID_Rol = roles.ID_Rol WHERE email = ?",
    [email],
    async (error, results) => {
      if (error) {
        console.log(error);
        return res.status(500).json({ error: "Error de servidor" });
      }

      if (results.length === 0) {
        return res.status(401).json({ error: "Credenciales inválidas" });
      }

      const user = results[0];

      const checkPassword = await compare(password, user.Password);
      const tokenSession = await tokenSign(user);

      if (checkPassword) {
        return res.status(200).json({data: user, tokenSession});
      } else {
        return res.status(401).json({ error: "Credenciales inválidas" });
      }
    }
  );
};


  const register = async (request, response) => {
    const { username, email, password } = request.body;
    const ID_Rol = 1;
    const fechareg = new Date().toISOString().slice(0, 10);
    const hashpassword = await encrypt(password);
    await connection.query(
      "SELECT * FROM usuarios WHERE Username = ? OR Email = ?",
      [username, email],
      (error, results) => {
        if (error) {
          console.log(error);
          return response.status(500).json({ error: "Error de servidor" });
        }
        if (results.length > 0) {
          const existingUser = results.find((user) => user.Username === username);
          if (existingUser) {
            return response
              .status(400)
              .json({ error: "El nombre de usuario ya está en uso" });
          } else {
            return response
              .status(400)
              .json({ error: "El correo electrónico ya está en uso" });
          }
        } else {
          connection.query(
            "INSERT INTO usuarios (ID_Rol, username, email, password, fechareg) VALUES (?, ?, ?, ?, ?)",
            [ID_Rol, username, email, hashpassword, fechareg],
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
  
  export { login, register };