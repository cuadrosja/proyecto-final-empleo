import AppDataSource from "../config/datasource";
import { Categoria } from "../entities/categoria";

const categoriaRepository = AppDataSource.getRepository(Categoria);


export const crearCategoria = async (nombre: string) => {
    const nuevaCategoria = categoriaRepository.create({ 
        nombreCategoria: nombre 
    });
    return await categoriaRepository.save(nuevaCategoria);
};

export const listarCategorias = async () => {
    return await categoriaRepository.find();
};

/* //Muestra las categorias junto con sus empleos relacionados
export const listarCategoriasConEmpleos = async () => {
    return await categoriaRepository.find({
        relations: {
            empleos: true // Aquí es donde TypeORM usa el "puente" que creamos
        }
    });
};
 */