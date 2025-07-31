import "./mapa.css";

export default function MapaSection() {
  return (
    <section id="mapa-del-sitio">
      <h2>Mapa del Sitio</h2>
      <nav>
        <ul>
          <li><a href="/">Inicio</a></li>

          <li>
            <a href="/enfermedades">Enfermedades</a>
            <ul className="subenlaces">
              <li><a href="/higadograso">Hígado Graso</a></li>
              <li><a href="/cirrosishepatica">Cirrosis</a></li>
              <li><a href="/hepatitis-alcohólica">Hepatitis Alcohólica</a></li>
            </ul>
          </li>

          <li><a href="/quiz">Quiz interactivo</a></li>
          <li><a href="/sobre-nosotros">Sobre nosotros</a></li>
          <li><a href="/contacto.html">Iniciar Sesión</a></li>
        </ul>
      </nav>
    </section>
  );
}