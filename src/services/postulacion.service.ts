import AppDataSource from "../config/datasource";
import { Postulacion } from "../entities/postulacion";

const postulacionRepository = AppDataSource.getRepository(Postulacion);

export const crearPostulacion = async (idUsuario: number, idEmpleo: number) => {
    const nuevaPostulacion = postulacionRepository.create({
        usuario: { idUsuario } as any,
        empleo: { idEmpleo } as any,
        estado: 'Pendiente',
        fechaPostulacion: new Date()
    });
    return await postulacionRepository.save(nuevaPostulacion);
};

export const listarMisPostulaciones = async (idUsuario: number) => {
    return await postulacionRepository.find({
        where: { usuario: { idUsuario } },
        relations: ["usuario","empleo", "empleo.empresa"]
    });
};