import "./Header.css";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header>
      <a href="#" className="header-content">
        <img src="Logo1.0.png" alt="logo company" />
        <h2 className="logo-name">LiverLab 3D</h2>
      </a>
      <nav>
        <Link to="/" className="nav-link">Inicio</Link>
        <Link to="/enfermedades" className="nav-link">Enfermedades</Link>
        <Link to="/quiz" className="nav-link">Quiz interactivo</Link>
        <Link to="/sobre-nosotros" className="nav-link">Sobre nosotros</Link>
        <Link to="/registrarse" className="nav-link">Registrarse</Link>
      </nav>
    </header>
  );
};

export default Header;