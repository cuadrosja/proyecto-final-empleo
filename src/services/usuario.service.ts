
import AppDataSource from "../config/datasource";
import { Usuario } from "../entities/usuario"; // Importamos tu Entidad

const getUsuarioRepository = () => {
    return AppDataSource.getRepository(Usuario);
}

interface InterfaceUsuario {
    nombre: string;
    apellidos: string;
    email: string;
    telefono: string;
    nombreUsuario: string; 
    contrasena: string; 
}

export const buscarPorNombreDeUsuario_Email = async (nombreUsuario: string, email: string): Promise<Usuario | null> => {
    return getUsuarioRepository().findOne({ 
        where: [
            { nombreUsuario: nombreUsuario }, 
            { email: email }      
        ] 
    });
}

export const buscarUsuarioPorNombreDeUsuario = async (nombreUsuario: string): Promise<Usuario | null> => {
    return getUsuarioRepository().findOne({ 
        where: { nombreUsuario: nombreUsuario }
        /* select: [
            "idUsuario", 
            "nombre", 
            "apellidos", 
            "email",
            "telefono",
            "nombreUsuario", 
            "contrasena" 
        ] */
    });
}

export const crearNuevoUsuario = async (data: InterfaceUsuario): Promise<Usuario> => {
    const usuarioRepository = getUsuarioRepository();
    const nuevoUsuario = usuarioRepository.create(data);
    return usuarioRepository.save(nuevoUsuario);
}

export const actualizarUsuario = async (id: number, data: Partial<InterfaceUsuario>): Promise<Usuario | null> => {
    const repo = getUsuarioRepository();
    await repo.update(id, data);
    return repo.findOneBy({ idUsuario: id });
}

export const eliminarUsuario = async (id: number): Promise<void> => {
    await getUsuarioRepository().delete(id);
}

export const listarUsuarios = async (): Promise<Usuario[]> => {
    return getUsuarioRepository().find({
        order: {
            idUsuario: "ASC"
        }
    });
}

