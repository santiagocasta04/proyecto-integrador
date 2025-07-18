import React, { Suspense, useRef, useState, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, useGLTF, PerspectiveCamera } from "@react-three/drei";
import "./liverCirrhosis.css";
import Title from "../texts/Title";
import Staging from "../home/staging/Staging";
import Person from "../../modelos-3d/Person";

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

  // Escuchar la tecla "D"
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key.toLowerCase() === "d") {
        setIsAnimating((prev) => !prev);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Animación de rotación y flotación
  useFrame((state) => {
    if (!isAnimating || !modelRef.current) return;

    const t = state.clock.getElapsedTime();
    modelRef.current.rotation.y += 0.005; // Rotación suave
    modelRef.current.position.y = 1 + Math.sin(t) * 0.2; // Flotación
  });

  return (
    <primitive ref={modelRef} object={scene} scale={1} position={[0, 1, 0]} />
  );
}





export default function LiverCirrhosisSection() {
  const [mostrarArticulo, setMostrarArticulo] = useState(false);
  const [mostrarCausas, setMostrarCausas] = useState(false);
  const [mostrarEfectos, setMostrarEfectos] = useState(false);

  const toggleArticulo = () => setMostrarArticulo((prev) => !prev);
  const toggleCausas = () => setMostrarCausas((prev) => !prev);
  const toggleEfectos = () => setMostrarEfectos((prev) => !prev);

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
                La cirrosis hepática es una enfermedad crónica e irreversible
                del hígado caracterizada por la sustitución del tejido sano por
                tejido cicatricial, lo que altera su estructura y función. Este
                daño progresivo afecta la capacidad del hígado para realizar
                funciones vitales como depurar toxinas, producir proteínas y
                regular procesos metabólicos, pudiendo causar complicaciones
                graves como insuficiencia hepática e hipertensión portal.
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
                <Title title="Cirrosis Hepática" mode = "html" />
                <Title title="Interactua usando el raton " mode="text3d"/>
                /* recuerda usar el mode html par que se use la parte de html,
                no es necesario para la version de text */
              </Canvas>
            </div>
          </div>
        </div>

        {/* Causas */}
        <div className={`articulo1 ${mostrarCausas ? "expandido" : ""}`}>
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
                Las principales causas de la cirrosis incluyen el consumo
                excesivo de alcohol, hepatitis crónicas B y C, enfermedad por
                hígado graso no alcohólico, trastornos autoinmunes, enfermedades
                genéticas como hemocromatosis y enfermedad de Wilson, y el uso
                prolongado de fármacos hepatotóxicos. Sus síntomas más
                frecuentes son fatiga, debilidad, pérdida de peso, falta de
                apetito, ictericia (color amarillento en piel y ojos), hinchazón
                abdominal (ascitis), edema en piernas, facilidad para sangrar o
                presentar hematomas, picazón en la piel, confusión o somnolencia
                (encefalopatía hepática) y presencia de arañas vasculares en la
                piel.
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

        {/* Efectos */}
        <div className={`articulo2 ${mostrarEfectos ? "expandido" : ""}`}>
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
                El tratamiento de la cirrosis se enfoca en detener o ralentizar
                el daño hepático, controlar los síntomas y prevenir
                complicaciones. Entre los tratamientos médicos convencionales se
                incluyen la suspensión total del consumo de alcohol,
                medicamentos antivirales para hepatitis, control de enfermedades
                metabólicas, uso de diuréticos para tratar la ascitis,
                betabloqueadores para reducir el riesgo de hemorragias por
                varices y suplementos nutricionales para prevenir la
                desnutrición. En casos avanzados, el trasplante hepático es la
                opción definitiva. Como tratamientos alternativos o
                complementarios, se recomienda una dieta equilibrada baja en
                sal, evitar hierbas o suplementos hepatotóxicos, y en algunos
                casos se emplean terapias antioxidantes o fitoterapia bajo
                supervisión médica. Es fundamental que cualquier tratamiento
                alternativo se realice siempre con la aprobación del
                especialista, para evitar interacciones o riesgos adicionales.
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
                <Title
                  title="Presiona la tecla 's' para un testimonio"
                  fontSize={0.2}
                />
                
                <Suspense fallback={null}>
                 <LiverModel/>
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
                <Title title="Pulsa 'd' para detener o reanudar la animacion" mode="html" position={[0,-1,-1]} />
                
              </Canvas>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
