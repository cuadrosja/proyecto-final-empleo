import AppDataSource from "../config/datasource";
import { Empresa } from "../entities/empresa";

const empresaRepository = AppDataSource.getRepository(Empresa);

export const crearEmpresa = async (nombreEmpresa: string, email: string, descripcion: string, telefono: string, direccion: string, logoUrl: string) => {
    const nuevaEmpresa = empresaRepository.create({
        nombreEmpresa: nombreEmpresa,
        email: email,
        descripcion: descripcion,
        telefono: telefono,
        direccion: direccion,
        logoUrl: logoUrl
    });
    return await empresaRepository.save(nuevaEmpresa);
};

export const buscarPorEmail = async (email: string) => {
    return await empresaRepository.findOneBy({ email });
};

export const listarEmpresas = async () => {
    return await empresaRepository.find();
};

export const actualizarEmpresa = async (
  idEmpresa: number,
  nombreEmpresa: string,
  email: string,
  descripcion: string,
  telefono: string,
  direccion: string) => {
  const empresa = await empresaRepository.findOneBy({ idEmpresa });
    if (!empresa) { 
    throw new Error("Empresa no encontrada");
    }
    empresa.nombreEmpresa = nombreEmpresa;
    empresa.email = email;
    empresa.descripcion = descripcion;
    empresa.telefono = telefono;
    empresa.direccion = direccion;
    return await empresaRepository.save(empresa);
    
}

export const eliminarEmpresa = async (idEmpresa: number) => {
  const empresa = await empresaRepository.findOneBy({ idEmpresa });
    if (!empresa) {
    throw new Error("Empresa no encontrada");
    }
    await empresaRepository.remove(empresa);
    return true;
}