import AppDataSource from "../config/datasource";
import { Empresa } from "../entities/empresa";
import { Empleo } from "../entities/empleo";
import { Categoria } from "../entities/categoria";

export const obtenerDashboardData = async () => {
  const empresaRepo = AppDataSource.getRepository(Empresa);
  const empleoRepo = AppDataSource.getRepository(Empleo);
  const categoriaRepo = AppDataSource.getRepository(Categoria);

  const totalEmpresas = await empresaRepo.count();
  const totalEmpleos = await empleoRepo.count();
  const empleosActivos = await empleoRepo.count({
    where: { estaActivo: true }
  });
  const totalCategorias = await categoriaRepo.count();

  const ultimosEmpleos = await empleoRepo.find({
    relations: { empresa: true, categoria: true },
    order: { fechaPublicacion: "DESC" },
    take: 5,
  });

  return {
    totalEmpresas,
    totalEmpleos,
    empleosActivos,
    totalCategorias,
    ultimosEmpleos,
  };
};
