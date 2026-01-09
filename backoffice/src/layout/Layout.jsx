import { NavLink, useNavigate } from "react-router-dom";

const Layout = ({ children }) => {
  const navigate = useNavigate();

  let usuario = null;

  try {
    const storedUser = localStorage.getItem("usuario");
    if (storedUser && storedUser !== "undefined") {
      usuario = JSON.parse(storedUser);
    }
  } catch (error) {
    console.error("Usuario inválido en localStorage");
    localStorage.removeItem("usuario");
  }

  const logout = () => {
    localStorage.removeItem("usuario");
    navigate("/login");
  };

  return (
    <div className="container-fluid">
      <div className="row min-vh-100">

        <aside className="col-12 col-md-3 col-lg-2 bg-dark text-white p-3 d-flex flex-column">
          <h4 className="text-center mb-4 fw-bold">Back Office</h4>

          <p className="text-center small mb-3">
             {usuario?.nombre}
          </p>

          <ul className="nav flex-column gap-2 flex-grow-1">
            <NavLink to="/dashboard" className="nav-link text-white">
              Dashboard
            </NavLink>
            <NavLink to="/categorias" className="nav-link text-white">
              Categorías
            </NavLink>
            <NavLink to="/empresas" className="nav-link text-white">
              Empresas
            </NavLink>
            <NavLink to="/empleos" className="nav-link text-white">
              Empleos
            </NavLink>
          </ul>

          <button onClick={logout} className="btn btn-outline-light mt-3">
            Cerrar sesión
          </button>
        </aside>

        <main className="col-12 col-md-9 col-lg-10 p-4 bg-light">
          {children}
        </main>

      </div>
    </div>
  );
};

export default Layout;
