import express from "express";
import cors from "cors";
import rolesRouter from "./routes/roles-route.js";
import usuariosRouter from "./routes/usuarios-route.js";
import tareasRouter from "./routes/tareas-route.js";
import authRouter from "./routes/auth.js"
import listasRouter from "./routes/listas-route.js";

const app = express();

app.use(express.json());
app.use(cors());
app.use(express.urlencoded({extended: true}));

app.use(rolesRouter);
app.use(usuariosRouter);
app.use(listasRouter);
app.use(tareasRouter);
app.use(authRouter);

export default app;
