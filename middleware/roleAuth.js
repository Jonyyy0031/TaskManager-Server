import { verifyToken } from "../helpers/generateToken.js";
import { connection } from "../config/config.js";

const checkRoleAuth = (IDRol) => async (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ').pop();
        const tokenData = await verifyToken(token);
        
        const query = `SELECT * FROM usuarios WHERE ID_Usuario = ?`;
        connection.query(query, [tokenData.ID_Usuario], async (error, results, fields) => {
            if (error) {
                console.log(error);
                return res.status(500).send({ error: 'Error del servidor' });;
            }

            if (results.length === 0) {
                res.status(404).send({ error: 'Usuario no encontrado' });
                return;
            }

            const userData = results[0];

            if (userData.ID_Rol === IDRol) {
                next();
            } else {
                res.status(403).send({ error: 'No tienes permisos' });
            }
        });
    } catch (e) {
        console.log(e);
        res.status(500).send({ error: 'Error interno del servidor' });
    }
};

export { checkRoleAuth };
