import "./Header.css";

const Header = () => {
   return( 
    <header>
        <a href="#" className="header-content">
            <img src="Logo1.0.png"  alt="logo company" />
            <h2 className="logo-name">MTP3D </h2>
        </a>
        <nav>
            <a href="" className="nav-link">Inicio</a>
            <a href="" className="nav-link">Sobre nosotros</a>
            <a href="" className="nav-link">Contacto</a>
        </nav>
    </header>
   );
};

export  default Header;