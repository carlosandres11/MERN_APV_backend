import express from "express";
import {
  agregarPaciente,
  obtenerPacientes,
  obtenerPaciente,
  actualizarPaciente,
  eliminarPaciente,
} from "../controllers/pacienteControllers.js";
import checkAuto from "../middleware/autoMiddleware.js";

const router = express.Router();

router
  .route("/")
  .post(checkAuto, agregarPaciente)
  .get(checkAuto, obtenerPacientes);

router
  .route("/:id")
  .get(checkAuto, obtenerPaciente)
  .put(checkAuto, actualizarPaciente)
  .delete(checkAuto, eliminarPaciente);

export default router;
