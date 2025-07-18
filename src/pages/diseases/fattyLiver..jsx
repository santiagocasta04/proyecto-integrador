import React, { Suspense, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, useGLTF, SoftShadows, PerspectiveCamera} from "@react-three/drei";
import Persondrink from "../../modelos-3d/Persondrink.jsx";
import Personfatigue from "../../modelos-3d/Personfatigue.jsx";
import "./fattyLiver.css";
import Stagingfatty from "../home/staging/Stagingfatty.jsx";
import FattyTitle from "../texts/Fattytitle.jsx";

import { div } from "three/tsl";
import { Mesh } from "three"; 

// Modelo 3D cargado y rotando
function LiverFattyModel() {
  const { scene } = useGLTF("/models/LiverFatty1.glb");
  const modelRef = useRef();

  useFrame(() => {
    if (modelRef.current) {
      modelRef.current.rotation.y += 0.005;
    }
  });
  React.useEffect(() => {
    scene.traverse((child) => {
      if (child.isMesh) {
        child.castShadow = true;
        child.receiveShadow = false; // opcional
      }
    });
  }, [scene])

  return <primitive ref={modelRef} object={scene} scale={10.3} position={[0, 0, 0]} />;
}

const Recipent = () =>{
  return (
    <mesh 
    rotation-x={-Math.PI / 2} 
    receiveShadow={true}
    position={[0, -2, 0]}>
      <circleGeometry args={[7, 70]} />
      <meshStandardMaterial roughness={0.8} metalness={1} />
    </mesh>
  );
};

export default function FattyLiverSection() {
  const [mostrarArticulo, setMostrarArticulo] = useState(false);
  const [mostrarCausas, setMostrarCausas] = useState(false);
  const [mostrarEfectos, setMostrarEfectos] = useState(false);
  const spotLightRef = useRef();

  const toggleArticulo = () => setMostrarArticulo(prev => !prev);
  const toggleCausas = () => setMostrarCausas(prev => !prev);
  const toggleEfectos = () => setMostrarEfectos(prev => !prev);

  return (
    <div className="seccion-principal">
      <div className="texto-contenedor">
      <div className={`articulo ${mostrarArticulo ? "expandido" : ""}`}>
        <h1 onClick={toggleArticulo}>¿Qué es?</h1>
        <div className={`expandible-container ${mostrarArticulo ? "activo" : ""}`}>
          <article>
            <p className="text">
              El hígado es el órgano más grande dentro del cuerpo. Ayuda a digerir los alimentos, almacenar energía y eliminar las toxinas.
              La enfermedad por hígado graso es una afección en la que se acumula grasa en el hígado. Hay dos tipos principales:
            
              Enfermedad del hígado graso no alcohólico
              Enfermedad del hígado graso por alcohol, también llamada esteatosis hepática alcohólica</p>  
          </article>
        <div className="model-viewer">
          <Canvas camera={{ position: [0, 0, 6] }} shadows={true}>
            <SoftShadows samples={20} size={10} focus={0.5} />
            <spotLight
              color={"white"}
              position={[4, 2, -2]}
              distance={10}
              intensity={40} 
              angle={Math.PI / 9.5}
              penumbra={0.8} 
              castShadow
              shadowBias={-0.0001}
            />
            <ambientLight intensity={0.3} />
            <directionalLight
              color={"white"}
              position={[0, 5, 5]}
              intensity={0.66}
              castShadow
              shadowMapSize={{ width: 1024, height: 1024 }}
              shadowRadius={9}
              shadowBias={-0.0005}
            />
            <Recipent />
            <Stagingfatty/>  
            <Suspense fallback={null}>
              <LiverFattyModel />
              <OrbitControls enableZoom={false} />
            </Suspense>
            <FattyTitle title="Higado graso" />
          </Canvas>
          </div>
        </div>
      </div>
      
      <div className={`articulo1 ${mostrarCausas ? "expandido" : ""}`}>
        <h1 onClick={toggleCausas}>
          Causas
        </h1>
        <div className={`expandible-container ${mostrarCausas ? "activo" : ""}`}>
          <article>
            <p>
              El hígado graso, o esteatosis hepática, se produce por la acumulación excesiva de grasa en el hígado. Las causas principales son
              el consumo excesivo de alcohol, la obesidad, la diabetes tipo 2, el síndrome metabólico y ciertos medicamentos. También puede
              estar relacionado con enfermedades hepáticas crónicas, como la hepatitis viral y enfermedades autoinmunes.
            </p>
          </article> 
          <div className="model-viewer">
              <Canvas shadows style={{ background: "transparent" }}>
                <PerspectiveCamera makeDefault fov={70} position={[0, 1, 3]} />
                <spotLight
                  ref={spotLightRef}
                  position={[0, 3, 0]}
                  distance={6}
                  intensity={10}
                  angle={Math.PI / 3}
                  penumbra={0.001}
                  castShadow
                />
                <ambientLight intensity={0.5} />
                

                <Suspense fallback={null}>
                  <Persondrink />
                </Suspense>
                
                <OrbitControls enableZoom={false} enableRotate={false} maxDistance={5} />
                <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow castShadow position={[0, 0, 0] }>  
                 <circleGeometry args={[8, 64]} />
                  <shadowMaterial opacity={0.3} />
                  <meshStandardMaterial roughness={0.8} metalness={0.5} color="#6c8a92ff"/>
                </mesh>
                <FattyTitle title="Alcoholismo" />
              </Canvas>
            </div>
        </div>  
      </div>

      <div className={`articulo2 ${mostrarEfectos ? "expandido" : ""}`}>
        <h1 onClick={toggleEfectos  }>Efectos</h1>
        <div className={`expandible-container ${mostrarEfectos ? "activo" : ""}`}>       
          <article>
            <p>
            El hígado graso puede causar una variedad de efectos, desde síntomas leves como fatiga y dolor abdominal hasta complicaciones graves como cirrosis,
            insuficiencia hepática y cáncer de hígado. En muchos casos, no hay síntomas evidentes,
            pero la enfermedad puede progresar silenciosamente hasta que se desarrollan complicaciones. 
            </p>
          </article>  
          <div className="model-viewer">
              <Canvas shadows style={{ background: "transparent" }}>
                <PerspectiveCamera makeDefault fov={70} position={[0, 1, 3]} />
                <spotLight
                  ref={spotLightRef}
                  position={[0, 3, 0]}
                  distance={10}
                  intensity={10}
                  angle={Math.PI / 9}
                  penumbra={0.001}
                  castShadow
                />
                <ambientLight intensity={0.3} />
                
                <Suspense fallback={null}>
                  <Personfatigue />
                </Suspense>
                <OrbitControls enableZoom={false} enableRotate={false} maxDistance={5} />
                <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow castShadow position={[0, 0, 0] }>  
                 <circleGeometry args={[8, 64]} />
                  <shadowMaterial opacity={0.3} />
                  <meshStandardMaterial roughness={0.8} metalness={0.5} color="#103641ff"/>
                </mesh>
              </Canvas>
            </div> 
      </div>
      </div>
      </div>
    </div>  
  );
}