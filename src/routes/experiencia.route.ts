import { Router } from 'express';
import { registrarExperiencia, listarExperiencias } from '../controllers/experiencia.controller';

const router = Router();

router.post('/', registrarExperiencia);
router.get('/usuario/:idUsuario', listarExperiencias);

export default router;