import { Router } from 'express';
import { registrarPostulacion, obtenerMisPostulaciones } from '../controllers/postulacion.controller';

const router = Router();

router.post('/', registrarPostulacion);
router.get('/usuario/:idUsuario', obtenerMisPostulaciones);


export default router;