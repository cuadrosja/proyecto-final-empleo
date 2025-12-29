import { Router } from 'express';
import { registrarPostulacion, obtenerMisPostulaciones, cancelarPostulacion } from '../controllers/postulacion.controller';

const router = Router();

router.post('/', registrarPostulacion);
router.get('/usuario/:idUsuario', obtenerMisPostulaciones);
router.delete('/usuario/:idUsuario/empleo/:idEmpleo', cancelarPostulacion);

export default router;