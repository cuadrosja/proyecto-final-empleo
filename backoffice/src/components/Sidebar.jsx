import { Link } from "react-router-dom";

export default function Sidebar() {
  return (
    <div className="w-64 h-screen bg-gray-800 text-white p-4">
      <h2 className="text-xl font-bold mb-6">Back Office</h2>

      <nav className="flex flex-col gap-3">
        <Link to="/dashboard">Dashboard</Link>
        <Link to="/categorias">Categorías</Link>
        <Link to="/empresas">Empresas</Link>
        <Link to="/empleos">Empleos</Link>
      </nav>
    </div>
  );
}
