import express from "express";
import cors from "cors";
const app = express();
import rolesRouter from "./routes/roles-route.js";
import usuariosRouter from "./routes/usuarios-route.js"
import tareasRouter from "./routes/tareas-route.js"
import loginRouter from "./routes/login-route.js"


app.use(express.json());
app.use(cors());
app.use(express.urlencoded({extended: true}));
app.use(rolesRouter);
app.use(usuariosRouter);
app.use(tareasRouter);
app.use(loginRouter)

export default app;
