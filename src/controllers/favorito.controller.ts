import { Request, Response } from 'express';
import * as favoritoService from '../services/favorito.service';
import { BaseResponse } from '../shared/base-response';
import { Favorito } from '../entities/favorito'; 

export const registrarFavorito = async (req: Request, res: Response) => {
    try {
        const { idUsuario, idEmpleo } = req.body;
        const fechaActual = new Date();
        const favorito = await favoritoService.guardarEnFavoritos(fechaActual, idUsuario, idEmpleo);

        if (!favorito) {
            return res.status(400).json(BaseResponse.error('Este empleo ya está en tus favoritos.'));
        }
        return res.status(201).json(BaseResponse.success({
            idFavorito: favorito.idFavorito, 
            fechaGuardado: favorito.fechaGuardado,
            idUsuario: idUsuario,
            idEmpleo: idEmpleo
        }, 'Empleo guardado en favoritos.'));
    } catch (error) {
        return res.status(500).json(BaseResponse.error('Error al guardar en favoritos.'));
    }
};

export const obtenerFavoritos = async (req: Request, res: Response) => {
    try {
        const { idUsuario } = req.params;
        const lista = await favoritoService.listarMisFavoritos(Number(idUsuario));
        return res.status(200).json(BaseResponse.success(lista, 'Favoritos obtenidos.'));
    } catch (error) {
        return res.status(500).json(BaseResponse.error('Error al obtener favoritos.'));
    }
};

export const eliminarFavorito = async (req: Request, res: Response) => {
    try {
        const { idUsuario, idEmpleo } = req.params;
        const resultado = await favoritoService.eliminarDeFavoritos(Number(idUsuario), Number(idEmpleo));
        if (!resultado) {
            return res.status(404).json(BaseResponse.error('Este favorito ya no existe o ya fue eliminado.'));
        }
        return res.status(200).json(BaseResponse.success(null, 'Favorito eliminado correctamente.'));
    } catch (error) {
        console.error("Error al eliminar favorito:", error);
        return res.status(500).json(BaseResponse.error('Error interno del servidor al intentar eliminar.'));
    }
};