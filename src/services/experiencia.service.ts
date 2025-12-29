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
        order: { fechaInicio: "ASC" },
        relations: ["usuario"]
    });
};

export const modificarExperiencia = async (idExperiencia: number, nombreEmpresa: string, puestoOcupado: string, descripcionTareas: string, fechaInicio: string, fechaFin: string, trabajoActual: boolean) => {
    
    // 1. Buscar la experiencia
    const experiencia = await experienciaRepository.findOneBy({ idExperiencia });

    if (experiencia) {
        // 2. Asignar los nuevos valores
        experiencia.nombreEmpresa = nombreEmpresa;
        experiencia.puestoOcupado = puestoOcupado;
        experiencia.descripcionTareas = descripcionTareas;
        experiencia.fechaInicio = fechaInicio;
        experiencia.fechaFin = fechaFin;
        experiencia.trabajoActual = trabajoActual;

        // 3. Guardar los cambios (TypeORM hace el UPDATE aquí)
        return await experienciaRepository.save(experiencia);
    }
    throw new Error();
};

export const borrarExperiencia = async (idExperiencia: number) => {
    const resultado = await experienciaRepository.delete({ idExperiencia });
    return resultado.affected && resultado.affected > 0;
};