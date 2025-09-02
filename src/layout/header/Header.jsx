import "./Header.css";
import { Link } from "react-router-dom";
import logo from "../../assets/LiverLab3dLogo.png"; // Importa la imagen del logo desde la carpeta de assets

const Header = () => {
  return (
    <header>
      <a href="#" className="header-content">
      <Link to="/" className="nav-link"><img src={logo} alt="logo company" /></Link>
        <Link to="/" className="nav-link"><h2 className="logo-name">LiverLab 3D</h2></Link>
      </a>
      <nav>
        <Link to="/" className="nav-link">Inicio</Link>
        <Link to="/enfermedades" className="nav-link">Enfermedades</Link>
        <Link to="/quiz" className="nav-link">Quiz interactivo</Link>
        <Link to="/sobre-nosotros" className="nav-link">Sobre nosotros</Link>
        <Link to="/registrarse" className="nav-link">Iniciar sesion</Link>
      </nav>
    </header>
  );
};

export default Header;