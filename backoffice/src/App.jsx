import { Routes, Route, Navigate } from "react-router-dom";
import ProtectedRoute from "./auth/ProtectedRoute";

import Dashboard from "./pages/Dashboard";
import Categorias from "./pages/Categorias";
import Empresas from "./pages/Empresas";
import Empleos from "./pages/Empleos";
import Login from "./pages/Login";
import Register from "./pages/Register";

function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/registro" element={<Register />} />

      <Route path="/" element={<Navigate to="/dashboard" />} />

      <Route path="/dashboard" element={
        <ProtectedRoute>
          <Dashboard />
        </ProtectedRoute>
      } />

      <Route path="/categorias" element={
        <ProtectedRoute>
          <Categorias />
        </ProtectedRoute>
      } />

      <Route path="/empresas" element={
        <ProtectedRoute>
          <Empresas />
        </ProtectedRoute>
      } />

      <Route path="/empleos" element={
        <ProtectedRoute>
          <Empleos />
        </ProtectedRoute>
      } />
    </Routes>
  );
}

export default App;
