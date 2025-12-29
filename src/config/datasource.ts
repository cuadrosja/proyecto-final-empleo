
import { DataSource } from "typeorm";
import { Usuario } from "../entities/usuario"; 
import { Categoria } from "../entities/categoria";
import { Empresa } from "../entities/empresa";
import { Empleo } from "../entities/empleo";
import { ExperienciaLaboral } from "../entities/experiencia_laboral";
import { Postulacion } from "../entities/postulacion";
import { Favorito } from "../entities/favorito";

console.log('AppDataSource', {
    type: 'postgres',
    host: process.env.DATABASE_HOST,
    port: Number(process.env.DATABASE_PORT),
    username: process.env.DATABASE_USERNAME,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME})

const AppDataSource = new DataSource({
    type: 'postgres',
    host: process.env.DATABASE_HOST,
    port: Number(process.env.DATABASE_PORT),
    username: process.env.DATABASE_USERNAME,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME,

    entities: [
       Usuario,
       Categoria,
       Empresa,
       Empleo,
       ExperienciaLaboral,
       Postulacion,
       Favorito
    ],
    
    synchronize: false, 
});

export default AppDataSource;