import React from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, useGLTF } from '@react-three/drei';
import { Link } from "react-router-dom";
import "./Diseases.css";
import Staging from '../home/staging/Staging';

function Model({ path, scale }) {
  const { scene } = useGLTF(path);
  return <primitive object={scene} scale={scale} />;
  
}



export default function Diseases() {
  return (
    <div>
      <h1>Información sobre Enfermedades</h1>
      <br/>
      <p>Aquí podrás encontrar información útil sobre distintas enfermedades.
         <br/>
        Usa tu raton para interactuar con los modelos 3D y hacer zoom en ellos. 
      </p>
      <div style={{ display: 'flex', justifyContent: 'space-around', marginTop: '20px' }}>
        <div style={{ textAlign: 'center' }}>
          <Canvas style={{ width: '300px', height: '300px' }}>
            <ambientLight />
            <OrbitControls />
            <Model path="/models/LiverFatty1.glb" scale={8.3}/>
          </Canvas>
          <h3>Hígado Graso</h3>
          <br />
          <Link to="/higadograso" className="nav-link"><button>Explorar</button></Link>
        </div>
        <div style={{ textAlign: 'center' }}>
          <Canvas style={{ width: '300px', height: '300px' }}>
            <ambientLight />
            <OrbitControls />
            <Model path="/models/liver-cancer.glb" scale={24}/>
          </Canvas>
          <h3> Cirrosis Hepática</h3>
          <br />
          <Link to="/cirrosishepatica" className="nav-link"><button>Explorar</button></Link>
        </div>
        <div style={{ textAlign: 'center' }}>
          <Canvas style={{ width: '300px', height: '300px' }}>
            <ambientLight />
            <OrbitControls />
            <Model path="/models/liver_drunk.glb" scale={2.7}/>
          </Canvas>
          <h3>Enfermedad Hepatitis Alcohólica (EHA)</h3>
          <br />
          <Link to="/hepatitis-alcohólica" className="nav-link"><button>Explorar</button></Link>
        </div>
      </div>
    </div>
  );
}