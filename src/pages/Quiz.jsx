import React, {
  Suspense,
  useRef,
  useState,
  useEffect,
  useCallback,
} from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import {
  OrbitControls,
  PerspectiveCamera,
  useGLTF,
  Stage,
} from "@react-three/drei";
import { useNavigate } from "react-router";
import useAuthStore from "../stores/use-auth-store";
import { CuboidCollider, Physics, RigidBody } from "@react-three/rapier";
import Capsule from "./Capsule";
import * as THREE from "three";

const QUESTIONS = [
  { question: "¿Cuál modelo representa un hígado graso?", correct: "fatty" },
  { question: "¿Cuál modelo representa un hígado con cirrosis?", correct: "cirrhosis" },
  { question: "¿Cuál modelo representa un hígado básico?", correct: "liver" },
  { question: "¿Cuál modelo parece más dañado por enfermedad?", correct: "cirrhosis" },
  { question: "¿Cuál modelo sería el ideal en una persona sana?", correct: "fatty" },
];

function LiverCirrhosisModel({ position }) {
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
    <RigidBody type="fixed" colliders={false} name="cirrhosis">
      <primitive ref={modelRef} object={scene} scale={6} position={position} />
      <CuboidCollider
        args={[0.5, 0.7, 0.5]}
        position={[position[0], position[1] + 0.3, position[2]]}
      />
    </RigidBody>
  );
}

function LiverModel({ position }) {
  const { scene } = useGLTF("/models/Liver.glb");
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

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (modelRef.current) {
      modelRef.current.rotation.y += 0.005;
      modelRef.current.position.y = position[1] + Math.sin(t) * 0.2;
    }
  });

  return (
    <RigidBody type="fixed" colliders={false} name="liver">
      <primitive ref={modelRef} object={scene} scale={1} position={position} />
      <CuboidCollider
        args={[0.8, 0.7, 0.8]}
        position={[position[0], position[1] + 0.5, position[2]]}
      />
    </RigidBody>
  );
}

function FattyLiverModel({ position }) {
  const { scene } = useGLTF("/models/LiverFatty1.glb");
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
    <RigidBody type="fixed" colliders={false} name="fatty">
      <primitive ref={modelRef} object={scene} scale={5} position={position} />
      <CuboidCollider
        args={[0.5, 0.5, 0.5]}
        position={[position[0], position[1] + 0.3, position[2]]}
      />
    </RigidBody>
  );
}

const MODEL_COMPONENTS = [
  { key: "fatty", Component: FattyLiverModel },
  { key: "cirrhosis", Component: LiverCirrhosisModel },
  { key: "liver", Component: LiverModel },
];

function shuffleArray(array) {
  return [...array].sort(() => Math.random() - 0.5);
}

const Quiz = () => {
  const { userLooged, loginGoogleWithPopUp } = useAuthStore();
  const navigate = useNavigate();
  const [questionIndex, setQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [shuffledModels, setShuffledModels] = useState([]);
  const capsuleRef = useRef();

  useEffect(() => {
    if (userLooged) {
      setShuffledModels(shuffleArray(MODEL_COMPONENTS));
    }
  }, [questionIndex, userLooged]);

  const handleLogin = useCallback(() => {
    loginGoogleWithPopUp().catch(() => navigate("/"));
  }, [loginGoogleWithPopUp, navigate]);

  const handleCollision = (name) => {
    if (name === QUESTIONS[questionIndex].correct) {
      setScore((prev) => prev + 1);
    }
    if (questionIndex < QUESTIONS.length - 1) {
      setQuestionIndex((prev) => prev + 1);
    } else {
      alert(`Quiz finalizado. Tu puntuación es: ${score + 1}/5`);
      setQuestionIndex(0);
      setScore(0);
    }
    setTimeout(() => {
      capsuleRef.current?.resetPosition();
    }, 1000);
  };

  const positions = [
    [-2, 1, 0],
    [0, 1, 0],
    [2, 1, 0],
  ];

  return (
    <>
      {!userLooged ? (
        <>
          <h2>Continúa con Google para realizar el quiz</h2>
          <button
            type="button"
            title="Iniciar sesión con Google"
            onClick={handleLogin}
            style={{
              padding: "10px 20px",
              fontSize: "16px",
              marginTop: "1rem",
              cursor: "pointer",
            }}
          >
            Iniciar sesión
          </button>
        </>
      ) : (
        <div style={{ height: "calc(100vh - 60px)", width: "100%" }}>
          <h2 style={{ textAlign: "center" }}>
            Bienvenido al Quiz, {userLooged.displayName}
          </h2>
          <h3 style={{ textAlign: "center" }}>
            {QUESTIONS[questionIndex].question}
          </h3>
          <div style={{ height: "10px", background: "#ddd", margin: "10px" }}>
            <div
              style={{
                height: "100%",
                width: `${(questionIndex / QUESTIONS.length) * 100}%`,
                background: "green",
                transition: "width 0.5s",
              }}
            ></div>
          </div>
          <Canvas shadows>
            <Suspense fallback={null}>
              <PerspectiveCamera makeDefault position={[0, 5, 10]} />
              <Stage
                environment="city"
                intensity={1.5}
                shadows
                adjustCamera={false}
              >
                <Physics debug>
                  <RigidBody type="fixed">
                    <mesh
                      rotation={[-Math.PI / 2, 0, 0]}
                      position={[0, 0, 0]}
                      receiveShadow
                    >
                      <planeGeometry args={[20, 20]} />
                      <meshStandardMaterial transparent opacity={0} />
                    </mesh>
                  </RigidBody>

                  <Capsule ref={capsuleRef} onCollision={handleCollision} />

                  {shuffledModels.map(({ key, Component }, i) => (
                    <group
                      key={key}
                      onClick={() =>
                        capsuleRef.current?.launchTowards(
                          new THREE.Vector3(...positions[i])
                        )
                      }
                    >
                      <Component position={positions[i]} />
                    </group>
                  ))}
                </Physics>
              </Stage>

              <OrbitControls
                minDistance={3}
                maxDistance={15}
                enableRotate={true}
              />
            </Suspense>
          </Canvas>
        </div>
      )}
    </>
  );
};

export default Quiz;
