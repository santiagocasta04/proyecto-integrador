import React, { Suspense, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, useGLTF, SoftShadows, PerspectiveCamera} from "@react-three/drei";
import Persondrink from "../../modelos-3d/Persondrink.jsx";
import Personfatigue from "../../modelos-3d/Personfatigue.jsx";
import Personfight from "../../modelos-3d/Personfight.jsx";
import "./fattyLiver.css";
import Stagingfatty from "../home/staging/Stagingfatty.jsx";
import StagingDrink from "../home/staging/Stagingdrink.jsx";
import FattyTitle from "../texts/Fattytitle.jsx";
import DrinkTitle from "../texts/Drinktitle.jsx";
import StagingFatigue from "../home/staging/stanfatigue.jsx";
import StagingFight from "../home/staging/Stagingfight.jsx";
import VideoHospital from "../home/videos/Videohospital.jsx";
import { Link } from "react-router-dom";

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
      <circleGeometry args={[5, 70]} />
      <meshStandardMaterial roughness={0.8} metalness={1} />
    </mesh>
  );
};

export default function FattyLiverSection() {
  const [mostrarArticulo, setMostrarArticulo] = useState(false);
  const [mostrarCausas, setMostrarCausas] = useState(false);
  const [mostrarEfectos, setMostrarEfectos] = useState(false);
  const [mostrarCuidados, setMostrarCuidados] = useState(false);
  const spotLightRef = useRef();

  const toggleArticulo = () => setMostrarArticulo(prev => !prev);
  const toggleCausas = () => setMostrarCausas(prev => !prev);
  const toggleEfectos = () => setMostrarEfectos(prev => !prev);
  const toggleCuidados = () => setMostrarCuidados(prev => !prev);

  return (
    <div className="seccion-principal">
      <div className="texto-contenedor">
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
              El hígado es el órgano más grande dentro del cuerpo. Ayuda a digerir los alimentos, almacenar energía y eliminar las toxinas.
              La enfermedad por hígado graso es una afección en la que se acumula grasa en el hígado. Hay dos tipos principales:
            
              Enfermedad del hígado graso no alcohólico
              Enfermedad del hígado graso por alcohol, también llamada esteatosis hepática alcohólica</p>  
          </article>
        <div className="model-viewer">
          <Canvas camera={{ position: [0, 0, 10] }} shadows={true}>
            <SoftShadows samples={20} size={10} focus={0.5} />
            <spotLight
              color={"white"}
              position={[4, 2, -2]}
              distance={10}
              intensity={200} 
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
            <VideoHospital/>  
            <Suspense fallback={null}>
              <LiverFattyModel />
              <OrbitControls enableZoom={false} />
            </Suspense>
            <FattyTitle title="Higado graso" mode ="text3d" position={[0, 3.5, 0]}/>
            <FattyTitle title="Interactua con el modelo 3d" mode = "html1" position={[0, -2.8, 0]} htmlSize={30}/>
          </Canvas>
          </div>
        </div>
      </div>
      
      <div className={`articulo1 ${mostrarCausas ? "expandido" : ""}`}>
        <h1  className="toggle-title" onClick={toggleCausas}>
          Causas
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
            <p>
              El hígado graso, o esteatosis hepática, se produce por la acumulación excesiva de grasa en el hígado. Las causas principales son
              el consumo excesivo de alcohol, la obesidad, la diabetes tipo 2, el síndrome metabólico y ciertos medicamentos. También puede
              estar relacionado con enfermedades hepáticas crónicas, como la hepatitis viral y enfermedades autoinmunes.
            </p>
          </article> 
          <div className="model-viewer">
              <Canvas shadows style={{ background: "transparent" }}>
                <PerspectiveCamera makeDefault fov={70} position={[0, 1.8, 2.9]} />
                <spotLight
                  position={[0.001, 2.9, -2.8]} 
                  intensity={15}
                  castShadow
                  shadow-mapSize-width={2024}
                  shadow-mapSize-height={2024}
                  shadow-bias={0} 
                />
                <ambientLight intensity={0.01} />
                
                <StagingDrink/>
                <Suspense fallback={null}>
                  <Persondrink />
                </Suspense>
                
                <OrbitControls enableZoom={false} enableRotate={false} maxDistance={5} target={[0, 0.3, 0]} />
                <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow castShadow position={[0, 0, 0] }>  
                 <circleGeometry args={[8, 64]} />
                  <shadowMaterial opacity={0.3} />
                  <meshStandardMaterial roughness={0.8} metalness={0.5} color="#6c8a92ff"/>
                </mesh>
                <DrinkTitle title="Alcoholismo" position={[0, 1.7, 0]} mode="text3d"/>
                <DrinkTitle title="El alcohol es el principal causante de enfermedades en el higado" mode = "text2d"/>
                <DrinkTitle title="El exceso de alcohol puede perjudicar gravemente al buen funcionamiento del higado" mode = "text2d2"/>
              </Canvas>
            </div>
        </div>  
      </div>

      <div className={`articulo2 ${mostrarEfectos ? "expandido" : ""}`}>
        <h1 className="toggle-title" onClick={toggleEfectos  }>
          Efectos
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
            <p>
            El hígado graso puede causar una variedad de efectos, desde síntomas leves como fatiga y dolor abdominal hasta complicaciones graves como cirrosis,
            insuficiencia hepática y cáncer de hígado. En muchos casos, no hay síntomas evidentes,
            pero la enfermedad puede progresar silenciosamente hasta que se desarrollan complicaciones. 
            </p>
          </article>  
          <div className="model-viewer">
              <Canvas shadows style={{ background: "transparent" }}>
                <PerspectiveCamera makeDefault fov={70} position={[0, 2, 4]} />
                <spotLight
                  ref={spotLightRef}
                  position={[0, 5, 5]} 
                  intensity={90}
                  angle={Math.PI / 10}
                  castShadow
                  penumbra={0} 
                  shadow-bias={-0.0001}
                  shadow-mapSize-width={600} 
                  shadow-mapSize-height={600}
                />
                <ambientLight intensity={0.2} />
                
                <StagingFatigue/>
                <Suspense fallback={null}>
                  <Personfatigue />
                </Suspense>
                <OrbitControls enableZoom={false} enableRotate={false} maxDistance={5} target={[0, 0.3, 0]} />
                <mesh rotation={[-Math.PI / 1.9, 0, 0]} receiveShadow castShadow position={[0, 0, 0] }>  
                 <circleGeometry args={[3.5, 55]} />
                  <shadowMaterial opacity={0.4} />
                  <meshStandardMaterial roughness={0.8} metalness={0.5} color="#103641ff"/>
                </mesh>
                <DrinkTitle title= "Presiona c para interactuar con el sonido" mode="html1" position = {[0, -3, 0]}/>
                <DrinkTitle title="Las consecuencias del higado graso se pueden ver tanto a corto como a largo plazo" color="#211502ff" mode="text2d3"/>
              </Canvas>
            </div> 
      </div>
      </div>
       <div className={`articulo3 ${mostrarCuidados ? "expandido" : ""}`}>
        <h1 className="toggle-title" onClick={toggleCuidados  }>
          Cuidados y Prevenciones
          <span className="icon-container">
              <img
                src={
                  mostrarCuidados
                    ? "/icons/arrow-up.png"
                    : "/icons/arrow-down.png"
                }
                alt="Toggle"
                className="toggle-icon"
              />
            </span>
        </h1>

      <div className={`expandible-container ${mostrarCuidados ? "activo" : ""}`}>       
          <article>
          <p>
          Puede prevenirse y controlarse mediante hábitos saludables como mantener un peso adecuado,
          llevar una alimentación balanceada rica en frutas, verduras y grasas buenas, reducir el consumo de azúcares, harinas refinadas, frituras y alcohol,
          y practicar ejercicio físico regularmente como el boxeo o demas deportes que exigan una gran capacidad cardiaca. Además, es fundamental controlar 
          enfermedades asociadas como la diabetes y el colesterol alto, evitar la automedicación y realizar chequeos médicos frecuentes. Si ya se padece, 
          se recomienda seguir una dieta supervisada por profesionales, evitar dietas extremas, manejar el estrés, dormir bien y mantenerse bien hidratado
          para proteger la salud hepática y prevenir complicacion
            </p>
          </article>  
          <div className="model-viewer">
              <Canvas shadows style={{ background: "transparent" }}>
                <PerspectiveCamera makeDefault fov={70} position={[0, 2, 4]} />
                <spotLight
                  ref={spotLightRef}
                  position={[-1, 3.3, 0]}
                  distance={7}
                  intensity={90}
                  angle={Math.PI / 3.9}
                  penumbra={0}
                  shadow-bias={-0.0001}
                  shadow-mapSize-width={600} 
                  shadow-mapSize-height={600}
                  castShadow
                />
                <ambientLight intensity={0} />
                
                <StagingFight/>
                <Suspense fallback={null}>
                <Personfight/>
                </Suspense>
                
                <OrbitControls enableZoom={false} enableRotate={false} maxDistance={5} />
                <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow castShadow position={[0, 0, 0] }>  
                 <circleGeometry args={[4, 64]} />
                  <shadowMaterial opacity={0.3} />
                  <meshStandardMaterial roughness={0.8} metalness={0.5} color="#fcc4beff"/>
                </mesh>
                <DrinkTitle title="haz click sobre el modelo para interactuar" mode="html1" position={[0, -3, 0]} /> 
                <DrinkTitle title="Deporte" mode="text3d" />
              </Canvas>
            </div> 
      </div>
      </div>
      
      </div>
      <Link to="/cirrosishepatica" className="btn-explorar">Siguiente enfermedad</Link>
    </div>  
  );
}