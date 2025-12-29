import { Router } from 'express';
import { registrarEmpleo, obtenerTodosLosEmpleos } from '../controllers/empleo.controller';

const router = Router();

router.post('/', registrarEmpleo);
router.get('/', obtenerTodosLosEmpleos);

export default router;