import React, { Suspense, useRef, useState, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, useGLTF, PerspectiveCamera } from "@react-three/drei";
import "./liverCirrhosis.css";
import Title from "../texts/Title";
import Staging from "../home/staging/Staging";
import Person from "../../modelos-3d/Person";
import StagingFatty from "../home/staging/Stagingfatty";

import { Link } from "react-router-dom";

function LiverCirrhosisModel() {
  const { scene } = useGLTF("/models/liver-cancer.glb");
  const modelRef = useRef();

  useEffect(() => {
    if (scene) {
      scene.traverse((child) => {
        if (child.isMesh) {
          child.castShadow = true;
          child.receiveShadow = true;
        }
      });
    }
  }, [scene]);

  useFrame(() => {
    if (modelRef.current) {
      modelRef.current.rotation.y += 0.005;
    }
  });

  return (
    <primitive ref={modelRef} object={scene} scale={20} position={[0, 1, 0]} />
  );
}

function LiverModel() {
  const { scene } = useGLTF("/models/Liver.glb");
  const modelRef = useRef();
  const [isAnimating, setIsAnimating] = useState(true);

  useEffect(() => {
    if (scene) {
      scene.traverse((child) => {
        if (child.isMesh) {
          child.castShadow = true;
          child.receiveShadow = true;
        }
      });
    }
  }, [scene]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key.toLowerCase() === "d") {
        setIsAnimating((prev) => !prev);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  useFrame((state) => {
    if (!isAnimating || !modelRef.current) return;
    const t = state.clock.getElapsedTime();
    modelRef.current.rotation.y += 0.005;
    modelRef.current.position.y = 1 + Math.sin(t) * 0.2;
  });

  return (
    <primitive ref={modelRef} object={scene} scale={1} position={[0, 1, 0]} />
  );
}

function HealthyLiverModel() {
  const { scene } = useGLTF("/models/healty-liver.glb");
  const modelRef = useRef();
  const [isAnimating, setIsAnimating] = useState(true);

  useEffect(() => {
    if (scene) {
      scene.traverse((child) => {
        if (child.isMesh) {
          child.castShadow = true;
          child.receiveShadow = true;
        }
      });
    }
  }, [scene]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key.toLowerCase() === "p") {
        setIsAnimating((prev) => !prev);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  useFrame(() => {
    if (modelRef.current && isAnimating) {
      modelRef.current.rotation.y += 0.005;
    }
  });

  return (
    <primitive ref={modelRef} object={scene} scale={10} position={[0, 1, 0]} />
  );
}

export default function LiverCirrhosisSection() {
  const [mostrarArticulo, setMostrarArticulo] = useState(false);
  const [mostrarCausas, setMostrarCausas] = useState(false);
  const [mostrarEfectos, setMostrarEfectos] = useState(false);
  const [mostrarPrevencion, setMostrarPrevencion] = useState(false);

  const toggleArticulo = () => setMostrarArticulo((prev) => !prev);
  const toggleCausas = () => setMostrarCausas((prev) => !prev);
  const toggleEfectos = () => setMostrarEfectos((prev) => !prev);
  const togglePrevencion = () => setMostrarPrevencion((prev) => !prev);

  return (
    <div className="seccion-principal">
      <div className="texto-contenedor">
        {/* ¿Qué es? */}
        <div className={`articulo ${mostrarArticulo ? "expandido" : ""}`}>
          <h1 className="toggle-title" onClick={toggleArticulo}>
            ¿Qué es?
            <span className="icon-container">
              <img
                src={
                  mostrarArticulo
                    ? "/icons/arrow-up.png"
                    : "/icons/arrow-down.png"
                }
                alt="Toggle"
                className="toggle-icon"
              />
            </span>
          </h1>
          <div
            className={`expandible-container ${
              mostrarArticulo ? "activo" : ""
            }`}
          >
            <article>
              <p className="text">
                La cirrosis hepática es una enfermedad crónica que daña
                progresivamente el hígado, reemplazando el tejido sano por
                tejido cicatricial que impide su funcionamiento normal. Esto
                afecta funciones vitales como la desintoxicación de la sangre,
                la producción de proteínas y el almacenamiento de nutrientes.
                Sus causas más comunes incluyen el consumo excesivo de alcohol,
                la hepatitis B o C, el hígado graso no alcohólico, trastornos
                hereditarios y el uso prolongado de medicamentos tóxicos. A
                medida que avanza, la cirrosis puede provocar fatiga, ictericia,
                hinchazón abdominal, sangrados, confusión mental y aumentar el
                riesgo de cáncer de hígado. Aunque puede ser silenciosa en sus
                primeras etapas, sin tratamiento puede ser mortal. Por eso, la
                prevención y el diagnóstico temprano son esenciales para
                proteger la salud hepática.
              </p>
            </article>
            <div className="model-viewer">
              <Canvas
                shadows
                camera={{ position: [0, 0, 5] }}
                style={{ background: "transparent" }}
              >
                <spotLight
                  position={[4, 4, 2]}
                  color={"yellow"}
                  angle={Math.PI / 14}
                  penumbra={1}
                  distance={25}
                  intensity={1000}
                />
                <ambientLight intensity={0.5} />
                <directionalLight
                  color="white"
                  position={[5, 10, 5]}
                  intensity={2}
                  castShadow
                  shadow-mapSize-width={1024}
                  shadow-mapSize-height={1024}
                />
                <StagingFatty />
                <Suspense fallback={null}>
                  <LiverCirrhosisModel />
                </Suspense>
                <OrbitControls enableZoom={false} />
                <mesh
                  rotation={[-Math.PI / 2, 0, 0]}
                  receiveShadow
                  castShadow
                  position={[0, -1.5, 0]}
                >
                  <circleGeometry args={[8, 64]} />
                  <shadowMaterial opacity={0.3} />
                  <meshStandardMaterial
                    roughness={0.8}
                    metalness={0.5}
                    color="#5A2634"
                  />
                </mesh>
                <Title title="Cirrosis Hepática" mode="html" />
                <Title title="Interactua usando el raton " mode="text3d" />
              </Canvas>
            </div>
          </div>
        </div>

        {/* Causas y síntomas */}
        <div className={`articulo ${mostrarCausas ? "expandido" : ""}`}>
          <h1 className="toggle-title" onClick={toggleCausas}>
            Causas y síntomas
            <span className="icon-container">
              <img
                src={
                  mostrarCausas
                    ? "/icons/arrow-up.png"
                    : "/icons/arrow-down.png"
                }
                alt="Toggle"
                className="toggle-icon"
              />
            </span>
          </h1>
          <div
            className={`expandible-container ${mostrarCausas ? "activo" : ""}`}
          >
            <article>
              <p className="text">
                Los síntomas comunes de la cirrosis incluyen fatiga, pérdida de
                apetito, ictericia (piel amarilla), hinchazón abdominal,
                sangrados fáciles, picazón en la piel y cansancio. A medida que
                la enfermedad avanza, puede generar complicaciones graves como
                acumulación de líquidos, encefalopatía hepática y sangrado
                interno.
              </p>
            </article>
            <div className="model-viewer">
              <Canvas shadows style={{ background: "transparent" }}>
                <PerspectiveCamera makeDefault fov={80} position={[0, 1, 3]} />
                <ambientLight intensity={0.5} />
                <directionalLight
                  color="white"
                  position={[5, 10, 5]}
                  intensity={2}
                  castShadow
                  shadow-mapSize-width={1024}
                  shadow-mapSize-height={1024}
                />
                <Staging />
                <Suspense fallback={null}>
                  <Person />
                </Suspense>
                <OrbitControls
                  enableZoom={false}
                  enableRotate={false}
                  maxDistance={5}
                />
                <mesh
                  rotation={[-Math.PI / 2, 0, 0]}
                  receiveShadow
                  castShadow
                  position={[0, 0, 0]}
                >
                  <circleGeometry args={[4, 16]} />
                  <shadowMaterial opacity={0.3} />
                  <meshStandardMaterial
                    roughness={1}
                    metalness={0.5}
                    color="#5A2634"
                  />
                </mesh>
                <Title title="Haz click para bostezar" fontSize={0.4} />
              </Canvas>
            </div>
          </div>
        </div>

        {/* Tratamiento */}
        <div className={`articulo ${mostrarEfectos ? "expandido" : ""}`}>
          <h1 className="toggle-title" onClick={toggleEfectos}>
            Tratamiento
            <span className="icon-container">
              <img
                src={
                  mostrarEfectos
                    ? "/icons/arrow-up.png"
                    : "/icons/arrow-down.png"
                }
                alt="Toggle"
                className="toggle-icon"
              />
            </span>
          </h1>
          <div
            className={`expandible-container ${mostrarEfectos ? "activo" : ""}`}
          >
            <article>
              <p className="text">
                La cirrosis se trata controlando su causa (como hepatitis o
                alcohol), aliviando síntomas con medicamentos, y previniendo
                complicaciones. En casos avanzados puede requerir trasplante de
                hígado. También se pueden usar terapias complementarias como
                dieta saludable, ejercicio, meditación o apoyo psicológico,
                siempre con supervisión médica.
              </p>
            </article>
            <div className="model-viewer">
              <Canvas shadows style={{ background: "transparent" }}>
                <PerspectiveCamera makeDefault fov={80} position={[0, 1, 3]} />
                <ambientLight intensity={0.5} />
                <directionalLight
                  color="white"
                  position={[5, 10, 5]}
                  intensity={2}
                  castShadow
                  shadow-mapSize-width={1024}
                  shadow-mapSize-height={1024}
                />
                <Staging />
                <Suspense fallback={null}>
                  <LiverModel />
                </Suspense>
                <OrbitControls
                  enableZoom={false}
                  enableRotate={false}
                  maxDistance={5}
                />
                <mesh
                  rotation={[-Math.PI / 2, 0, 0]}
                  receiveShadow
                  castShadow
                  position={[0, 0, 0]}
                >
                  <circleGeometry args={[4, 16]} />
                  <shadowMaterial opacity={0.3} />
                  <meshStandardMaterial
                    roughness={1}
                    metalness={0.5}
                    color="#5A2634"
                  />
                </mesh>
                <Title
                  title="Escucha un testimonio presionando la tecla 's'"
                  fontSize={0.2}
                />
                <Title
                  title="Pulsa 'd' para detener o reanudar la animacion"
                  mode="html"
                  position={[0, -1, -1]}
                />
              </Canvas>
            </div>
          </div>
        </div>

        {/* Prevención */}
        <div className={`articulo ${mostrarPrevencion ? "expandido" : ""}`}>
          <h1 className="toggle-title" onClick={togglePrevencion}>
            Prevención
            <span className="icon-container">
              <img
                src={
                  mostrarPrevencion
                    ? "/icons/arrow-up.png"
                    : "/icons/arrow-down.png"
                }
                alt="Toggle"
                className="toggle-icon"
              />
            </span>
          </h1>
          <div
            className={`expandible-container ${
              mostrarPrevencion ? "activo" : ""
            }`}
          >
            <article>
              <p className="text">
                Para prevenir la cirrosis hepática, adopta hábitos saludables
                como una alimentación balanceada, evitar el consumo excesivo de
                alcohol, mantener un peso adecuado, vacunarte contra la
                hepatitis, hacer ejercicio regularmente, evitar la
                automedicación y realizar chequeos médicos periódicos. Cuidar tu
                hígado es clave para una vida larga y saludable.
              </p>
            </article>
            <div className="model-viewer">
              <Canvas shadows style={{ background: "transparent" }}>
                <PerspectiveCamera makeDefault fov={80} position={[0, 1.7, 3]} />
                <ambientLight intensity={0.5} />
                <directionalLight
                  color="white"
                  position={[5, 10, 5]}
                  intensity={2}
                  castShadow
                  shadow-mapSize-width={1024}
                  shadow-mapSize-height={1024}
                />
                <Staging />
                <Suspense fallback={null}>
                  <HealthyLiverModel />
                </Suspense>
                <OrbitControls
                  enableZoom={false}
                  enableRotate={false}
                  maxDistance={5}
                />
                <mesh
                  rotation={[-Math.PI / 2, 0, 0]}
                  receiveShadow
                  castShadow
                  position={[0, 0, 0]}
                >
                  <circleGeometry args={[4, 16]} />
                  <shadowMaterial opacity={0.3} />
                  <meshStandardMaterial
                    roughness={1}
                    metalness={0.5}
                    color="#5A2634"
                  />
                </mesh>
                <Title
                  title="Pulsa 'p' para pausar o reanudar la animación"
                  fontSize={0.2}
                />

                <Title
                  title="¡La prevención es la mejor medicina!"
                  mode="html"
                  position={[0, -1, -1]}
                />
              </Canvas>
            </div>
          </div>
        </div>
      </div>

      <div className="contenedor-links">
        <Link to="/higadograso" className="btn-anterior">
          Anterior enfermedad
        </Link>
        <Link to="/hepatitis-alcohólica" className="btn-anterior">
          Siguiente enfermedad
        </Link>
      </div>
    </div>
  );
}
