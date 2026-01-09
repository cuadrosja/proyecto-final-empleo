import { useEffect, useState } from "react";
import { crearEmpresa, actualizarEmpresa } from "../../services/empresa.service";

const EmpresaModal = ({ empresa, onClose, onSuccess }) => {
  const [form, setForm] = useState({
    nombreEmpresa: "",
    email: "",
    telefono: "",
    direccion: "",
    descripcion: "",
  });

  const [error, setError] = useState("");

  useEffect(() => {
    if (empresa) {
      setForm({
        nombreEmpresa: empresa.nombreEmpresa || "",
        email: empresa.email || "",
        telefono: empresa.telefono || "",
        direccion: empresa.direccion || "",
        descripcion: empresa.descripcion || "",
      });
    }
  }, [empresa]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError(""); // limpia error al escribir
  };

  const emailValido = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const guardar = async () => {
    if (!form.nombreEmpresa || !form.email) {
      setError("Nombre y email son obligatorios.");
      return;
    }

    if (!emailValido(form.email)) {
      setError("El email debe tener un formato válido (ej: empresa@email.com)");
      return;
    }

    try {
      if (empresa) {
        await actualizarEmpresa(empresa.idEmpresa, form);
      } else {
        await crearEmpresa(form);
      }

      onSuccess();
      onClose();
    } catch (err) {
      setError("Ocurrió un error al guardar la empresa.");
    }
  };

  return (
    <>
      {/* BACKDROP */}
      <div className="modal-backdrop fade show"></div>

      {/* MODAL */}
      <div className="modal fade show d-block" tabIndex="-1">
        <div className="modal-dialog modal-lg modal-dialog-centered">
          <div className="modal-content">

            <div className="modal-header bg-primary text-white">
              <h5 className="modal-title">
                {empresa ? "Editar empresa" : "Nueva empresa"}
              </h5>
              <button
                type="button"
                className="btn-close btn-close-white"
                onClick={onClose}
              />
            </div>

            <div className="modal-body">
              {error && (
                <div className="alert alert-danger py-2">{error}</div>
              )}

              <div className="row">
                <div className="col-md-6 mb-3">
                  <label className="form-label">Nombre *</label>
                  <input
                    className="form-control"
                    name="nombreEmpresa"
                    value={form.nombreEmpresa}
                    onChange={handleChange}
                  />
                </div>

                <div className="col-md-6 mb-3">
                  <label className="form-label">Email *</label>
                  <input
                    className="form-control"
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="row">
                <div className="col-md-6 mb-3">
                  <label className="form-label">Teléfono</label>
                  <input
                    className="form-control"
                    name="telefono"
                    value={form.telefono}
                    onChange={handleChange}
                  />
                </div>

                <div className="col-md-6 mb-3">
                  <label className="form-label">Dirección</label>
                  <input
                    className="form-control"
                    name="direccion"
                    value={form.direccion}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="mb-3">
                <label className="form-label">Descripción</label>
                <textarea
                  className="form-control"
                  rows="3"
                  name="descripcion"
                  value={form.descripcion}
                  onChange={handleChange}
                />
              </div>
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

export default EmpresaModal;
