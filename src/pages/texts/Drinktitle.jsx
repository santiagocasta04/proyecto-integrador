import React from 'react'
import { Html, Center, Text3D, Text } from "@react-three/drei"
import './Drinktitle.css'

const DrinkTitle = ({
  title,
  mode = "text3d",
  htmlSize = 32,
  fontSize = 0.4,
  position = [0, 2, 0]
}) => {
 
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
    );
  }

  if (mode === "text3d") {
    return (
      <Center position={position}>
        <Text3D
          font="/fonts/Inheritance.json"
          size={0.35}
          height={0.1}
          bevelEnabled
          bevelThickness={0.015}
          bevelSize={0.01}
          bevelOffset={0}
          bevelSegments={6}
          curveSegments={8}
          letterSpacing={-0.03}
          lineHeight={1.1}
          scale={0.8}
          castShadow={false}
          receiveShadow={false}
          center
        >
          {title}
          <meshStandardMaterial
            attach="material"
            color="#b87808ff"
            metalness={0.2}
            roughness={0.3}
            emissive="#000000"
            emissiveIntensity={0}
          />
        </Text3D>
      </Center>
    );
  }


  if (mode === "text2d") {
    return (
      <Text
        position={[2, 1, 0]}
        color="#181003ff"
        anchorX="center"
        anchorY="middle"
        fontSize={fontSize}
        font="/fonts/Inheritance.ttf"
        maxWidth={5}
        lineHeight={1.2}
        scale={0.5}
      >
        {title}
      </Text>
    );
  }

  if(mode === "text2d2"){
    return (
      <Text
        position={[-2, 0.8, 0]}
        color="#211502ff"
        anchorX="center"
        anchorY="middle"
        fontSize={fontSize}
        font="/fonts/Inheritance.ttf"
        maxWidth={5}
        lineHeight={1.2}
        scale={0.5}
      >
        {title}
      </Text>
    );
  }

  if(mode === "text2d3"){
    return (
      <Text
        position={[0, 2, 0]}
        color="#5e4434ff"
        anchorX="center"
        anchorY="middle"
        fontSize={fontSize}
        font="/fonts/Inheritance.ttf"
        maxWidth={10}
        lineHeight={1}
        textAlign='center'
        scale={0.6}
      >
        {title}
      </Text>
    );
  }
  return null;
};

export default DrinkTitle;