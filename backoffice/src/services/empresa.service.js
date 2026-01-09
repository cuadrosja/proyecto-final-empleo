import api from "../api/axios";

/* CREATE */
export const crearEmpresa = (data) => {
  return api.post("/empresas", data);
};
export const obtenerEmpresas = async () => {
  const res = await api.get("/empresas");
  return res.data.data;
};
/* READ */
export const listarEmpresas = () => {
  return api.get("/empresas");
};

/* UPDATE */
export const actualizarEmpresa = (id, data) => {
  return api.put(`/empresas/${id}`, data);
};

/* DELETE */
export const eliminarEmpresa = (id) => {
  return api.delete(`/empresas/${id}`);
};
