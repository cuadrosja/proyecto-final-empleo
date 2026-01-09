
import { Router } from 'express';
import { loginUsuario, registrarUsuario, actualizarPerfil, eliminarCuenta, obtenerUsuarios,recuperarContrasena } from '../controllers/usuario.controller'; 

const router = Router();

router.post('/login', loginUsuario);
router.post('/registrar', registrarUsuario);
router.put('/:id', actualizarPerfil);    
router.delete('/:id', eliminarCuenta);
router.get('/', obtenerUsuarios);

router.patch('/recuperar-password', recuperarContrasena);


export default router;