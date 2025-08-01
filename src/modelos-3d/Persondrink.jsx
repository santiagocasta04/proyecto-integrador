import React, { useCallback, useEffect, useRef, useState } from 'react'
import { useGLTF, useAnimations } from '@react-three/drei'
import { AudioListener, PositionalAudio, AudioLoader } from 'three'

export default function Persondrink(props) {
  const group = useRef()
  const soundRef = useRef()
  const { nodes, materials, animations } = useGLTF('/models/Personbeer2glb.glb')
  const { actions } = useAnimations(animations, group)

  const [hasPlayed, setHasPlayed] = useState(false)


  useEffect(() => {
    const listener = new AudioListener()
    const sound = new PositionalAudio(listener)
    const loader = new AudioLoader()

    loader.load('/sounds/drinkbeersound.wav', (buffer) => {
      sound.setBuffer(buffer)
      sound.setRefDistance(2)
      sound.setVolume(1)
      soundRef.current = sound
      group.current?.add(sound)
    })
  }, [])


  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key.toLowerCase() === 'd' && soundRef.current && !soundRef.current.isPlaying) {
        soundRef.current.play()
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])


  useEffect(() => {
    const idleAction = actions["Scene"]
    if (idleAction && !hasPlayed) {
      idleAction.reset().fadeIn(0.2).play()
      idleAction.paused = true
    }
  }, [actions, hasPlayed])

  const handlePerson = useCallback(() => {
    const anim1 = actions["Scene"]
    const anim2 = actions["bottleBeerAction"]

    if (anim1) anim1.reset().fadeIn(0.2).play()
    if (anim2) anim2.reset().fadeIn(0.2).play()

    setHasPlayed(true)
  }, [actions])

  return (
    <group ref={group} {...props} dispose={null} onClick={handlePerson}>
      <group name="Scene">
        <group name="Sketchfab_model" rotation={[-Math.PI / 2, 0, 0]} scale={0.012}>
          <group name="8410255df86346a6b7a7a6ba09589b6efbx" rotation={[Math.PI / 2, 0, 0]}>
            <group name="Object_2">
              <group name="RootNode">
                <group name="Full_animation">
                  <group name="Object_5" scale={0.625}>
                    <group name="Object_85" position={[-0.001, 92.271, -0.196]} />
                    <skinnedMesh
                      name="Object_86"
                      castShadow
                      receiveShadow
                      geometry={nodes.Object_86.geometry}
                      material={materials['hatmetall.002']}
                      skeleton={nodes.Object_86.skeleton}
                    />
                    <skinnedMesh
                      name="Object_87"
                      castShadow
                      receiveShadow
                      geometry={nodes.Object_87.geometry}
                      material={materials['hatmetall.002']}
                      skeleton={nodes.Object_87.skeleton}
                    />
                    <primitive object={nodes._rootJoint} />
                  </group>
                </group>
                <group name="hatmetall_2" />
              </group>
            </group>
          </group>
        </group>
        <mesh
          name="bottleBeer"
          castShadow
          receiveShadow
          geometry={nodes.bottleBeer.geometry}
          material={materials['Scene_-_Root']}
          position={[-0.045, -2.152, 0.444]}
          rotation={[-1.797, -0.017, 0.379]}
          scale={0.873}
        />
      </group>
    </group>
  )
}

useGLTF.preload('/models/Personbeer2glb.glb')