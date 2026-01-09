import { useEffect, useState } from "react";

const CategoriesModal = ({ categoria, onClose, onSuccess }) => {
  const [nombreCategoria, setNombreCategoria] = useState("");

  useEffect(() => {
    if (categoria) {
      setNombreCategoria(categoria.nombreCategoria);
    } else {
      setNombreCategoria("");
    }
  }, [categoria]);

  const guardar = () => {
    if (!nombreCategoria.trim()) return;

    onSuccess(nombreCategoria);
    onClose();
  };

  return (
    <>
      {/* Backdrop */}
      <div className="modal-backdrop fade show"></div>

      {/* Modal */}
      <div className="modal fade show d-block" tabIndex="-1" role="dialog">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">

            <div className="modal-header bg-primary text-white">
              <h5 className="modal-title">
                {categoria ? "Editar categoría" : "Nueva categoría"}
              </h5>
              <button
                type="button"
                className="btn-close btn-close-white"
                onClick={onClose}
              ></button>
            </div>

            <div className="modal-body">
              <input
                type="text"
                className="form-control"
                placeholder="Nombre de categoría"
                value={nombreCategoria}
                onChange={(e) => setNombreCategoria(e.target.value)}
              />
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

export default CategoriesModal;
