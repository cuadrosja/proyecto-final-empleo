import { Router } from "express";
import {
  registrarEmpleo,
  obtenerTodosLosEmpleos,
  actualizarEmpleo,
  cambiarEstadoEmpleo,
} from "../controllers/empleo.controller";

const router = Router();

router.post("/", registrarEmpleo);
router.get("/", obtenerTodosLosEmpleos);
router.put("/:id", actualizarEmpleo);
router.put("/:id/estado", cambiarEstadoEmpleo);

export default router;
