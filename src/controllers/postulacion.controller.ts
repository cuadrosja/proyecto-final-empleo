import { Request, Response } from 'express';
import * as postulacionService from '../services/postulacion.service';
import { BaseResponse } from '../shared/base-response';

export const registrarPostulacion = async (req: Request, res: Response) => {
    try {
        const { idUsuario, idEmpleo } = req.body;
        const postulacion = await postulacionService.crearPostulacion(idUsuario, idEmpleo);

        if (!postulacion) {
            return res.status(400).json(BaseResponse.error('Ya estás postulado a este empleo.'));
        }
        return res.status(201).json(BaseResponse.success({
            idPostulacion: postulacion.idPostulacion,
            fechaPostulacion: postulacion.fechaPostulacion,
            estado: postulacion.estado,
            idUsuario: idUsuario,
            idEmpleo: idEmpleo
        }, 'Postulación enviada correctamente.'));
    } catch (error: any) {
        console.error("ERROR EN POSTULACION:", error.message);
        return res.status(500).json(BaseResponse.error('Error al procesar postulación.'));
    }
};

export const cancelarPostulacion = async (req: Request, res: Response) => {
    try {
        const { idUsuario, idEmpleo } = req.params; 
        const resultado = await postulacionService.eliminarPostulacion(Number(idUsuario), Number(idEmpleo));
        
        if (!resultado) {
            return res.status(404).json(BaseResponse.error('Esta postulación ya no existe o ya fue eliminada.'));
        }
        return res.status(200).json(BaseResponse.success(null, 'Postulación cancelada correctamente.'));    
    } catch (error: any) {
        console.error("ERROR AL CANCELAR:", error.message);
        return res.status(500).json(BaseResponse.error('Error interno del servidor.'));
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

