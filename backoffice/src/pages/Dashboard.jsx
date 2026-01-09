import { useEffect, useState } from "react";
import Layout from "../layout/Layout";
import { obtenerDashboard } from "../services/dashboard.service";

const Dashboard = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    obtenerDashboard().then(setData);
  }, []);

  if (!data) return <Layout>Cargando...</Layout>;

  return (
    <Layout>
      <h1 className="fw-bold mb-4">Dashboard</h1>

      {/* CARDS */}
      <div className="row g-4 mb-4">
        <Card title="Empresas" value={data.totalEmpresas} />
        <Card title="Empleos" value={data.totalEmpleos} />
        <Card title="Empleos Activos" value={data.empleosActivos} />
        <Card title="Categorías" value={data.totalCategorias} />
      </div>

      {/* ÚLTIMOS EMPLEOS */}
      <div className="card">
        <div className="card-header fw-bold">Últimos empleos</div>
        <div className="card-body">
          <table className="table">
            <thead>
              <tr>
                <th>Título</th>
                <th>Empresa</th>
                <th>Categoría</th>
                <th>Fecha</th>
              </tr>
            </thead>
            <tbody>
              {data.ultimosEmpleos.map((e) => (
                <tr key={e.idEmpleo}>
                  <td>{e.tituloEmpleo}</td>
                  <td>{e.empresa.nombreEmpresa}</td>
                  <td>{e.categoria.nombreCategoria}</td>
                  <td>{new Date(e.fechaPublicacion).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </Layout>
  );
};

const Card = ({ title, value }) => (
  <div className="col-md-3">
    <div className="card shadow-sm">
      <div className="card-body text-center">
        <h6 className="text-muted">{title}</h6>
        <h2 className="fw-bold">{value}</h2>
      </div>
    </div>
  </div>
);

export default Dashboard;
