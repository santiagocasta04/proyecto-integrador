import React, { Suspense, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";
import "./fattyLiver.css";
import { Link } from "react-router-dom";


// Modelo 3D cargado y rotando
function EhaModel() {
  const { scene } = useGLTF("/models/liver_drunk.glb");
  const modelRef = useRef();

  // Rotación continua
  useFrame(() => {
    if (modelRef.current) {
      modelRef.current.rotation.y += 0.005; // Velocidad de rotación (ajustable)
    }
  });

  return <primitive ref={modelRef} object={scene} scale={2.7} position={[0, 0, 0]} />;
}

export default function EhaSection() {
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
                    <p>
                    La Enfermedad Hepatitis Alcohólica (EHA) es un daño al hígado y su funcionamiento debido al consumo excesivo de alcohol. 
                    Se trata de un espectro de afecciones que pueden variar desde un hígado graso (esteatosis) hasta formas más graves como la hepatitis alcohólica (inflamación del hígado),
                    la cirrosis (daño hepático crónico) y el cáncer de hígado.
                    </p>
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
                    La principal causa de la Enfermedad Hepatitis Alcohólica (EHA) es el consumo excesivo y prolongado de alcohol, 
                    que daña las células del hígado y causa inflamación. El riesgo de desarrollar EHA aumenta con la cantidad de alcohol consumido y el tiempo de consumo.
                    El consumo excesivo de alcohol en un corto período de tiempo (borracheras) también puede causar EHA, aunque es menos común que el consumo crónico
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
                    La Enfermedad Hepatitis Alcohólica (EHA) puede causar una serie de efectos, desde síntomas agudos como ictericia,
                    dolor abdominal y náuseas hasta complicaciones crónicas como cirrosis, insuficiencia hepática y encefalopatía hepática. 
                    La EHA también puede aumentar el riesgo de hemorragias digestivas, ascitis y peritonitis bacteriana espontánea
                    </p>
                  </article>   
                )}
              </div>
              </div>

        <div className="modelo">
    <h1>Enfermedad Hepatitis Alcohólica (EHA)</h1>
        <div className="model-viewer">
            <Canvas camera={{ position: [0, 0, 5] }}>
            <ambientLight intensity={0.5} />
            <directionalLight position={[0, 5, 5]} />
            <Suspense fallback={null}>
                <EhaModel />
                <OrbitControls enableZoom={false} />
            </Suspense>
            </Canvas>
        </div>
        </div>
        <Link to="/cirrosishepatica" className="btn-anteriorEHA">Anterior enfermedad</Link>
    </div>
  );
}