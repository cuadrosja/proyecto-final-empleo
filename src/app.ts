import 'dotenv/config'
import express, { Application, json } from "express";

import usuarioRouter from './routes/usuario.route';
import categoriaRouter from './routes/categoria.route';
import empresaRouter from './routes/empresa.route'; 
import empleoRouter from './routes/empleo.route';
import postulacionRouter from './routes/postulacion.route';
import experienciaRouter from './routes/experiencia.route';
import favoritoRouter from './routes/favorito.route';
import dashboardRouter from "./routes/dashboard.route";

import cors from "cors";
import dotenv from "dotenv";

const app: Application = express();

dotenv.config();
app.use(cors());

app.use(json());

app.use("/api/v1/dashboard", dashboardRouter);
app.use('/api/v1/usuarios', usuarioRouter);
app.use('/api/v1/categorias', categoriaRouter);
app.use('/api/v1/empresas', empresaRouter);
app.use('/api/v1/empleos', empleoRouter);
app.use('/api/v1/postulaciones', postulacionRouter);
app.use('/api/v1/experiencias', experienciaRouter);
app.use('/api/v1/favoritos', favoritoRouter);


export default app;
