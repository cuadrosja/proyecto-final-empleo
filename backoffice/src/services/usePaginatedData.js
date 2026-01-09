import { useState, useEffect } from "react";
import api from "../api/axios"; // tu instancia axios

export const usePaginatedData = (endpoint, itemsPorPagina = 5) => {
  const [datos, setDatos] = useState([]);
  const [paginaActual, setPaginaActual] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const [cargando, setCargando] = useState(false);

  const cargarDatos = async () => {
    setCargando(true);
    try {
      const res = await api.get(endpoint);
      setDatos(res.data.data);
      setTotalItems(res.data.data.length);
    } catch (error) {
      console.error("Error cargando datos:", error);
    } finally {
      setCargando(false);
    }
  };

  useEffect(() => {
    cargarDatos();
  }, [endpoint]);

  // Datos de la página actual
  const indiceUltimoItem = paginaActual * itemsPorPagina;
  const indicePrimerItem = indiceUltimoItem - itemsPorPagina;
  const datosPaginados = datos.slice(indicePrimerItem, indiceUltimoItem);

  const totalPaginas = Math.ceil(totalItems / itemsPorPagina);

  return {
    datos: datosPaginados,
    cargando,
    paginaActual,
    setPaginaActual,
    totalPaginas,
    recargar: cargarDatos, // para recargar datos desde el padre
  };
};
