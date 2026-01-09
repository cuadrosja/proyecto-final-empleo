import api from "../api/axios";

/* LISTAR */
export const obtenerEmpleos = async () => {
  const res = await api.get("/empleos");
  return res.data.data;
};

/* CREAR */
export const crearEmpleo = async (empleo) => {
  await api.post("/empleos", empleo);
};

/* ACTUALIZAR */
export const actualizarEmpleo = async (id, empleo) => {
  await api.put(`/empleos/${id}`, empleo);
};

/* ACTIVAR / DESACTIVAR */
export const cambiarEstadoEmpleo = async (id) => {
  await api.put(`/empleos/${id}/estado`);
};
