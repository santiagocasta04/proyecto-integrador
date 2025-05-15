import React, { Suspense, useRef, useState, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, SoftShadows, useGLTF ,PerspectiveCamera } from "@react-three/drei";
import "./liverCirrhosis.css";
import Title from "../texts/Title";
import Staging from "../home/staging/Staging";
import Person from "../../modelos-3d/Person";

function LiverCirrhosisModel() {
  const { scene } = useGLTF("/models/liver-cancer.glb");
  const modelRef = useRef();



    

  useFrame(() => {
    if (modelRef.current) {
      modelRef.current.rotation.y += 0.005;
    }
  });



  return (
    <primitive
      ref={modelRef}
      object={scene}
      scale={20}
      position={[0, 1, 0]}
    />
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
        <div className="articulo">
          <h1 onClick={toggleArticulo} style={{ cursor: "pointer" }}>
            ¿Qué es?
          </h1>
          {mostrarArticulo && (
            <>
              <article>
                <p className="text">
                  La cirrosis es una enfermedad hepática crónica y progresiva que
                  se caracteriza por la sustitución del tejido sano del hígado por
                  tejido cicatricial (fibrosis). Este daño impide el correcto
                  funcionamiento del órgano, afectando su capacidad para
                  desintoxicar la sangre, producir proteínas esenciales y regular
                  el metabolismo de grasas y carbohidratos. A medida que avanza la
                  cirrosis, el hígado se vuelve cada vez más cicatrizado y pierde
                  su estructura normal, lo que dificulta el flujo sanguíneo a
                  través del órgano. En etapas avanzadas, esto puede llevar a
                  insuficiencia hepática, acumulación de toxinas en el cuerpo y
                  complicaciones graves como la hipertensión portal (aumento de la
                  presión en la vena porta que transporta sangre al hígado).
                </p>
              </article>

              <div className="model-viewer">
                <Canvas
                  shadows
                  camera={{ position: [0, 0, 5] }}
                  style={{ background: "transparent" }}
                >
                  <SoftShadows size={20} samples={4} focus={4} />
                  <spotLight
                    position={[4, 4, -2]}
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
                  <Title title={"Cirrosis Hepática"} />
                </Canvas>
              </div>
            </>
          )}
        </div>

        <div className="articulo1">
          <h1 onClick={toggleCausas} style={{ cursor: "pointer" }}>
            Causas
          </h1>
          {mostrarCausas && (
            <article>
              <p>
                La cirrosis hepática, una enfermedad que causa cicatrización del
                hígado, tiene varias causas, siendo el consumo excesivo de alcohol
                y la hepatitis viral crónica las más frecuentes. Otras causas
                incluyen la enfermedad del hígado graso no alcohólico (EHNA),
                enfermedades metabólicas como la hemocromatosis y la enfermedad de
                Wilson, y la lesión de los conductos biliares.
              </p>
            </article>
          )}
        </div>

        <div className="articulo2">
          <h1 onClick={toggleEfectos} style={{ cursor: "pointer" }}>
            Efectos
          </h1>
          {mostrarEfectos && (
            <>
              <article>
                <p>
                  La cirrosis hepática, una enfermedad en la que el hígado se
                  reemplaza con tejido cicatricial, puede tener varias consecuencias
                  graves, incluyendo la insuficiencia hepática, la hipertensión
                  portal, la acumulación de líquidos (ascitis), hemorragias internas
                  y el desarrollo de cáncer hepático. Además, puede afectar otros
                  órganos y causar complicaciones como encefalopatía hepática,
                  insuficiencia renal y problemas de coagulación.
                </p>
              </article>

              <div className="model-viewer">
                <Canvas
                  shadows
                  style={{ background: "transparent" }}
                  
                >
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
                  <OrbitControls enableZoom={false}
                  enableRotate={false}
                  maxDistance={5} />

                 
                  <mesh
                    rotation={[-Math.PI / 2, 0, 0]}
                    receiveShadow
                    castShadow
                    position={[0, 0, 0]}
                  >
                    <circleGeometry args={[4, 16]} />
                    <shadowMaterial opacity={0.3} />
                    <meshStandardMaterial
                      roughness={0.8}
                      metalness={0.5}
                      color="#5A2634"
                    />
                  </mesh>
                </Canvas>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
