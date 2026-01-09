    import api from "../api/axios";

/* ================= REGISTRO ================= */
export const registrarUsuario = async (usuario) => {
  const res = await api.post("/usuarios/registrar", usuario);
  return res.data.data;
};

/* ================= LOGIN ================= */
export const loginUsuario = async (credenciales) => {
  const res = await api.post("/usuarios/login", credenciales);
  return res.data.data;
};

/* ================= LISTAR ================= */
export const obtenerUsuarios = async () => {
  const res = await api.get("/usuarios");
  return res.data.data;
};

/* ================= ACTUALIZAR PERFIL ================= */
export const actualizarPerfil = async (id, datos) => {
  const res = await api.put(`/usuarios/${id}`, datos);
  return res.data.data;
};

/* ================= ELIMINAR ================= */
export const eliminarCuenta = async (id) => {
  const res = await api.delete(`/usuarios/${id}`);
  return res.data.data;
};

/* ================= RECUPERAR PASSWORD ================= */
export const recuperarContrasena = async (data) => {
  const res = await api.patch("/usuarios/recuperar-password", data);
  return res.data.data;
};
