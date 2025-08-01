import "./Footer.css";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-left">
        <Link to="/mapa" className="footer-text">Mapa del sitio</Link>
      </div>
      <div className="footer-center">
        Universidad del Valle
      </div>
      <div className="footer-right">
        <span className="copyright">
          © {new Date().getFullYear()} LiverLab3D
        </span>
      </div>
    </footer>
  );
};

export default Footer;
