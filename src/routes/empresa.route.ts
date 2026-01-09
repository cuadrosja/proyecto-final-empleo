import { Router } from 'express';
import { registrarEmpresa, obtenerEmpresas, actualizarEmpresa, eliminarEmpresa } from '../controllers/empresa.controller';

const router = Router();

router.post('/', registrarEmpresa);
router.get('/', obtenerEmpresas);
router.put('/:id', actualizarEmpresa);
router.delete('/:id', eliminarEmpresa);
export default router;