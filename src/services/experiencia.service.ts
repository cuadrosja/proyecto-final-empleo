import AppDataSource from "../config/datasource";
import { ExperienciaLaboral } from "../entities/experiencia_laboral";

const experienciaRepository = AppDataSource.getRepository(ExperienciaLaboral);

export const agregarExperiencia = async (nombreEmpresa: string,puestoOcupado: string,descripcionTareas: string,fechaInicio: string,fechaFin: string,trabajoActual: boolean,idUsuario: number) => {
    const nuevaExp = experienciaRepository.create({
        nombreEmpresa: nombreEmpresa,
        puestoOcupado: puestoOcupado,
        descripcionTareas: descripcionTareas,
        fechaInicio: fechaInicio,
        fechaFin: fechaFin,
        trabajoActual: trabajoActual,
        usuario: { idUsuario } as any 
    });

    return await experienciaRepository.save(nuevaExp);
};

export const obtenerExperienciaPorUsuario = async (idUsuario: number) => {
    return await experienciaRepository.find({
        where: { usuario: { idUsuario: idUsuario } },
        order: { fechaInicio: "DESC" },
        relations: ["usuario"]
    });
};