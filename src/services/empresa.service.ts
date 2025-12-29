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