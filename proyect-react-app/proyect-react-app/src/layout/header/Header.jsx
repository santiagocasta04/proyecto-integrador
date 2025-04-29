import "./Header.css";
import { Link } from "react-router-dom";

const Header = () => {
   return( 
    <header>
        <a href="#" class="header-content">
            <img src="Logo1.0.png"  alt="logo company" />
            <h2 class="logo-name">LiverLab 3D </h2>
        </a>
        <nav>
            <a href="" class="nav-link">Inicio</a>
            <a href="" class="nav-link">Enfermedades</a>
            <a href="" class="nav-link">Quiz interactivo</a>
            <a href="" class="nav-link">Sobre nosotros</a>
            <a href="" class="nav-link">Registrarse</a>
            
        </nav>
    </header>
   );
};

export  default Header;