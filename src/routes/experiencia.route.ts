import { Router } from 'express';
import { registrarExperiencia, listarExperiencias, actualizarExperiencia, eliminarExperiencia } from '../controllers/experiencia.controller';

const router = Router();

router.post('/', registrarExperiencia);
router.get('/usuario/:idUsuario', listarExperiencias);
router.put('/:id', actualizarExperiencia);
router.delete('/:id', eliminarExperiencia);

export default router;