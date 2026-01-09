import AppDataSource from "../config/datasource";
import { Empleo } from "../entities/empleo";
import { Empresa } from "../entities/empresa";
import { Categoria } from "../entities/categoria";

const empleoRepo = AppDataSource.getRepository(Empleo);
const empresaRepo = AppDataSource.getRepository(Empresa);
const categoriaRepo = AppDataSource.getRepository(Categoria);

/* ================= CREAR ================= */
export const publicarEmpleo = async (
  tituloEmpleo: string,
  puesto: string,
  descripcion: string,
  modalidad: string,
  nombreEmpresa: string,
  nombreCategoria: string
) => {
  const empresa = await empresaRepo.findOneBy({ nombreEmpresa });
  if (!empresa) throw new Error("Empresa no encontrada");

  const categoria = await categoriaRepo.findOneBy({ nombreCategoria });
  if (!categoria) throw new Error("Categoría no encontrada");

  const empleo = empleoRepo.create({
    tituloEmpleo,
    puesto,
    descripcion,
    modalidad,
    empresa,
    categoria,
  });

  return await empleoRepo.save(empleo);
};


/* ================= LISTAR ================= */
export const listarEmpleos = async () => {
  return await empleoRepo.find({
    relations: {
      empresa: true,
      categoria: true,
    },
    order: {
      idEmpleo: "ASC",
    },
  });
};

/* ================= ACTUALIZAR ================= */
export const actualizarEmpleo = async (
  idEmpleo: number,
  data: {
    tituloEmpleo?: string;
    puesto?: string;
    descripcion?: string;
    modalidad?: string;
    idEmpresa?: number;
    idCategoria?: number;
  }
) => {
  const empleo = await empleoRepo.findOne({
    where: { idEmpleo },
    relations: { empresa: true, categoria: true },
  });

  if (!empleo) throw new Error("Empleo no encontrado");

  if (data.tituloEmpleo) empleo.tituloEmpleo = data.tituloEmpleo;
  if (data.puesto) empleo.puesto = data.puesto;
  if (data.descripcion) empleo.descripcion = data.descripcion;
  if (data.modalidad) empleo.modalidad = data.modalidad;

  if (data.idEmpresa) {
    const empresa = await empresaRepo.findOne({
      where: { idEmpresa: data.idEmpresa },
    });
    if (!empresa) throw new Error("Empresa no encontrada");
    empleo.empresa = empresa;
  }

  if (data.idCategoria) {
    const categoria = await categoriaRepo.findOne({
      where: { idCategoria: data.idCategoria },
    });
    if (!categoria) throw new Error("Categoría no encontrada");
    empleo.categoria = categoria;
  }

  return await empleoRepo.save(empleo);
};


/* ================= ELIMINAR ================= */
export const cambiarEstado = async (idEmpleo: number) => {
  const empleo = await empleoRepo.findOne({
    where: { idEmpleo },
  });

  if (!empleo) throw new Error("Empleo no encontrado");

  empleo.estaActivo = !empleo.estaActivo;

  return await empleoRepo.save(empleo);
};


