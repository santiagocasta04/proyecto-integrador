import { Html } from "@react-three/drei";
import "./Fattytitle.css";

const FattyTitle = ({ title }) => {
  return (
    <Html
        center
        position={[0, 3, 0]}
        distanceFactor={5}
        wrapperClass="title-wrapper"
    >
      <h1 className="fatty-title">{title}</h1>
    </Html>
  );
};

export default FattyTitle;