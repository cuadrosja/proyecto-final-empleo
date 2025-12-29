import AppDataSource from "../config/datasource";
import { Postulacion } from "../entities/postulacion";

const postulacionRepository = AppDataSource.getRepository(Postulacion);

export const crearPostulacion = async (idUsuario: number, idEmpleo: number) => {
    // 1. Verificar si ya existe una postulación activa
    const existe = await postulacionRepository.findOne({
        where: { 
            usuario: { idUsuario }, 
            empleo: { idEmpleo } 
        }
    });

    if (existe) {
       return null;
    }

    // 2. Si no existe, crearla normalmente
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
        relations: ["usuario","empleo", "empleo.empresa"],
        order: {
            idPostulacion: "asc" 
        }
    });
};

export const eliminarPostulacion = async (idUsuario: number, idEmpleo: number) => {
    const postulacion = await postulacionRepository.findOne({
        where: {
            usuario: { idUsuario: idUsuario },
            empleo: { idEmpleo: idEmpleo }
        }
    });
    if (!postulacion) {
      return null;
    }
    const resultado = await postulacionRepository.delete(postulacion.idPostulacion);
    return resultado;
};