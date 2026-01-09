const EmpresaTable = ({ empresas, onEdit, onDelete }) => {
  return (
    <div className="bg-white rounded shadow overflow-x-auto">
      <table className="min-w-full">
        <thead className="bg-gray-200">
          <tr>
            <th className="px-4 py-2">Nombre</th>
            <th className="px-4 py-2">Email</th>
            <th className="px-4 py-2">Teléfono</th>
            <th className="px-4 py-2">Dirección</th>
            <th className="px-4 py-2">Descripción</th>
            <th className="px-4 py-2 text-center">Acciones</th>
          </tr>
        </thead>

        <tbody>
          {empresas.map((emp) => (
            <tr key={emp.idEmpresa} className="border-t hover:bg-gray-100">
              <td className="px-4 py-2">{emp.nombreEmpresa}</td>
              <td className="px-4 py-2">{emp.email}</td>
              <td className="px-4 py-2">{emp.telefono}</td>
              <td className="px-4 py-2">{emp.direccion}</td>
              <td className="px-4 py-2">{emp.descripcion}</td>
              
              <td className="px-4 py-2 text-center space-x-2">
                <button
                  onClick={() => onEdit(emp)}
                  className="btn btn-sm btn-warning me-2"
                >
                  Editar
                </button>
                <button
                  onClick={() => onDelete(emp.idEmpresa)}
                  className="btn btn-sm btn-danger"
                >
                  Eliminar
                </button>
              </td>
            </tr>
          ))}

          {empresas.length === 0 && (
            <tr>
              <td colSpan="7" className="text-center py-4 text-gray-500">
                No hay empresas registradas
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default EmpresaTable;
