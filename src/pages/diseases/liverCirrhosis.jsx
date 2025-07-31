import React, { Suspense, useRef, useState, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, useGLTF, PerspectiveCamera } from "@react-three/drei";
import "./liverCirrhosis.css";
import Title from "../texts/Title";
import Staging from "../home/staging/Staging";
import Person from "../../modelos-3d/Person";
import StagingFatty from "../home/staging/Stagingfatty";


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
    <primitive ref={modelRef} object={scene} scale={15} position={[0, 1, 0]} />
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
          <div className={`expandible-container ${mostrarArticulo ? "activo" : ""}`}>
            <article>
              <p className="text">
                La cirrosis hepática es una enfermedad crónica e irreversible
                del hígado caracterizada por la sustitución del tejido sano por
                tejido cicatricial...
              </p>
            </article>
            <div className="model-viewer">
              <Canvas shadows camera={{ position: [0, 0, 5] }} style={{ background: "transparent" }}>
                <spotLight position={[4, 4, 2]} color={"yellow"} angle={Math.PI / 14} penumbra={1} distance={25} intensity={1000} />
                <ambientLight intensity={0.5} />
                <directionalLight color="white" position={[5, 10, 5]} intensity={2} castShadow shadow-mapSize-width={1024} shadow-mapSize-height={1024} />
                 <StagingFatty/>
                <Suspense fallback={null}><LiverCirrhosisModel /></Suspense>
                <OrbitControls enableZoom={false} />
                <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow castShadow position={[0, -1.5, 0]}>
                  <circleGeometry args={[8, 64]} />
                  <shadowMaterial opacity={0.3} />
                  <meshStandardMaterial roughness={0.8} metalness={0.5} color="#5A2634" />
                </mesh>
                <Title title="Cirrosis Hepática" mode="html" />
                <Title title="Interactua usando el raton " mode="text3d"/>
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
          <div className={`expandible-container ${mostrarCausas ? "activo" : ""}`}>
            <article>
              <p className="text">
                Las principales causas de la cirrosis incluyen el consumo
                excesivo de alcohol, hepatitis crónicas B y C...
              </p>
            </article>
            <div className="model-viewer">
              <Canvas shadows style={{ background: "transparent" }}>
                <PerspectiveCamera makeDefault fov={80} position={[0, 1, 3]} />
                <ambientLight intensity={0.5} />
                <directionalLight color="white" position={[5, 10, 5]} intensity={2} castShadow shadow-mapSize-width={1024} shadow-mapSize-height={1024} />
                <Staging />
                <Suspense fallback={null}><Person /></Suspense>
                <OrbitControls enableZoom={false} enableRotate={false} maxDistance={5} />
                <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow castShadow position={[0, 0, 0]}>
                  <circleGeometry args={[4, 16]} />
                  <shadowMaterial opacity={0.3} />
                  <meshStandardMaterial roughness={1} metalness={0.5} color="#5A2634" />
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
          <div className={`expandible-container ${mostrarEfectos ? "activo" : ""}`}>
            <article>
              <p className="text">
                El tratamiento de la cirrosis se enfoca en detener o ralentizar
                el daño hepático, controlar los síntomas y prevenir complicaciones...
              </p>
            </article>
            <div className="model-viewer">
              <Canvas shadows style={{ background: "transparent" }}>
                <PerspectiveCamera makeDefault fov={80} position={[0, 1, 3]} />
                <ambientLight intensity={0.5} />
                <directionalLight color="white" position={[5, 10, 5]} intensity={2} castShadow shadow-mapSize-width={1024} shadow-mapSize-height={1024} />
                <Staging />
                <Suspense fallback={null}><LiverModel /></Suspense>
                <OrbitControls enableZoom={false} enableRotate={false} maxDistance={5} />
                <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow castShadow position={[0, 0, 0]}>
                  <circleGeometry args={[4, 16]} />
                  <shadowMaterial opacity={0.3} />
                  <meshStandardMaterial roughness={1} metalness={0.5} color="#5A2634" />
                </mesh>
                <Title title="Pulsa 'd' para detener o reanudar la animacion" mode="html" position={[0, -1, -1]} />
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
          <div className={`expandible-container ${mostrarPrevencion ? "activo" : ""}`}>
            <article>
              <p className="text">
                La prevención de la cirrosis hepática implica adoptar hábitos saludables como evitar el consumo excesivo de alcohol...
              </p>
            </article>
            <div className="model-viewer">
              <Canvas shadows style={{ background: "transparent" }}>
                <PerspectiveCamera makeDefault fov={80} position={[0, 1, 3]} />
                <ambientLight intensity={0.5} />
                <directionalLight color="white" position={[5, 10, 5]} intensity={2} castShadow shadow-mapSize-width={1024} shadow-mapSize-height={1024} />
                <Staging />
                <Suspense fallback={null}><HealthyLiverModel /></Suspense>
                <OrbitControls enableZoom={false} enableRotate={false} maxDistance={5} />
                <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow castShadow position={[0, 0, 0]}>
                  <circleGeometry args={[4, 16]} />
                  <shadowMaterial opacity={0.3} />
                  <meshStandardMaterial roughness={1} metalness={0.5} color="#5A2634" />
                </mesh>
                <Title title="¡La prevención es la mejor medicina!" mode="html" position={[0, -1, -1]} />
              </Canvas>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
