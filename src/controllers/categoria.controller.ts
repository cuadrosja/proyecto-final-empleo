import { Request, Response } from 'express';
import * as categoriaService from '../services/categoria.service';
import { BaseResponse } from '../shared/base-response';
import { Categoria } from '../entities/categoria';


export const registrarCategoria = async (req: Request, res: Response) => {
    try {
        const { nombreCategoria } = req.body;
        const resultado = await categoriaService.crearCategoria(
            nombreCategoria
        );

        return res.status(201).json(BaseResponse.success({
            idCategoria: resultado.idCategoria,
            nombreCategoria: resultado.nombreCategoria
        }, 'Categoría creada con éxito.'));
    } catch (error) {
        return res.status(500).json(BaseResponse.error('Error al crear categoría.'));
    }
};

export const obtenerCategorias = async (req: Request, res: Response) => {
    try {
        const categorias = await categoriaService.listarCategorias();
        return res.status(200).json(BaseResponse.success(categorias, 'Categorías obtenidas.'));
    } catch (error) {
        return res.status(500).json(BaseResponse.error('Error al obtener categorías.'));
    }
};