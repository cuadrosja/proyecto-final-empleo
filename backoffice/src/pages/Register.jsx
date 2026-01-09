import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { registrarUsuario } from "../services/usuario.service";

const Register = () => {
  const [form, setForm] = useState({
    nombre: "",
    apellidos: "",
    email: "",
    telefono: "",
    nombreUsuario: "",
    contrasena: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await registrarUsuario(form);
    navigate("/login");
  };

  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <div className="card p-4 shadow" style={{ width: 400 }}>
        <h4 className="text-center mb-3">Registro</h4>

        <form onSubmit={handleSubmit}>
          {Object.keys(form).map((campo) => (
            <input
              key={campo}
              name={campo}
              placeholder={campo}
              className="form-control mb-2"
              onChange={handleChange}
              required
            />
          ))}

          <button className="btn btn-success w-100">
            Registrarse
          </button>
        </form>

        <p className="text-center mt-3 small">
          ¿Ya tienes cuenta? <Link to="/login">Inicia sesión</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
