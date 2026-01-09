import { useEffect, useState } from "react";
import Layout from "../layout/Layout";
import { listarEmpresas, eliminarEmpresa } from "../services/empresa.service";
import EmpresaTable from "../components/empresas/EmpresaTable";
import EmpresaModal from "../components/empresas/EmpresaModal";
//PAGINADO
import { usePaginatedData } from "../services/usePaginatedData";

const Empresas = () => {
  const [empresas, setEmpresas] = useState([]);
  const [empresaSeleccionada, setEmpresaSeleccionada] = useState(null);
  const [mostrarModal, setMostrarModal] = useState(false);

//PAGINADO
  const {
    datos: Empresa,
    cargando,
    paginaActual,
    setPaginaActual,
    totalPaginas,
    recargar,
  } = usePaginatedData("/empresas", 9); // 9 items por página
  
  const cargarEmpresas = async () => {
    const res = await listarEmpresas();
    setEmpresas(res.data.data);
  };

  useEffect(() => {
    cargarEmpresas();
  }, []);

  const nuevaEmpresa = () => {
    setEmpresaSeleccionada(null);
    setMostrarModal(true);
  };

  const editarEmpresa = (empresa) => {
    setEmpresaSeleccionada(empresa);
    setMostrarModal(true);
  };

  const borrarEmpresa = async (id) => {
    if (!confirm("¿Eliminar empresa?")) return;
    await eliminarEmpresa(id);
    cargarEmpresas() ? recargar() : null;
  };

  return (
    <Layout>
      <div className="d-flex justify-content-between align-items-center mb-4">

        <h1 className="text-2xl font-bold">Empresas</h1>
        <button className="btn btn-primary" onClick={nuevaEmpresa}>
          + Nueva empresa
        </button>

      </div>

      <EmpresaTable
        empresas={Empresa} //PAGINADO
        onEdit={editarEmpresa}
        onDelete={borrarEmpresa}
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
        <EmpresaModal
          empresa={empresaSeleccionada}
          onClose={() => setMostrarModal(false)}
          onSuccess={cargarEmpresas}
        />
      )}
    </Layout>
  );
};

export default Empresas;
