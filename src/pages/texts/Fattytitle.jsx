import React from 'react'
import { Html, Center, Text3D } from "@react-three/drei"
import './Fattytitle.css'

const FattyTitle = ({ title, mode = "text3d", htmlSize = 40, position = [0, 3, 0] }) => {
  if (mode === "html") {
    return (
      <Html
        center
        position={position}
        distanceFactor={5}
        transform
        wrapperClass="html-title-wrapper"
      >
        <h1 className="html-title" style={{ fontSize: `${htmlSize}px` }}>{title}</h1>
      </Html>
    )
  }

  // 3D Text mode (reducido)
  return (
    <Center position={position}>
      <Text3D
        font="/fonts/Inheritance.json"
        size={0.8}
        height={0.15}
        bevelEnabled
        bevelThickness={0.02}
        bevelSize={0.015}
        bevelOffset={0}
        bevelSegments={6}
        curveSegments={8}
        letterSpacing={-0.03}
        lineHeight={1.2}
        scale={0.8}
        castShadow
        receiveShadow
        center
      >
        {title}
        <meshStandardMaterial
          attach="material"
          color="#00ffff"
          metalness={0.5}
          roughness={0.1}
          emissive="#00aaff"
          emissiveIntensity={0.6}
        />
      </Text3D>
    </Center>
  )
}

export default FattyTitle
