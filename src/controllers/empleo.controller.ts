import { Request, Response } from 'express';
import * as empleoService from '../services/empleo.service';
import { BaseResponse } from '../shared/base-response';

export const registrarEmpleo = async (req: Request, res: Response) => {
    try {
        const { tituloEmpleo, puesto, descripcion, modalidad, idEmpresa, idCategoria } = req.body;

        // Nota: Pasamos los IDs como objetos para que TypeORM los relacione
        const empleo = await empleoService.publicarEmpleo(tituloEmpleo,puesto,descripcion,modalidad,idEmpresa, idCategoria);

        return res.status(201).json(BaseResponse.success({
            idEmpleo: empleo.idEmpleo, 
            tituloEmpleo: empleo.tituloEmpleo,
            puesto: empleo.puesto,
            descripcion: empleo.descripcion,
            modalidad: empleo.modalidad,
            idEmpresa: idEmpresa,
            idCategoria: idCategoria
        }, 'Empleo publicado con éxito.'));
    } catch (error) {
        console.error(error);
        return res.status(500).json(BaseResponse.error('Error al publicar el empleo.'));
    }
};

export const obtenerTodosLosEmpleos = async (req: Request, res: Response) => {
    try {
        const empleos = await empleoService.listarEmpleos();
        return res.status(200).json(BaseResponse.success(empleos, 'Lista de empleos obtenida.'));
    } catch (error) {
        return res.status(500).json(BaseResponse.error('Error al obtener los empleos.'));
    }
};