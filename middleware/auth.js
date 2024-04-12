import { verifyToken } from "../helpers/generateToken.js";

const checkAuth = async (req, res, next) => {
    if (req.headers.authorization) {
        const token = req.headers.authorization.split(' ').pop();
        const tokenData = await verifyToken(token);
        if (tokenData == null){
            return res.status(404).json({error: "Token no encontrado"})
        }
            if (tokenData.ID_Usuario) {
                next();
            } else {
                res.status(409).json({ error: "Acceso no autorizado" });
            }
        
    } else {
        res.status(401).json({ error: "Falta el encabezado de autorizacion" });
    }
};

export { checkAuth };
