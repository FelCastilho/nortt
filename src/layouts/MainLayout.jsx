import { NavLink, Outlet } from "react-router-dom";
import "../styles/layout.css";

function MainLayout() {
  return (
    <div className="layout">
      <aside className="sidebar">
        <h1 className="logo">Nortt</h1>

        <nav className="menu">
          <NavLink to="/" end>
            Início
          </NavLink>
          <NavLink to="/calculadora">Calculadora</NavLink>
          <NavLink to="/historico">Histórico</NavLink>
          <NavLink to="/perfil">Perfil</NavLink>
        </nav>

        <div className="sidebar-footer">
          <span className="version">Nortt v1.0.0</span>
        </div>
      </aside>

      <main className="content">
        <Outlet />
      </main>
    </div>
  );
}

export default MainLayout;
