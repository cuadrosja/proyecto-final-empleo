import { useEffect, useState } from "react";
import { obtenerEmpresas } from "../../services/empresa.service";
import { obtenerCategorias } from "../../services/categoria.service";

const EmpleosModal = ({ empleo, onClose, onSuccess }) => {
  const [empresas, setEmpresas] = useState([]);
  const [categorias, setCategorias] = useState([]);

  const [form, setForm] = useState({
    tituloEmpleo: "",
    puesto: "",
    descripcion: "",
    modalidad: "Remoto",
    idEmpresa: "",
    idCategoria: "",
  });

  /* ================= CARGAR EMPRESAS Y CATEGORÍAS ================= */
  useEffect(() => {
    obtenerEmpresas().then(setEmpresas);
    obtenerCategorias().then(setCategorias);
  }, []);

  /* ================= SI ES EDICIÓN ================= */
  useEffect(() => {
    if (empleo) {
      setForm({
        tituloEmpleo: empleo.tituloEmpleo,
        puesto: empleo.puesto,
        descripcion: empleo.descripcion,
        modalidad: empleo.modalidad,
        idEmpresa: empleo.empresa.idEmpresa,
        idCategoria: empleo.categoria.idCategoria,
      });
    }
  }, [empleo]);

  /* ================= CHANGE ================= */
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  /* ================= GUARDAR ================= */
  const guardar = () => {
    if (
      !form.tituloEmpleo ||
      !form.puesto ||
      !form.idEmpresa ||
      !form.idCategoria
    ) {
      alert("Complete todos los campos obligatorios");
      return;
    }

    onSuccess(form);
  };

  return (
    <>
      {/* BACKDROP */}
      <div className="modal-backdrop fade show"></div>

      {/* MODAL */}
      <div className="modal fade show d-block">
        <div className="modal-dialog modal-lg modal-dialog-centered">
          <div className="modal-content">

            <div className="modal-header bg-primary text-white">
              <h5 className="modal-title">
                {empleo ? "Editar empleo" : "Nuevo empleo"}
              </h5>
              <button className="btn-close btn-close-white" onClick={onClose} />
            </div>

            <div className="modal-body">
              <input
                className="form-control mb-2"
                name="tituloEmpleo"
                placeholder="Título del empleo"
                value={form.tituloEmpleo}
                onChange={handleChange}
              />

              <input
                className="form-control mb-2"
                name="puesto"
                placeholder="Puesto"
                value={form.puesto}
                onChange={handleChange}
              />

              <textarea
                className="form-control mb-2"
                name="descripcion"
                placeholder="Descripción"
                value={form.descripcion}
                onChange={handleChange}
              />

              {/* EMPRESA */}
              <select
                className="form-select mb-2"
                name="idEmpresa"
                value={form.idEmpresa}
                onChange={handleChange}
              >
                <option value="">Seleccione empresa</option>
                {empresas.map((e) => (
                  <option key={e.idEmpresa} value={e.idEmpresa}>
                    {e.nombreEmpresa}
                  </option>
                ))}
              </select>

              {/* CATEGORÍA */}
              <select
                className="form-select mb-2"
                name="idCategoria"
                value={form.idCategoria}
                onChange={handleChange}
              >
                <option value="">Seleccione categoría</option>
                {categorias.map((c) => (
                  <option key={c.idCategoria} value={c.idCategoria}>
                    {c.nombreCategoria}
                  </option>
                ))}
              </select>

              {/* MODALIDAD */}
              <select
                className="form-select"
                name="modalidad"
                value={form.modalidad}
                onChange={handleChange}
              >
                <option value="Remoto">Remoto</option>
                <option value="Presencial">Presencial</option>
                <option value="Híbrido">Híbrido</option>
              </select>
            </div>

            <div className="modal-footer">
              <button className="btn btn-secondary" onClick={onClose}>
                Cancelar
              </button>
              <button className="btn btn-success" onClick={guardar}>
                Guardar
              </button>
            </div>

          </div>
        </div>
      </div>
    </>
  );
};

export default EmpleosModal;
