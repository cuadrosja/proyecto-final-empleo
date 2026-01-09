import AppDataSource from "../config/datasource";
import { Favorito } from "../entities/favorito";

const favoritoRepository = AppDataSource.getRepository(Favorito);

export const guardarEnFavoritos = async (fecha: Date,idUsuario: number, idEmpleo: number) => {
    const nuevoFav = favoritoRepository.create({
        fechaGuardado: fecha,
        usuario: { idUsuario } as any,
        empleo: { idEmpleo } as any
    });
    return await favoritoRepository.save(nuevoFav);
};

export const listarMisFavoritos = async (idUsuario: number) => {
    return await favoritoRepository.find({
        where: { usuario: { idUsuario: idUsuario } },
        relations: ["usuario","empleo", "empleo.empresa"] 
    });
};

export const eliminarDeFavoritos = async (idFavorito: number) => {
    return await favoritoRepository.delete(idFavorito);
};