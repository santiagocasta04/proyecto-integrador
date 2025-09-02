import React, {
  forwardRef,
  useImperativeHandle,
  useRef,
  useCallback,
} from "react";
import { useFrame } from "@react-three/fiber";
import { RigidBody, CapsuleCollider } from "@react-three/rapier";
import * as THREE from "three";

const Capsule = forwardRef(({ position = [0, 1, 4], onCollision }, ref) => {
  const capsuleRef = useRef();
  const initialPosition = new THREE.Vector3(...position);
  const hasCollidedRef = useRef(false);

  useImperativeHandle(ref, () => ({
    launchTowards(targetPosition) {
      if (capsuleRef.current) {
        const capsulePos = capsuleRef.current.translation();
        const dir = {
          x: targetPosition.x - capsulePos.x,
          y: targetPosition.y - capsulePos.y,
          z: targetPosition.z - capsulePos.z,
        };
        const length = Math.sqrt(dir.x ** 2 + dir.y ** 2 + dir.z ** 2);
        const normalized = {
          x: dir.x / length,
          y: dir.y / length,
          z: dir.z / length,
        };
        const speed = 10;
        capsuleRef.current.setLinvel(
          {
            x: normalized.x * speed,
            y: normalized.y * speed,
            z: normalized.z * speed,
          },
          true
        );
        hasCollidedRef.current = false;
      }
    },
    resetPosition() {
      if (capsuleRef.current) {
        capsuleRef.current.setTranslation(initialPosition, true);
        capsuleRef.current.setLinvel({ x: 0, y: 0, z: 0 }, true);
        capsuleRef.current.setAngvel({ x: 0, y: 0, z: 0 }, true);
        hasCollidedRef.current = false;
      }
    },
  }));

  useFrame(() => {
    if (capsuleRef.current) {
      const pos = capsuleRef.current.translation();
      if (pos.y < -10) {
        capsuleRef.current.setTranslation(initialPosition, true);
        capsuleRef.current.setLinvel({ x: 0, y: 0, z: 0 }, true);
        capsuleRef.current.setAngvel({ x: 0, y: 0, z: 0 }, true);
        hasCollidedRef.current = false;
      }
    }
  });

  const handleCollision = useCallback(
    (event) => {
      if (hasCollidedRef.current) return;
      const otherName = event.other.rigidBodyObject?.name;
      if (otherName && onCollision) {
        hasCollidedRef.current = true;
        onCollision(otherName);
      }
    },
    [onCollision]
  );

  return (
    <RigidBody
      ref={capsuleRef}
      colliders={false}
      position={position}
      type="dynamic"
      name="capsule"
      onCollisionEnter={handleCollision}
    >
      <mesh castShadow receiveShadow scale={[0.5, 0.5, 0.5]}>
        <capsuleGeometry args={[0.5, 1.5, 8, 16]} />
        <meshStandardMaterial color="skyblue" />
      </mesh>
      <CapsuleCollider args={[-0.1, 0.6 ]} />
    </RigidBody>
  );
});

export default Capsule;
