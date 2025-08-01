import React, { useCallback, useEffect, useRef, useState } from 'react'
import { useGLTF, useAnimations } from '@react-three/drei'
import { AudioListener, PositionalAudio, AudioLoader } from 'three'

export default function PersonFight(props) {
  const group = useRef()
  const soundRef = useRef()
  const { nodes, materials, animations } = useGLTF('/models/Fightperson.glb')
  const { actions } = useAnimations(animations, group)

  const [hasPlayed, setHasPlayed] = useState(false)
   useEffect(() => {
      const listener = new AudioListener()
      const sound = new PositionalAudio(listener)
      const loader = new AudioLoader()
  
      loader.load('/sounds/soundfight.wav', (buffer) => {
        sound.setBuffer(buffer)
        sound.setRefDistance(2)
        sound.setVolume(1)
        soundRef.current = sound
        group.current?.add(sound)
      })
    }, [])

  useEffect(() => {
      const idleAction = actions["Fight"]
      if (idleAction && !hasPlayed) {
        idleAction.reset().fadeIn(0.2).play()
        idleAction.paused = true
      }
    }, [actions, hasPlayed])

      useEffect(() => {
          const idleAction = actions["Scene"]
          if (idleAction && !hasPlayed) {
            idleAction.reset().fadeIn(0.2).play()
            idleAction.paused = true
          }
        }, [actions, hasPlayed])

        const handlePerson = useCallback(() => {
            const anim1 = actions["Fight"]
        
            if (anim1) {
            anim1.reset().fadeIn(0.2).play()
            anim1.paused = false // asegúrate de que no esté pausada
          }

          if (soundRef.current && !soundRef.current.isPlaying) {
            soundRef.current.play()
          }

           setHasPlayed(true)
          }, [actions])

   return (
    <group ref={group} {...props} dispose={null} scale={3} onClick={handlePerson}>
      <group name="Scene">
        <group
          name="Sketchfab_model"
          position={[0.013, -0.05, 0.271]}
          rotation={[-Math.PI / 2, 0, -1.559]}
          scale={0.003}>
          <group name="b35fffae9f624579a0117d7219aee4f6fbx" rotation={[Math.PI / 2, 0, 0]}>
            <group name="Object_2">
              <group name="RootNode">
                <group
                  name="Object_4"
                  position={[-90.086, -5.835, 80.17]}
                  rotation={[-2.976, 0.86, 3.068]}>
                  <group name="Object001" position={[0.756, 0, 11.801]} />
                  <group name="Object002" position={[0.756, 0, 11.801]} />
                  <group name="Object003" position={[0.756, 0, 11.801]} />
                  <group name="Object004" position={[0.756, 0, 11.801]} />
                  <group name="Object005" position={[0.756, 0, 11.801]} />
                  <group name="Object006" position={[0.756, 0, 11.801]} />
                  <group name="Object008" position={[0.756, 0, 11.801]} />
                  <group name="Object009" position={[0.756, 0, 11.801]} />
                  <group name="Object010" position={[0.756, 0, 11.801]} />
                  <group name="Object011" position={[0.756, 0, 11.801]} />
                  <group name="Object012" position={[0.756, 0, 11.801]} />
                  <group name="Object013" position={[0.756, 0, 11.801]} />
                  <group name="Object014" position={[0.756, 0, 11.801]} />
                  <group name="Object015" position={[0.756, 0, 11.801]} />
                  <group name="Object016" position={[0.756, 0, 11.801]} />
                  <group name="Object017" position={[0.756, 0, 11.801]} />
                  <group name="Object018" position={[0.756, 0, 11.801]} />
                  <group name="Object019" position={[0.756, 0, 11.801]} />
                  <group name="Object020" position={[0.756, 0, 11.801]} />
                  <group name="Object021" position={[0.756, 0, 11.801]} />
                  <group name="Object_10" position={[0.966, 0, -0.944]} />
                  <skinnedMesh
                    name="Object_11"
                    geometry={nodes.Object_11.geometry}
                    material={materials.Material_32}
                    skeleton={nodes.Object_11.skeleton}
                    castShadow
                    receiveShadow
                  />
                  <group name="Object_12" position={[0.966, 0, -0.944]} />
                  <skinnedMesh
                    name="Object_13"
                    geometry={nodes.Object_13.geometry}
                    material={materials.Material_31}
                    skeleton={nodes.Object_13.skeleton}
                    castShadow
                    receiveShadow
                  />
                  <group name="Object_14" position={[0.966, 0, -0.944]} />
                  <skinnedMesh
                    name="Object_15"
                    geometry={nodes.Object_15.geometry}
                    material={materials.Material_33}
                    skeleton={nodes.Object_15.skeleton}
                    castShadow
                    receiveShadow
                  />
                  <group name="Object_16" position={[0.966, 0, -0.944]} />
                  <skinnedMesh
                    name="Object_17"
                    geometry={nodes.Object_17.geometry}
                    material={materials.Material_35}
                    skeleton={nodes.Object_17.skeleton}
                    castShadow
                    receiveShadow
                  />
                  <group name="Object_18" position={[0.966, 0, -0.944]} />
                  <skinnedMesh
                    name="Object_19"
                    geometry={nodes.Object_19.geometry}
                    material={materials.Material_37}
                    skeleton={nodes.Object_19.skeleton}
                    castShadow
                    receiveShadow
                  />
                  <group name="Object_20" position={[0.966, 0, -0.944]} />
                  <skinnedMesh
                    name="Object_21"
                    geometry={nodes.Object_21.geometry}
                    material={materials.Material_36}
                    skeleton={nodes.Object_21.skeleton}
                    castShadow
                    receiveShadow
                  />
                  <group name="Object_22" position={[0.966, 0, -0.944]} />
                  <skinnedMesh
                    name="Object_23"
                    geometry={nodes.Object_23.geometry}
                    material={materials.material_0}
                    skeleton={nodes.Object_23.skeleton}
                    castShadow
                    receiveShadow
                  />
                  <group name="Object_24" position={[0.966, 0, -0.944]} />
                  <skinnedMesh
                    name="Object_25"
                    geometry={nodes.Object_25.geometry}
                    material={materials.material_0}
                    skeleton={nodes.Object_25.skeleton}
                    castShadow
                    receiveShadow
                  />
                  <group name="Object_26" position={[0.966, 0, -0.944]} />
                  <skinnedMesh
                    name="Object_27"
                    geometry={nodes.Object_27.geometry}
                    material={materials.material_0}
                    skeleton={nodes.Object_27.skeleton}
                    castShadow
                    receiveShadow
                  />
                  <group name="Object_28" position={[0.966, 0, -0.944]} />
                  <skinnedMesh
                    name="Object_29"
                    geometry={nodes.Object_29.geometry}
                    material={materials.Material_29}
                    skeleton={nodes.Object_29.skeleton}
                    castShadow
                    receiveShadow
                  />
                  <group name="Object_30" position={[0.966, 0, -0.944]} />
                  <skinnedMesh
                    name="Object_31"
                    geometry={nodes.Object_31.geometry}
                    material={materials.material_0}
                    skeleton={nodes.Object_31.skeleton}
                    castShadow
                    receiveShadow
                  />
                  <group name="Object_32" position={[0.966, 0, -0.944]} />
                  <skinnedMesh
                    name="Object_33"
                    geometry={nodes.Object_33.geometry}
                    material={materials.material_0}
                    skeleton={nodes.Object_33.skeleton}
                    castShadow
                    receiveShadow
                  />
                  <group name="Object_34" position={[0.966, 0, -0.944]} />
                  <skinnedMesh
                    name="Object_35"
                    geometry={nodes.Object_35.geometry}
                    material={materials.material_0}
                    skeleton={nodes.Object_35.skeleton}
                    castShadow
                    receiveShadow
                  />
                  <group name="Object_36" position={[0.966, 0, -0.944]} />
                  <skinnedMesh
                    name="Object_37"
                    geometry={nodes.Object_37.geometry}
                    material={materials.Material_30}
                    skeleton={nodes.Object_37.skeleton}
                    castShadow
                    receiveShadow
                  />
                  <group name="Object_38" position={[0.966, 0, -0.944]} />
                  <skinnedMesh
                    name="Object_39"
                    geometry={nodes.Object_39.geometry}
                    material={materials.Material_34}
                    skeleton={nodes.Object_39.skeleton}
                    castShadow
                    receiveShadow
                  />
                  <group name="Object_40" position={[0.966, 0, -0.944]} />
                  <skinnedMesh
                    name="Object_41"
                    geometry={nodes.Object_41.geometry}
                    material={materials.Material_45}
                    skeleton={nodes.Object_41.skeleton}
                    castShadow
                    receiveShadow
                  />
                  <group name="Object_42" position={[0.966, 0, -0.944]} />
                  <skinnedMesh
                    name="Object_43"
                    geometry={nodes.Object_43.geometry}
                    material={materials.Material_44}
                    skeleton={nodes.Object_43.skeleton}
                    castShadow
                    receiveShadow
                  />
                  <group name="Object_44" position={[0.966, 0, -0.944]} />
                  <skinnedMesh
                    name="Object_45"
                    geometry={nodes.Object_45.geometry}
                    material={materials.Material_43}
                    skeleton={nodes.Object_45.skeleton}
                    castShadow
                    receiveShadow
                  />
                  <group name="Object_6" position={[0.966, 0, -0.944]} />
                  <skinnedMesh
                    name="Object_7"
                    geometry={nodes.Object_7.geometry}
                    material={materials.Material_26}
                    skeleton={nodes.Object_7.skeleton}
                    castShadow
                    receiveShadow
                  />
                  <group name="Object_8" position={[0.966, 0, -0.944]} />
                  <skinnedMesh
                    name="Object_9"
                    geometry={nodes.Object_9.geometry}
                    material={materials.Material_25}
                    skeleton={nodes.Object_9.skeleton}
                    castShadow
                    receiveShadow
                  />
                  <group name="������" rotation={[-Math.PI / 2, 0, 0]} />
                  <group name="���������" rotation={[-Math.PI / 2, 0, 0]} />
                  <primitive object={nodes._rootJoint} />
                </group>
              </group>
            </group>
          </group>
        </group>
        <group
          name="Sketchfab_model001"
          position={[0.349, -0.02, 0.007]}
          rotation={[-Math.PI / 2, 0, 1.375]}
          scale={0.001}>
          <group name="trainingDummyfbx" rotation={[Math.PI / 2, 0, 0]}>
            <group name="RootNode001">
              <group
                name="Sphere"
                position={[-2.907, 111.153, 0]}
                rotation={[Math.PI / 2, 0, -Math.PI]}
                scale={102.431}>
                <mesh
                  name="Sphere_Material_0"
                  castShadow
                  receiveShadow
                  geometry={nodes.Sphere_Material_0.geometry}
                  material={materials['Material.001']}
                />
                <mesh
                  name="Sphere_UV_0"
                  castShadow
                  receiveShadow
                  geometry={nodes.Sphere_UV_0.geometry}
                  material={materials.material}
                />
              </group>
            </group>
          </group>
        </group>
      </group>
    </group>
  )
}

useGLTF.preload('./models/Fightperson.glb')
