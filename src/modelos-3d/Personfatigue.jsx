import React, { useCallback, useEffect, useRef, useState } from 'react'
import { useGLTF, useAnimations } from '@react-three/drei'
import { AudioListener, PositionalAudio, AudioLoader } from 'three'

export default function Personfatigue(props) {
  const group = useRef()
  const soundRef = useRef()
  const { nodes, materials, animations } = useGLTF('/models/Personfatigue.glb')
  const { actions } = useAnimations(animations, group)

  const [hasPlayed, setHasPlayed] = useState(false)


  useEffect(() => {
    const listener = new AudioListener()
    const sound = new PositionalAudio(listener)
    const loader = new AudioLoader()

    loader.load('/sounds/Cough.wav', (buffer) => {
      sound.setBuffer(buffer)
      sound.setRefDistance(2)
      sound.setVolume(1)
      soundRef.current = sound
      group.current?.add(sound)
    })
  }, [])


  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key.toLowerCase() === 'c' && soundRef.current && !soundRef.current.isPlaying) {
        soundRef.current.play()
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])


  useEffect(() => {
    const idleAction = actions["fatigue"]
    if (idleAction && !hasPlayed) {
      idleAction.reset().fadeIn(0.2).play()
      idleAction.paused = true
    }
  }, [actions, hasPlayed])

  const handlePerson = useCallback(() => {
    const anim1 = actions["fatigue"]
  
    if (anim1) anim1.reset().fadeIn(0.2).play()

    setHasPlayed(true)
  }, [actions])

return (
    <group ref={group} {...props} dispose={null} onClick={handlePerson}>
      <group name="Scene">
        <group name="Sketchfab_model" rotation={[-Math.PI / 2, 0, 0]} scale={0.011}>
          <group name="7865870319ce4c03b897708a27797932fbx" rotation={[Math.PI / 2, 0, 0]}>
            <group name="Object_2">
              <group name="RootNode">
                <group name="Object_4">
                  <group name="Body" />
                  <group name="Bottoms" />
                  <group name="default" />
                  <group name="Eyelashes" />
                  <group name="Eyewear" />
                  <group name="Object_10" />
                  <skinnedMesh
                    name="Object_11"
                    geometry={nodes.Object_11.geometry}
                    material={materials.Bodymat}
                    skeleton={nodes.Object_11.skeleton}
                  />
                  <group name="Object_12" />
                  <skinnedMesh
                    name="Object_13"
                    geometry={nodes.Object_13.geometry}
                    material={materials.Shoesmat}
                    skeleton={nodes.Object_13.skeleton}
                  />
                  <group name="Object_14" />
                  <skinnedMesh
                    name="Object_15"
                    geometry={nodes.Object_15.geometry}
                    material={materials.Eyewearmat}
                    skeleton={nodes.Object_15.skeleton}
                  />
                  <skinnedMesh
                    name="Object_16"
                    geometry={nodes.Object_16.geometry}
                    material={materials.Bottommat}
                    skeleton={nodes.Object_16.skeleton}
                  />
                  <skinnedMesh
                    name="Object_17"
                    geometry={nodes.Object_17.geometry}
                    material={materials.Topmat}
                    skeleton={nodes.Object_17.skeleton}
                  />
                  <group name="Object_6" />
                  <skinnedMesh
                    name="Object_7"
                    geometry={nodes.Object_7.geometry}
                    material={materials.Bodymat}
                    skeleton={nodes.Object_7.skeleton}
                  />
                  <group name="Object_8" />
                  <skinnedMesh
                    name="Object_9"
                    geometry={nodes.Object_9.geometry}
                    material={materials.Bodymat}
                    skeleton={nodes.Object_9.skeleton}
                  />
                  <group name="Shoes" />
                  <group name="Tops" />
                  <primitive object={nodes._rootJoint} />
                </group>
              </group>
            </group>
          </group>
        </group>
        <group
          name="Sketchfab_model001"
          position={[0, 0.003, 0]}
          rotation={[-Math.PI / 2, 0, 3.131]}
          scale={0.425}>
          <group
            name="9ce117bf45d94b7ba9baa13e82589c49fbx"
            rotation={[Math.PI / 2, 0, 0]}
            scale={0.025}>
            <group name="RootNode001">
              <group name="Bolti" rotation={[-Math.PI / 2, 0, 0]} scale={100}>
                <mesh
                  name="Bolti__0"
                  castShadow
                  receiveShadow
                  geometry={nodes.Bolti__0.geometry}
                  material={materials['Scene_-_Root']}
                />
              </group>
              <group name="Fixator" rotation={[-Math.PI / 2, 0, 0]} scale={100}>
                <mesh
                  name="Fixator__0"
                  castShadow
                  receiveShadow
                  geometry={nodes.Fixator__0.geometry}
                  material={materials['Scene_-_Root']}
                />
              </group>
              <group name="Nogi" rotation={[-Math.PI / 2, 0, 0]} scale={100}>
                <mesh
                  name="Nogi__0"
                  castShadow
                  receiveShadow
                  geometry={nodes.Nogi__0.geometry}
                  material={materials['Scene_-_Root']}
                />
              </group>
              <group name="Obod_sidenie" rotation={[-Math.PI / 2, 0, 0]} scale={100}>
                <mesh
                  name="Obod_sidenie__0"
                  castShadow
                  receiveShadow
                  geometry={nodes.Obod_sidenie__0.geometry}
                  material={materials['Scene_-_Root']}
                />
              </group>
              <group name="Obruch" rotation={[-Math.PI / 2, 0, 0]} scale={100}>
                <mesh
                  name="Obruch__0"
                  castShadow
                  receiveShadow
                  geometry={nodes.Obruch__0.geometry}
                  material={materials['Scene_-_Root']}
                />
              </group>
              <group name="Perekladina" rotation={[-Math.PI / 2, 0, 0]} scale={100}>
                <mesh
                  name="Perekladina__0"
                  castShadow
                  receiveShadow
                  geometry={nodes.Perekladina__0.geometry}
                  material={materials['Scene_-_Root']}
                />
              </group>
              <group name="Perekladini" rotation={[-Math.PI / 2, 0, 0]} scale={100}>
                <mesh
                  name="Perekladini__0"
                  castShadow
                  receiveShadow
                  geometry={nodes.Perekladini__0.geometry}
                  material={materials['Scene_-_Root']}
                />
              </group>
              <group
                name="Setka"
                position={[0, -0.2, 0]}
                rotation={[-Math.PI / 2, 0, 0]}
                scale={100}>
                <mesh
                  name="Setka__0"
                  castShadow
                  receiveShadow
                  geometry={nodes.Setka__0.geometry}
                  material={materials['Scene_-_Root']}
                />
              </group>
              <group name="Spinka" rotation={[-Math.PI / 2, 0, 0]} scale={100}>
                <mesh
                  name="Spinka__0"
                  castShadow
                  receiveShadow
                  geometry={nodes.Spinka__0.geometry}
                  material={materials['Scene_-_Root']}
                />
              </group>
            </group>
          </group>
        </group>
      </group>
    </group>
  )
}
useGLTF.preload('/models/Personfatigue.glb')