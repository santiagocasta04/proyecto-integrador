import React, { Suspense, useRef, useState} from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";
import "./liverCirrhosis.css";

// Modelo 3D cargado y rotando
function LiverCirrhosisModel() {
  const { scene } = useGLTF("/models/liver-cancer.glb");
  const modelRef = useRef();

  // Rotación continua
  useFrame(() => {
    if (modelRef.current) {
      modelRef.current.rotation.y += 0.005; // Velocidad de rotación (ajustable)
    }
  });

  return <primitive ref={modelRef} object={scene} scale={28} position={[0, 0, 0]} />;
}

export default function LiverCirrhosisSection() {
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
                    ¿Que es?
                </h1>
                {mostrarArticulo && (
                <article>
                    <p className="text">
                    La cirrosis es una enfermedad hepática crónica y progresiva que se caracteriza por la sustitución del tejido sano del hígado por tejido cicatricial (fibrosis). Este daño impide el correcto funcionamiento del órgano, afectando su capacidad para desintoxicar la sangre, producir proteínas esenciales y regular el metabolismo de grasas y carbohidratos.
                    A medida que avanza la cirrosis, el hígado se vuelve cada vez más cicatrizado y pierde su estructura normal, lo que dificulta el flujo sanguíneo a través del órgano. En etapas avanzadas, esto puede llevar a insuficiencia hepática, acumulación de toxinas en el cuerpo y complicaciones graves como la hipertensión portal (aumento de la presión en la vena porta que transporta sangre al hígado).
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
                La cirrosis hepática, una enfermedad que causa cicatrización del hígado, tiene varias causas, 
                siendo el consumo excesivo de alcohol y la hepatitis viral crónica las más frecuentes. 
                Otras causas incluyen la enfermedad del hígado graso no alcohólico (EHNA), enfermedades metabólicas 
                como la hemocromatosis y la enfermedad de Wilson, y la lesión de los conductos biliares.
                </p>
              </article>   
            )}
    </div>

        <div className="articulo2">
        <h1 onClick={toggleEfectos} style={{ cursor: 'pointer' }}>
          Efectos
        </h1>
        {mostrarEfectos && (
          <article>
            <p>
            La cirrosis hepática, una enfermedad en la que el hígado se reemplaza con tejido cicatricial, 
            puede tener varias consecuencias graves, incluyendo la insuficiencia hepática, la hipertensión
            portal, la acumulación de líquidos (ascitis), hemorragias internas y el desarrollo de cáncer hepático. 
            Además, puede afectar otros órganos y causar complicaciones como encefalopatía hepática, insuficiencia renal y problemas de coagulación. 
            </p>
          </article>   
        )}
        </div>
        </div>

        <div className="modelo">
    <h1>Cirrosis Hepatica</h1>
        <div className="model-viewer">
            <Canvas camera={{ position: [0, 0, 5] }}>
            <ambientLight intensity={0.5} />
            <directionalLight position={[0, 5, 5]} />
            <Suspense fallback={null}>
                <LiverCirrhosisModel />
                <OrbitControls enableZoom={false} />
            </Suspense>
            </Canvas>
        </div>
        </div>
    </div>
  );
}