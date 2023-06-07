import React, { useRef } from "react";
import { useLoader, useFrame } from "@react-three/fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

export function Pit() {
  const meshRef = useRef();

  const mesh = useLoader(
    GLTFLoader,
    process.env.PUBLIC_URL + "/models/pit.glb"
  ).scene;

  useFrame(() => {
    meshRef.current.position.set(-2, 0, 1.2); // Update the position of the mesh
    meshRef.current.rotation.y = -Math.PI / 2; // Rotate by 90 degrees
    mesh.scale.set(0.14, 0.14, 0.14);
  });

  return (
    <primitive
      object={mesh}
      ref={meshRef}
      scale={[0.018, 0.018, 0.018]}
    />
  );
}
