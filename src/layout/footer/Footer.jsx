import "./Footer.css";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-left">
        <Link to="/mapa" className="footer-link">Mapa del sitio</Link>
      </div>
      <div className="footer-center">
        Universidad del Valle
      </div>
      <div className="footer-right" /> {/* Espacio vacío para balancear */}
    </footer>
  );
};

export default Footer