import { Router } from 'express';
import { registrarFavorito, obtenerFavoritos, eliminarFavorito } from '../controllers/favorito.controller';

const router = Router();

router.post('/', registrarFavorito);
router.get('/usuario/:idUsuario', obtenerFavoritos);
router.delete('/usuario/:idUsuario/empleo/:idEmpleo', eliminarFavorito);

export default router;
