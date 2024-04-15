import jwt from "jsonwebtoken"

const tokenSign = async (user) => {
    return jwt.sign(
        {
            ID_Usuario: user.ID_Usuario,
            ID_Rol: user.ID_Rol,
            imagen: user.Imagen,
        },
        process.env.JWT_SECRET,
        {
            expiresIn: "1h",
        }
    );
}

const verifyToken = async (token) =>{
    try {
        return jwt.verify(token, process.env.JWT_SECRET)
    } catch (error) {
        return null
    }
}

export {
    tokenSign,
    verifyToken,
}