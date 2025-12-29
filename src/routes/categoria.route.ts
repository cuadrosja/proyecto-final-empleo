import { Router } from 'express';
import { obtenerCategorias, registrarCategoria } from '../controllers/categoria.controller';

const router = Router();

router.post('/', registrarCategoria);
router.get('/', obtenerCategorias);

export default router;