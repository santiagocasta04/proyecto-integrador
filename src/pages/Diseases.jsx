import React from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, useGLTF } from '@react-three/drei';

function Model({ path }) {
  const { scene } = useGLTF(path);
  return <primitive object={scene} scale={1.5} />;
}

export default function Diseases() {
  return (
    <div>
      <h1>Información sobre Enfermedades</h1>
      <p>Aquí podrás encontrar información útil sobre distintas enfermedades.</p>
      <div style={{ display: 'flex', justifyContent: 'space-around', marginTop: '20px' }}>
        <div style={{ textAlign: 'center' }}>
          <Canvas style={{ width: '300px', height: '300px' }}>
            <ambientLight />
            <OrbitControls />
            <Model path="/models/liver-cancer.glb" />
          </Canvas>
          <h3>Hígado Graso</h3>
        </div>
        <div style={{ textAlign: 'center' }}>
          <Canvas style={{ width: '300px', height: '300px' }}>
            <ambientLight />
            <OrbitControls />
            <Model path="/models/tired-person.glb" />
          </Canvas>
          <h3>Enfermedad Hepatitis Alcohólica (EHA)</h3>
        </div>
        <div style={{ textAlign: 'center' }}>
          <Canvas style={{ width: '300px', height: '300px' }}>
            <ambientLight />
            <OrbitControls />
            <Model path="/models/tired-person.glb" />
          </Canvas>
          <h3>Cirrosis Hepática</h3>
        </div>
      </div>
    </div>
  );
}
