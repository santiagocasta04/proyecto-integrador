import React from 'react'
import { Html, Center, Text3D } from "@react-three/drei"
import './Fattytitle.css'

const FattyTitle = ({ title, mode = "text3d", htmlSize = 40, position = [0, 3, 0] }) => {
  if (mode === "html1") {
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

 if (mode === "text3d") {
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
          color="#043939ff"
          metalness={0.5}
          roughness={0.1}
          emissive="#00080bff"
          emissiveIntensity={0.6}
        />
      </Text3D>
    </Center>
  );
}

return (
    <Text
      position={[0, 1.8, 0]}
      color={"#5A2634"}
      anchorX={"center"}
      anchorY={"middle"}
      fontSize={fontSize}
      font="/fonts/Inheritance.ttf"
    >
      {title}
    </Text>
  );
};

export default FattyTitle
