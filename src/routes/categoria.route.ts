import { Router } from 'express';
import { obtenerCategorias, registrarCategoria, actualizarCategoria, eliminarCategoria } from '../controllers/categoria.controller';

const router = Router();

router.post('/', registrarCategoria);
router.get('/', obtenerCategorias);
router.put("/:id", actualizarCategoria);
router.delete("/:id", eliminarCategoria);
export default router;