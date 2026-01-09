import { Request, Response } from 'express';
import * as bcrypt from 'bcryptjs';
import { Usuario } from '../entities/usuario';
import * as usuarioService from "../services/usuario.service";
import { BaseResponse } from '../shared/base-response';

import jwt from "jsonwebtoken";

export const registrarUsuario = async (req: Request, res: Response) => {

    const { nombre, apellidos, email, telefono, nombreUsuario, contrasena } = req.body;
    try {
        const usuarioExiste = await usuarioService.buscarPorNombreDeUsuario_Email(nombreUsuario, email);
        if (usuarioExiste) {
            return res.status(400).json(BaseResponse.error('El nombre de usuario o email ya están registrados.'));
        }
        
        const salt = await bcrypt.genSalt(10);
        const hashedContrasena = await bcrypt.hash(contrasena, salt);
        const nuevoUsuario = await usuarioService.crearNuevoUsuario({
            nombre,
            apellidos,
            email,
            telefono,
            nombreUsuario,
            contrasena: hashedContrasena
        });

        return res.status(201).json(BaseResponse.success({
            idUsuario: nuevoUsuario.idUsuario,
            nombre: nuevoUsuario.nombre,
            usuario: nuevoUsuario.nombreUsuario
        }, 'Registro de usuario exitoso.'));

    } catch (error) {
        console.error("Error al registrar usuario:", error);
        return res.status(500).json(BaseResponse.error('Error interno del servidor al registrar.'));
    }
};


export const loginUsuario = async (req: Request, res: Response) => {
  const { nombreUsuario, contrasena } = req.body;

  try {
    const user = await usuarioService.buscarUsuarioPorNombreDeUsuario(nombreUsuario);

    if (!user) {
      return res.status(401).json(BaseResponse.error("Usuario o contraseña incorrectos"));
    }

    const ok = await bcrypt.compare(contrasena, user.contrasena);
    if (!ok) {
      return res.status(401).json(BaseResponse.error("Usuario o contraseña incorrectos"));
    }

    return res.status(200).json(
      BaseResponse.success(
        {
          idUsuario: user.idUsuario,
          nombre: user.nombre,
          nombreUsuario: user.nombreUsuario,
        },
        "Inicio de sesión exitoso"
      )
    );

  } catch (error) {
    return res.status(500).json(BaseResponse.error("Error al iniciar sesión"));
  }
};


export const actualizarPerfil = async (req: Request, res: Response) => {
    const { id } = req.params;
    const datosActualizar = req.body;

    try {
        // SI el usuario envió una nueva contraseña, hay que encriptarla
        if (datosActualizar.contrasena) {
            datosActualizar.contrasena = await bcrypt.hash(datosActualizar.contrasena, 10);
        }

        const usuarioActualizado = await usuarioService.actualizarUsuario(Number(id), datosActualizar);

        if (usuarioActualizado) {
            delete usuarioActualizado.contrasena;
        }
        return res.status(200).json(BaseResponse.success(usuarioActualizado, 'Perfil actualizado.'));
    } catch (error) {
        console.error("Error al actualizar:", error);
        return res.status(500).json(BaseResponse.error('Error al actualizar.'));
    }
};

export const eliminarCuenta = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        await usuarioService.eliminarUsuario(Number(id));
        return res.status(200).json(BaseResponse.success(null, 'Usuario eliminado correctamente.'));
    } catch (error) {
        return res.status(500).json(BaseResponse.error('Error al eliminar cuenta.'));
    }
};

export const obtenerUsuarios = async (req: Request, res: Response) => {
    try {
        const usuarios = await usuarioService.listarUsuarios();

        // Opcional: Eliminar la contraseña del objeto antes de enviarlo por seguridad
        const listaSegura = usuarios.map(u => {
            const { contrasena, ...datos } = u;
            return datos;
        });

        return res.status(200).json(BaseResponse.success(listaSegura, 'Lista de usuarios obtenida.'));
    } catch (error) {
        console.error("Error al listar usuarios:", error);
        return res.status(500).json(BaseResponse.error('Error al obtener la lista de usuarios.'));
    }
};


export const recuperarContrasena = async (req: Request, res: Response) => {
    try {
        const { email, nuevaContrasena } = req.body;
        const usuario = await usuarioService.buscarPorNombreDeUsuario_Email("", email);

        if (!usuario) {
            return res.status(404).json(BaseResponse.error('El correo no está registrado.'));
        }

        const salt = await bcrypt.genSalt(10);
        const contrasenaEncriptada = await bcrypt.hash(nuevaContrasena, salt);

        await usuarioService.actualizarUsuario(usuario.idUsuario, {
            contrasena: contrasenaEncriptada
        });

        return res.status(200).json(BaseResponse.success(null, 'Contraseña restablecida con éxito.'));

    } catch (error) {
        return res.status(500).json(BaseResponse.error('Error al procesar la solicitud.'));
    }
};
