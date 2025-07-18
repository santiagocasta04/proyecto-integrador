import { Html, Text, Text3D, Center } from "@react-three/drei";
import "./Title.css";

const Title = ({ title, mode = "text", fontSize = 18, position = [0, 3, 0] }) => {
  if (mode === "html") {
    return (
      <Html
        center
        position={position}  
        distanceFactor={5}
        wrapperClass="title"
        transform
      >
        <h1 style={{ fontSize: `${fontSize}px` }}>{title}</h1>
      </Html>
    );
  }

  if (mode === "text3d") {
    return (
      <Center position={[0, -1, 1]}>
        <Text3D
          font="/fonts/Inheritance.json"
          bevelEnabled
          bevelSize={0.02}
          bevelThickness={0.05}
          height={0.1}
          lineHeight={1.1}
          letterSpacing={-0.02}
          size={0.4}
        >
          {title}
          <meshStandardMaterial color="#FFBFD1" />
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

export default Title;
