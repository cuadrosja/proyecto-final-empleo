import { Request, Response } from 'express';
import * as postulacionService from '../services/postulacion.service';
import { BaseResponse } from '../shared/base-response';

export const registrarPostulacion = async (req: Request, res: Response) => {
    try {
        const { idUsuario, idEmpleo } = req.body;
        const postulacion = await postulacionService.crearPostulacion(idUsuario, idEmpleo);
        
        return res.status(201).json(BaseResponse.success({
            idPostulacion: postulacion.idPostulacion,
            fechaPostulacion: postulacion.fechaPostulacion,
            estado: postulacion.estado,
            idUsuario: idUsuario,
            idEmpleo: idEmpleo
        }, 'Postulación enviada correctamente.'));
    } catch (error) {
        console.error("ERROR EN POSTULACION:", error);
        return res.status(500).json(BaseResponse.error('Error al procesar postulación.'));
    }
};

export const obtenerMisPostulaciones = async (req: Request, res: Response) => {
    try {
        const { idUsuario } = req.params;
        const lista = await postulacionService.listarMisPostulaciones(Number(idUsuario));
        return res.status(200).json(BaseResponse.success(lista, 'Historial de postulaciones obtenido.'));
    } catch (error) {
        return res.status(500).json(BaseResponse.error('Error al obtener historial.'));
    }
};