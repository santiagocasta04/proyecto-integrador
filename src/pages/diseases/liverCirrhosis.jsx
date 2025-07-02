import React, { Suspense, useRef, useState, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import {
  OrbitControls,
  SoftShadows,
  useGLTF,
  PerspectiveCamera,
} from "@react-three/drei";
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
          <h1 onClick={toggleArticulo}>¿Qué es?</h1>
          <div className={`expandible-container ${mostrarArticulo ? "activo" : ""}`}>
            <article>
              <p className="text">
                La cirrosis es una enfermedad hepática crónica y progresiva que se caracteriza
                por la sustitución del tejido sano del hígado por tejido cicatricial (fibrosis).
                Este daño impide el correcto funcionamiento del órgano, afectando su capacidad
                para desintoxicar la sangre, producir proteínas esenciales y regular el metabolismo...
              </p>
            </article>
            <div className="model-viewer">
              <Canvas shadows camera={{ position: [0, 0, 5] }} style={{ background: "transparent" }}>
                <SoftShadows size={20} samples={4} focus={4} />
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
                <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow castShadow position={[0, -1.5, 0]}>
                  <circleGeometry args={[8, 64]} />
                  <shadowMaterial opacity={0.3} />
                  <meshStandardMaterial roughness={0.8} metalness={0.5} color="#5A2634" />
                </mesh>
                <Title title="Cirrosis Hepática" />
              </Canvas>
            </div>
          </div>
        </div>

        {/* Causas */}
        <div className={`articulo1 ${mostrarCausas ? "expandido" : ""}`}>
          <h1 onClick={toggleCausas}>Causas</h1>
          <div className={`expandible-container ${mostrarCausas ? "activo" : ""}`}>
            <article>
              <p className="text">
                La cirrosis hepática, una enfermedad que causa cicatrización del hígado, tiene varias causas,
                siendo el consumo excesivo de alcohol y la hepatitis viral crónica las más frecuentes...
              </p>
            </article>
          </div>
        </div>

        {/* Efectos */}
        <div className={`articulo2 ${mostrarEfectos ? "expandido" : ""}`}>
          <h1 onClick={toggleEfectos}>Efectos</h1>
          <div className={`expandible-container ${mostrarEfectos ? "activo" : ""}`}>
            <article>
              <p className="text">
                La cirrosis hepática puede tener consecuencias graves, incluyendo la insuficiencia hepática,
                hipertensión portal, acumulación de líquidos, hemorragias internas y más...
              </p>
            </article>
            <div className="model-viewer">
              <Canvas shadows style={{ background: "transparent" }}>
                <PerspectiveCamera makeDefault fov={70} position={[0, 1, 3]} />
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
                <OrbitControls enableZoom={false} enableRotate={false} maxDistance={5} />
                <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow castShadow position={[0, 0, 0]}>
                  <circleGeometry args={[4, 16]} />
                  <shadowMaterial opacity={0.3} />
                  <meshStandardMaterial roughness={0.8} metalness={0.5} color="#5A2634" />
                </mesh>
              </Canvas>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
