import { Router } from 'express';
import { registrarEmpresa, obtenerEmpresas } from '../controllers/empresa.controller';

const router = Router();

router.post('/', registrarEmpresa);
router.get('/', obtenerEmpresas);

export default router;