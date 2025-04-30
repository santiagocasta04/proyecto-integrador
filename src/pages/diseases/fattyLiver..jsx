import React, { Suspense, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";
import "./fattyLiver.css";
import { div } from "three/tsl";

// Modelo 3D cargado y rotando
function LiverFattyModel() {
  const { scene } = useGLTF("/models/LiverFatty1.glb");
  const modelRef = useRef();

  useFrame(() => {
    if (modelRef.current) {
      modelRef.current.rotation.y += 0.005;
    }
  });

  return <primitive ref={modelRef} object={scene} scale={9.5} position={[0, 0, 0]} />;
}

export default function FattyLiverSection() {
  const [mostrarArticulo, setMostrarArticulo] = useState(false);
  const [mostrarCausas, setMostrarCausas] = useState(false);
  const [mostrarEfectos, setMostrarEfectos] = useState(false);

  const toggleArticulo = () => setMostrarArticulo(prev => !prev);
  const toggleCausas = () => setMostrarCausas(prev => !prev);
  const toggleEfectos = () => setMostrarEfectos(prev => !prev);

  return (
    <div className="seccion-principal">
      <div className="texto-contenedor">
      <div className="articulo">
        <h1 onClick={toggleArticulo} style={{ cursor: 'pointer' }}>
          ¿Qué es?
        </h1>
        {mostrarArticulo && (
          <article>
            <p className="text">
              El hígado es el órgano más grande dentro del cuerpo. Ayuda a digerir los alimentos, almacenar energía y eliminar las toxinas.
              La enfermedad por hígado graso es una afección en la que se acumula grasa en el hígado. Hay dos tipos principales:
            </p>
            <p>Enfermedad del hígado graso no alcohólico</p>
            <p>Enfermedad del hígado graso por alcohol, también llamada esteatosis hepática alcohólica</p>
          </article>
        )}
      </div>

      <div className="articulo1">
        <h1 onClick={toggleCausas} style={{ cursor: 'pointer' }}>
          Causas
        </h1>
        {mostrarCausas && (
          <article>
            <p>
              El hígado graso, o esteatosis hepática, se produce por la acumulación excesiva de grasa en el hígado. Las causas principales son
              el consumo excesivo de alcohol, la obesidad, la diabetes tipo 2, el síndrome metabólico y ciertos medicamentos. También puede
              estar relacionado con enfermedades hepáticas crónicas, como la hepatitis viral y enfermedades autoinmunes.
            </p>
          </article>   
        )}
      </div>

      <div className="articulo2">
        <h1 onClick={toggleEfectos  } style={{ cursor: 'pointer' }}>
          Efectos
        </h1>
        {mostrarEfectos && (
          <article>
            <p>
            El hígado graso puede causar una variedad de efectos, desde síntomas leves como fatiga y dolor abdominal hasta complicaciones graves como cirrosis,
            insuficiencia hepática y cáncer de hígado. En muchos casos, no hay síntomas evidentes,
            pero la enfermedad puede progresar silenciosamente hasta que se desarrollan complicaciones. 
            </p>
          </article>   
        )}
      </div>
      </div>

      <div className="modelo">
        <h1>Hígado Graso</h1>
        <div className="model-viewer">
          <Canvas camera={{ position: [0, 0, 5] }}>
            <ambientLight intensity={0.5} />
            <directionalLight position={[0, 5, 5]} />
            <Suspense fallback={null}>
              <LiverFattyModel />
              <OrbitControls enableZoom={false} />
            </Suspense>
          </Canvas>
        </div>
      </div>
    </div>  
  );
}