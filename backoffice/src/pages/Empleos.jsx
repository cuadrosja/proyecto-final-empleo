import { useEffect, useState } from "react";
import Layout from "../layout/Layout";
import {
  obtenerEmpleos,
  crearEmpleo,
  actualizarEmpleo,
  cambiarEstadoEmpleo,
} from "../services/empleo.service";
import EmpleosTable from "../components/empleos/EmpleosTable";
import EmpleosModal from "../components/empleos/EmpleosModal";
//PAGINADO
import { usePaginatedData } from "../services/usePaginatedData";

const Empleos = () => {
  const [empleos, setEmpleos] = useState([]);
  const [empleoSeleccionado, setEmpleoSeleccionado] = useState(null);
  const [mostrarModal, setMostrarModal] = useState(false);

  const {
    datos: Empleos,
    cargando,
    paginaActual,
    setPaginaActual,
    totalPaginas,
    recargar,
  } = usePaginatedData("/empleos", 8);

  /* ================= CARGAR ================= */
  const cargarEmpleos = async () => {
    const data = await obtenerEmpleos();
    setEmpleos(data);
  };

  useEffect(() => {
    cargarEmpleos();
  }, []);

  /* ================= NUEVO ================= */
  const nuevoEmpleo = () => {
    setEmpleoSeleccionado(null);
    setMostrarModal(true);
  };

  /* ================= EDITAR ================= */
  const editarEmpleo = (empleo) => {
    setEmpleoSeleccionado(empleo);
    setMostrarModal(true);
    recargar();
  };

  /* ================= ACTIVAR / DESACTIVAR ================= */
  const toggleEstado = async (idEmpleo) => {
    if (!confirm("¿Cambiar estado de este empleo?")) return;
    await cambiarEstadoEmpleo(idEmpleo);
    cargarEmpleos() ? recargar() : null;
  };

  /* ================= GUARDAR ================= */
  const guardar = async (data) => {
    if (empleoSeleccionado) {
      await actualizarEmpleo(empleoSeleccionado.idEmpleo, data);
    } else {
      await crearEmpleo(data);
    }
    setMostrarModal(false);
    cargarEmpleos() ? recargar() : null;
    
  };

  return (
    <Layout>
      <div className="d-flex justify-content-between mb-4">
        <h1 className="fw-bold">Empleos</h1>
        <button className="btn btn-primary" onClick={nuevoEmpleo}>
          + Nuevo empleo
        </button>
      </div>

      <EmpleosTable
        empleos={Empleos}
        onEdit={editarEmpleo}
        onToggle={toggleEstado}
      />


      {/* PAGINADO */}
      <nav>
        <ul className="pagination justify-content-center">
          {Array.from({ length: totalPaginas }).map((_, i) => (
            <li
              key={i}
              className={`page-item ${paginaActual === i + 1 ? "active" : ""}`}
            >
              <button
                className="page-link"
                onClick={() => setPaginaActual(i + 1)}
              >
                {i + 1}
              </button>
            </li>
          ))}
        </ul>
      </nav>


      {mostrarModal && (
        <EmpleosModal
          empleo={empleoSeleccionado}
          onClose={() => setMostrarModal(false)}
          onSuccess={guardar}
        />
      )}
    </Layout>
  );
};

export default Empleos;
