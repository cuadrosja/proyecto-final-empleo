import { Request, Response } from "express";
import * as empleoService from "../services/empleo.service";
import { BaseResponse } from "../shared/base-response";

/* ================= CREAR ================= */
export const registrarEmpleo = async (req: Request, res: Response) => {
  try {
    const {
      tituloEmpleo,
      puesto,
      descripcion,
      modalidad,
      empresa,
      categoria,
    } = req.body;

    const empleo = await empleoService.publicarEmpleo(
      tituloEmpleo,
      puesto,
      descripcion,
      modalidad,
      empresa,
      categoria
    );

    return res.status(201).json(
      BaseResponse.success(empleo, "Empleo publicado con éxito.")
    );
  } catch (error: any) {
    return res.status(400).json(
      BaseResponse.error(error.message)
    );
  }
};

/* ================= LISTAR ================= */
export const obtenerTodosLosEmpleos = async (req: Request, res: Response) => {
  try {
    const empleos = await empleoService.listarEmpleos();
    return res.status(200).json(
      BaseResponse.success(empleos, "Lista de empleos obtenida.")
    );
  } catch (error) {
    return res.status(500).json(
      BaseResponse.error("Error al obtener los empleos.")
    );
  }
};

/* ================= ACTUALIZAR ================= */
export const actualizarEmpleo = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    //
    await empleoService.actualizarEmpleo(Number(id), req.body);
    const empleo = await empleoService.actualizarEmpleo(
      Number(id),
      req.body
    );
    return res.status(200).json(
      BaseResponse.success(empleo, "Empleo actualizado con éxito.")
    );
  } catch (error: any) {
    return res.status(400).json(
      BaseResponse.error(error.message)
    );
  }
};

/* ================= ELIMINAR ================= */
export const cambiarEstadoEmpleo = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const empleo = await empleoService.cambiarEstado(Number(id));

    return res.status(200).json(
      BaseResponse.success(empleo, "Estado del empleo actualizado.")
    );
  } catch (error: any) {
    return res.status(400).json(
      BaseResponse.error(error.message)
    );
  }
};


