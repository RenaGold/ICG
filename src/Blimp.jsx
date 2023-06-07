import React, { useRef } from "react";
import { useLoader, useFrame } from "@react-three/fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

export function Blimp() {
  const meshRef = useRef();
  const radius = 3;
  const speed = 0.02;
  const angle = useRef(0);

  const mesh = useLoader(
    GLTFLoader,
    process.env.PUBLIC_URL + "/models/blimp.glb"
  ).scene;

  useFrame(() => {
    const x = Math.cos(angle.current) * radius;
    const z = Math.sin(angle.current) * radius;

    meshRef.current.position.set(x, 2, z); // Update the position of the mesh

    // Calculate the rotation angle based on movement
    const rotationAngle = -angle.current + Math.PI / 2;

    meshRef.current.rotation.y = rotationAngle; // Apply rotation to the mesh

    angle.current += speed; // Increment the angle for the next frame
  });

  return <primitive object={mesh} ref={meshRef} scale={[0.018, 0.018, 0.018]} />;
}
