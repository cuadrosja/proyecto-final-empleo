import AppDataSource from "../config/datasource";
import { Empleo } from "../entities/empleo";

const empleoRepository = AppDataSource.getRepository(Empleo);

export const publicarEmpleo = async (tituloEmpleo: string, puesto: string, descripcion: string, modalidad: string, idEmpresa: number, idCategoria: number) => {
    const nuevoEmpleo = empleoRepository.create({
        tituloEmpleo: tituloEmpleo,
        puesto: puesto,
        descripcion: descripcion,
        modalidad: modalidad,
        empresa: { idEmpresa } as any, 
        categoria: { idCategoria } as any 
    });
    return await empleoRepository.save(nuevoEmpleo);
};

export const listarEmpleos = async () => {
    // Usamos 'relations' para traer los datos de la Empresa y Categoría asociados
    return await empleoRepository.find({
        relations: ["empresa", "categoria"],
        where: { estaActivo: true }
    });
};