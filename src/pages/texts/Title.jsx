import { Html } from "@react-three/drei";
import "./Title.css";

const Title = ({title}) => {
    return(
     <Html
     center
     position={[0, 3, 0]}
     distanceFactor={5}
     wrapperClass="title"
     transform = {true}
     >
        <h1>{title}</h1>
     </Html>
    );

};

export default Title;