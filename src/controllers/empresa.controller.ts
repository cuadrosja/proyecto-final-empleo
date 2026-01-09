import { Request, Response } from 'express';
import * as empresaService from '../services/empresa.service';
import { BaseResponse } from '../shared/base-response';

export const registrarEmpresa = async (req: Request, res: Response) => {
    try {
        const { nombreEmpresa, email, descripcion, telefono, direccion, logoUrl } = req.body;

        // Validar si el email de la empresa ya existe
        const existe = await empresaService.buscarPorEmail(email);
        if (existe) {
            return res.status(400).json(BaseResponse.error('El email de esta empresa ya está registrado.'));
        }

        const empresa = await empresaService.crearEmpresa( nombreEmpresa, email, descripcion, telefono, direccion, logoUrl);

        return res.status(201).json(BaseResponse.success({
            idEmpresa: empresa.idEmpresa, 
            nombreEmpresa: empresa.nombreEmpresa,
            email: empresa.email,
            descripcion: empresa.descripcion,
            telefono: empresa.telefono,
            direccion: empresa.direccion,
            logoUrl: empresa.logoUrl
        }, 'Empresa registrada con éxito.'));
    } catch (error) {
        console.error(error);
        return res.status(500).json(BaseResponse.error('Error al registrar la empresa.'));
    }
};

export const obtenerEmpresas = async (req: Request, res: Response) => {
    try {
        const empresas = await empresaService.listarEmpresas();
        return res.status(200).json(BaseResponse.success(empresas, 'Lista de empresas obtenida.'));
    } catch (error) {
        return res.status(500).json(BaseResponse.error('Error al obtener empresas.'));
    }
};

export const actualizarEmpresa = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const { nombreEmpresa, email, descripcion, telefono, direccion } = req.body;
        const empresaActualizada = await empresaService.actualizarEmpresa(
            Number(id),
            nombreEmpresa,  
            email,
            descripcion,
            telefono,
            direccion);
        return res.status(200).json(BaseResponse.success(empresaActualizada, 'Empresa actualizada con éxito.'));
    } catch (error) {
        return res.status(500).json(BaseResponse.error('Error al actualizar la empresa.'));
    }   
};

export const eliminarEmpresa = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        await empresaService.eliminarEmpresa(Number(id));
        return res.status(200).json(BaseResponse.success(null, 'Empresa eliminada con éxito.'));
    } catch (error) {
        return res.status(500).json(BaseResponse.error('Error al eliminar la empresa.'));
    }
};