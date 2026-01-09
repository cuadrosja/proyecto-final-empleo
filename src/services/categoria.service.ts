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
  return await categoriaRepository.find({
    order: {
      idCategoria: "ASC", 
    },
  });
};

/* UPDATE */
export const actualizarCategoria = async (
  idCategoria: number,
  nombreCategoria: string
) => {
  const categoria = await categoriaRepository.findOneBy({ idCategoria });

  if (!categoria) {
    throw new Error("Categoría no encontrada");
  }

  categoria.nombreCategoria = nombreCategoria;
  return await categoriaRepository.save(categoria);
};

/* DELETE */
export const eliminarCategoria = async (idCategoria: number) => {
  const categoria = await categoriaRepository.findOneBy({ idCategoria });

  if (!categoria) {
    throw new Error("Categoría no encontrada");
  }

  await categoriaRepository.remove(categoria);
  return true;
};
