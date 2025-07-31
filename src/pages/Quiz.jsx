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
import { Physics, RigidBody } from "@react-three/rapier";

function LiverCirrhosisModel() {
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
    <RigidBody type="fixed" >
    <primitive ref={modelRef} object={scene} scale={6} position={[-2, 1, 0]} />
    </RigidBody>
  );
}

function LiverModel() {
  const { scene } = useGLTF("/models/Liver.glb");
  const modelRef = useRef();
  const [isAnimating, setIsAnimating] = useState(true);

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

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key.toLowerCase() === "d") {
        setIsAnimating((prev) => !prev);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  useFrame((state) => {
    if (!isAnimating || !modelRef.current) return;
    const t = state.clock.getElapsedTime();
    modelRef.current.rotation.y += 0.005;
    modelRef.current.position.y = 1 + Math.sin(t) * 0.2;
  });

  return (
   <RigidBody type="fixed">
     <primitive
      ref={modelRef}
      object={scene}
      scale={1}
      position={[1.5, 1, 0]}
    />
   </RigidBody>
  );
}

function HealthyLiverModel() {
  const { scene } = useGLTF("/models/healty-liver.glb");
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
    <RigidBody type="fixed">
      <primitive
      ref={modelRef}
      object={scene}
      scale={5}
      position={[-0.5, 1, 0]}
    />
    </RigidBody> 
  );
}

const Quiz = () => {
  const { userLooged, loginGoogleWithPopUp } = useAuthStore();
  const navigate = useNavigate();

  const handleLogin = useCallback(() => {
    loginGoogleWithPopUp().catch(() => navigate("/"));
  }, [loginGoogleWithPopUp, navigate]);

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
          <Canvas shadows>
            <Suspense fallback={null}>
              <PerspectiveCamera makeDefault position={[0, 0, 10]} />
              <Stage environment="city" intensity={1.5} shadows adjustCamera>
                <Physics debug>
                <LiverModel />
                <LiverCirrhosisModel />
                <HealthyLiverModel />
                </Physics>
              </Stage>
              <OrbitControls minDistance={3} maxDistance={15} enableRotate={false} />
            </Suspense>
          </Canvas>
        </div>
      )}
    </>
  );
};

export default Quiz;
