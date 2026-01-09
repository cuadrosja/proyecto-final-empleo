const EmpleosTable = ({ empleos, onEdit, onToggle }) => {
  return (
    <table className="table table-striped table-hover">
      <thead className="table-dark">
        <tr>
          <th>ID</th>
          <th>Título</th>
          <th>Puesto</th>
          <th>Empresa</th>
          <th>Categoría</th>
          <th>Modalidad</th>
          <th>Estado</th>
          <th>Fecha publicación</th>
          <th style={{ width: 180 }}>Acciones</th>
        </tr>
      </thead>

      <tbody>
        {empleos.map((e) => (
          <tr key={e.idEmpleo}>
            <td>{e.idEmpleo}</td>
            <td>{e.tituloEmpleo}</td>
            <td>{e.puesto}</td>
            <td>{e.empresa?.nombreEmpresa}</td>
            <td>{e.categoria?.nombreCategoria}</td>
            <td>{e.modalidad}</td>

            <td>
              <span
                className={`badge ${
                  e.estaActivo ? "bg-success" : "bg-secondary"
                }`}
              >
                {e.estaActivo ? "Activo" : "Inactivo"}
              </span>
            </td>

            <td>
              {new Date(e.fechaPublicacion).toLocaleDateString()}
            </td>

            <td>
              <button
                className="btn btn-warning btn-sm me-2"
                onClick={() => onEdit(e)}
              >
                Editar
              </button>

              <button
                className={`btn btn-sm ${
                  e.estaActivo ? "btn-danger" : "btn-success"
                }`}
                onClick={() => onToggle(e.idEmpleo)}
              >
                {e.estaActivo ? "Desactivar" : "Activar"}
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default EmpleosTable;
