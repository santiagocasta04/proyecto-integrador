import * as THREE from "three";
import { useVideoTexture } from "@react-three/drei";

const VideoHospital = () => {
  const texture = useVideoTexture("/videos/hospital.mp4", {
    muted: true,
    loop: true,
    autoplay: true,
    crossOrigin: "anonymous",
  });

  return (
    <mesh position={[0, 2, -5]}>
      <cylinderGeometry
        args={[30, 30, 30, 6, 1, true, Math.PI / 2, Math.PI]} // Pantalla semicircular
      />
      <meshBasicMaterial
        map={texture}
        toneMapped={false}
        side={THREE.BackSide} // Mostrar la cara interior de la geometría
      />
    </mesh>
  );
};

export default VideoHospital;