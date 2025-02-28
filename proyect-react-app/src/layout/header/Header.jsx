import "./Header.css";

const Header = () => {
   return( 
    <header>
        <a href="#" class="header-content">
            <img src="Logo1.0.png"  alt="logo company" />
            <h2 class="logo-name">MTP3D </h2>
        </a>
        <nav>
            <a href="" class="nav-link">Inicio</a>
            <a href="" class="nav-link">Sobre nosotros</a>
            <a href="" class="nav-link">Contacto</a>
        </nav>
    </header>
   );
};

export  default Header;