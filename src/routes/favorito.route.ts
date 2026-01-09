import { Router } from 'express';
import { registrarFavorito, obtenerFavoritos } from '../controllers/favorito.controller';

const router = Router();

router.post('/', registrarFavorito);
router.get('/usuario/:idUsuario', obtenerFavoritos);

export default router;
