import { Request, Response } from "express";
import { obtenerDashboardData } from "../services/dashboard.service";
import { BaseResponse } from "../shared/base-response";

export const dashboard = async (_req: Request, res: Response) => {
  try {
    const data = await obtenerDashboardData();
    return res.status(200).json(
      BaseResponse.success(data, "Datos del dashboard")
    );
  } catch (error) {
    return res.status(500).json(
      BaseResponse.error("Error al cargar dashboard")
    );
  }
};
