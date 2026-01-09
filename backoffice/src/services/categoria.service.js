import api from "../api/axios";

/* ================= LISTAR ================= */
export const obtenerCategorias = async () => {
  const res = await api.get("/categorias");
  return res.data.data;
};

/* ================= CREAR ================= */
export const crearCategoria = async (nombreCategoria) => {
  const res = await api.post("/categorias", { nombreCategoria });
  return res.data.data;
};

/* ================= ACTUALIZAR ================= */
export const actualizarCategoria = async (id, nombreCategoria) => {
  const res = await api.put(`/categorias/${id}`, { nombreCategoria });
  return res.data.data;
};

/* ================= ELIMINAR ================= */
export const eliminarCategoria = async (id) => {
  const res = await api.delete(`/categorias/${id}`);
  return res.data.data;
};
