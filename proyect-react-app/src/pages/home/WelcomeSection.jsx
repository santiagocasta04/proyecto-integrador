import React, { Suspense, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";
import "./WelcomeSection.css";
import { Link } from "react-router-dom";

// Modelo 3D cargado y rotando
function TiredPersonModel() {
  const { scene } = useGLTF("/models/liver-cancer.glb");
  const modelRef = useRef();

  // Rotación continua
  useFrame(() => {
    if (modelRef.current) {
      modelRef.current.rotation.y += 0.005; // Velocidad de rotación (ajustable)
    }
  });

  return <primitive ref={modelRef} object={scene} scale={25} position={[0, 0, 0]} />;
}

export default function WelcomeSection() {
  return (
    <div className="welcome-container">
 <h1>Liver lab 3d</h1>
 <p>Explora el bienestar de tu higado de nuevas maneras. Nuestra aplicación te guía hacia un recorrido por tu higado. Diviertete aprendiendo.</p>
 
      <div className="model-viewer">
        <Canvas camera={{ position: [0, 0, 5] }}>
          <ambientLight intensity={0.5} />
          <directionalLight position={[0, 5, 5]} />
          <Suspense fallback={null}>
            <TiredPersonModel />
            <OrbitControls enableZoom={false} />
          </Suspense>
        </Canvas>
      </div>

      <Link to="/enfermedades" className="nav-link"><button onClick={() => alert("¡Vamos allá!")}>Explorar</button></Link>
    </div>
  );
}
