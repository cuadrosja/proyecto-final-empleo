import { Request, Response } from 'express';
import * as experienciaService from '../services/experiencia.service';
import { BaseResponse } from '../shared/base-response';


export const registrarExperiencia = async (req: Request, res: Response) => {
    try {
        const { nombreEmpresa, puestoOcupado, descripcionTareas, fechaInicio, fechaFin, trabajoActual, idUsuario } = req.body;

        // LLAMADA ESTILO FAVORITO: Sin llaves { }, parámetros directos
        const experiencia = await experienciaService.agregarExperiencia(nombreEmpresa,puestoOcupado,descripcionTareas,fechaInicio,fechaFin,trabajoActual,idUsuario);

        return res.status(201).json(BaseResponse.success({
            idExperiencia: experiencia.idExperiencia,
            nombreEmpresa: experiencia.nombreEmpresa,
            puestoOcupado: experiencia.puestoOcupado,
            descripcionTareas: experiencia.descripcionTareas,
            fechaInicio: experiencia.fechaInicio,
            fechaFin: experiencia.fechaFin,
            trabajoActual: experiencia.trabajoActual,
            idUsuario: idUsuario
        }, 'Experiencia laboral agregada correctamente.'));

    } catch (error) {
        console.error("ERROR EN EXPERIENCIA:", error);
        return res.status(500).json(BaseResponse.error('Error al registrar la experiencia.'));
    }
};

export const listarExperiencias = async (req: Request, res: Response) => {
    try {
        const { idUsuario } = req.params;
        const lista = await experienciaService.obtenerExperienciaPorUsuario(Number(idUsuario));
        return res.status(200).json(BaseResponse.success(lista, 'CV obtenido.'));
    } catch (error) {
        return res.status(500).json(BaseResponse.error('Error al obtener experiencias.'));
    }
};