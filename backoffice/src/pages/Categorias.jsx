import { useEffect, useState } from "react";
import Layout from "../layout/Layout";
import api from "../api/axios";
import CategoriesTable from "../components/categorias/CategoriesTable";
import CategoriesModal from "../components/categorias/CategoriesModal";
//PAGINADO
import { usePaginatedData } from "../services/usePaginatedData";

const Categorias = () => {
  const [categorias, setCategorias] = useState([]);
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState(null);
  const [mostrarModal, setMostrarModal] = useState(false);
  //PAGINADO
  const {
    datos: Categorias,
    cargando,
    paginaActual,
    setPaginaActual,
    totalPaginas,
    recargar,
  } = usePaginatedData("/categorias", 9); // 9 items por página

  const cargarCategorias = async () => {
    const res = await api.get("/categorias");
    setCategorias(res.data.data);
  };



  useEffect(() => {
    cargarCategorias();
  }, []);

  const nuevaCategoria = () => {
    setCategoriaSeleccionada(null);
    setMostrarModal(true);
  };

  const editarCategoria = (categoria) => {
    setCategoriaSeleccionada(categoria);
    setMostrarModal(true);
  };

  const eliminarCategoria = async (id) => {
    if (!confirm("¿Eliminar esta categoría?")) return;
    await api.delete(`/categorias/${id}`);
    //PAGINADO
    cargarCategorias() ? recargar() : null;
  };

  const guardarCategoria = async (nombreCategoria) => {
    if (!nombreCategoria.trim()) return;

    if (categoriaSeleccionada) {
      await api.put(`/categorias/${categoriaSeleccionada.idCategoria}`, {
        nombreCategoria,
      });
    } else {
      await api.post("/categorias", { nombreCategoria });
    }

    setMostrarModal(false);
    cargarCategorias();
  };

  return (
    <Layout>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1 className="fw-bold">Categorías</h1>
        <button className="btn btn-primary" onClick={nuevaCategoria}>
          + Nueva categoría
        </button>
      </div>

      <CategoriesTable
        categorias={Categorias}
        onEdit={editarCategoria}
        onDelete={eliminarCategoria}
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
        <CategoriesModal
          categoria={categoriaSeleccionada}
          onClose={() => setMostrarModal(false)}
          onSuccess={guardarCategoria}
        />
      )}
    </Layout>
  );
};

export default Categorias;
