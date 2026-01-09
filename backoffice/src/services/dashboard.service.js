import api from "../api/axios";

export const obtenerDashboard = async () => {
  const res = await api.get("/dashboard");
  return res.data.data;
};
