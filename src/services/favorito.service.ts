import AppDataSource from "../config/datasource";
import { Favorito } from "../entities/favorito";

const favoritoRepository = AppDataSource.getRepository(Favorito);

export const guardarEnFavoritos = async (fecha: Date, idUsuario: number, idEmpleo: number) => {
    const existe = await favoritoRepository.findOne({
        where: { 
            usuario: { idUsuario }, 
            empleo: { idEmpleo } 
        }
    });
    if (existe) {
        return null; 
    }
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
        relations: ["usuario","empleo", "empleo.empresa"] ,
        select: {
            idFavorito: true,
            fechaGuardado: true,
            usuario: {
                idUsuario: true,
                nombre: true,
                apellidos: true,
                email: true,
                telefono: true
            }
        }
    });
};

export const eliminarDeFavoritos = async (idUsuario: number, idEmpleo: number) => {
    const favorito = await favoritoRepository.findOne({
        where: {
            usuario: { idUsuario: idUsuario },
            empleo: { idEmpleo: idEmpleo }
        }
    });
    if (!favorito) {
        return null;
    }
    return await favoritoRepository.delete({ 
        usuario: { idUsuario: idUsuario }, 
        empleo: { idEmpleo: idEmpleo } 
    });
};