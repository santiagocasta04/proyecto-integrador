import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { useGLTF, useAnimations, useKeyboardControls } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";

export default function Person(props) {
  const group = useRef();
  const { nodes, materials, animations } = useGLTF(
    "/models/tired-person-1.glb"
  );
  const { actions } = useAnimations(animations, group);
  const [currentAction, setCurrentAction] = useState("Standing");

  // Audio de bostezo
  const yawnAudio = useRef(null);
  useEffect(() => {
    yawnAudio.current = new window.Audio("/sounds/yawn.mp3");
  }, []);

  // Audio de story y control de reproducción
  const storyAudio = useRef(null);
  const [storyPlaying, setStoryPlaying] = useState(false);
  useEffect(() => {
    storyAudio.current = new window.Audio("/sounds/story.mp3");
    // Cuando termina el audio, permite reproducirlo de nuevo
    storyAudio.current.addEventListener("ended", () => setStoryPlaying(false));
    return () => {
      storyAudio.current.removeEventListener("ended", () =>
        setStoryPlaying(false)
      );
    };
  }, []);

  // Reproduce story.mp3 al presionar "s" solo si no está reproduciéndose
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key.toLowerCase() === "s" && !storyPlaying) {
        if (storyAudio.current) {
          storyAudio.current.currentTime = 0;
          storyAudio.current.play();
          setStoryPlaying(true);
        }
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [storyPlaying]);

  useEffect(() => {
    const action = actions[currentAction];
    if (action) {
      action.reset().fadeIn?.(0.5).play();
      return () => {
        action.fadeOut?.(0.5).stop();
      };
    }
  }, [actions, currentAction]);

  const handlePerson = useCallback(() => {
    setCurrentAction("Yawn");
    if (yawnAudio.current) {
      yawnAudio.current.currentTime = 0;
      yawnAudio.current.play();
    }
    setTimeout(() => {
      setCurrentAction("Standing");
    }, 10000);
  }, []);

  return (
    <group ref={group} {...props} dispose={null} onClick={handlePerson}>
      <group name="Scene">
        <group name="Armature">
          {/* ...resto del modelo... */}
          <skinnedMesh
            name="EyeLeft"
            geometry={nodes.EyeLeft.geometry}
            material={materials.Wolf3D_Eye}
            skeleton={nodes.EyeLeft.skeleton}
            morphTargetDictionary={nodes.EyeLeft.morphTargetDictionary}
            morphTargetInfluences={nodes.EyeLeft.morphTargetInfluences}
            castShadow
          />
          <skinnedMesh
            name="EyeRight"
            geometry={nodes.EyeRight.geometry}
            material={materials.Wolf3D_Eye}
            skeleton={nodes.EyeRight.skeleton}
            morphTargetDictionary={nodes.EyeRight.morphTargetDictionary}
            morphTargetInfluences={nodes.EyeRight.morphTargetInfluences}
            castShadow
          />
          <skinnedMesh
            name="Wolf3D_Body"
            geometry={nodes.Wolf3D_Body.geometry}
            material={materials.Wolf3D_Body}
            skeleton={nodes.Wolf3D_Body.skeleton}
            castShadow
          />
          <skinnedMesh
            name="Wolf3D_Hair"
            geometry={nodes.Wolf3D_Hair.geometry}
            material={materials.Wolf3D_Hair}
            skeleton={nodes.Wolf3D_Hair.skeleton}
            castShadow
          />
          <skinnedMesh
            name="Wolf3D_Head"
            geometry={nodes.Wolf3D_Head.geometry}
            material={materials.Wolf3D_Skin}
            skeleton={nodes.Wolf3D_Head.skeleton}
            morphTargetDictionary={nodes.Wolf3D_Head.morphTargetDictionary}
            morphTargetInfluences={nodes.Wolf3D_Head.morphTargetInfluences}
            castShadow
          />
          <skinnedMesh
            name="Wolf3D_Outfit_Bottom"
            geometry={nodes.Wolf3D_Outfit_Bottom.geometry}
            material={materials.Wolf3D_Outfit_Bottom}
            skeleton={nodes.Wolf3D_Outfit_Bottom.skeleton}
            castShadow
          />
          <skinnedMesh
            name="Wolf3D_Outfit_Footwear"
            geometry={nodes.Wolf3D_Outfit_Footwear.geometry}
            material={materials.Wolf3D_Outfit_Footwear}
            skeleton={nodes.Wolf3D_Outfit_Footwear.skeleton}
            castShadow
          />
          <skinnedMesh
            name="Wolf3D_Outfit_Top"
            geometry={nodes.Wolf3D_Outfit_Top.geometry}
            material={materials.Wolf3D_Outfit_Top}
            skeleton={nodes.Wolf3D_Outfit_Top.skeleton}
            castShadow
          />
          <skinnedMesh
            name="Wolf3D_Teeth"
            geometry={nodes.Wolf3D_Teeth.geometry}
            material={materials.Wolf3D_Teeth}
            skeleton={nodes.Wolf3D_Teeth.skeleton}
            morphTargetDictionary={nodes.Wolf3D_Teeth.morphTargetDictionary}
            morphTargetInfluences={nodes.Wolf3D_Teeth.morphTargetInfluences}
            castShadow
          />
          <primitive object={nodes.Hips} />
        </group>
      </group>
    </group>
  );
}

useGLTF.preload("/models/tired-person-1.glb");
