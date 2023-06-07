import { usePlane } from "@react-three/cannon";
import { MeshReflectorMaterial } from "@react-three/drei";
import { useLoader } from "@react-three/fiber";
import { useEffect, useRef } from "react";
import { BufferAttribute } from "three";
import { TextureLoader } from "three/src/loaders/TextureLoader";

export function Ground() {
  const [ref] = usePlane(() => ({ type: "Static", rotation: [-Math.PI / 2, 0, 0] }), useRef(null));

  const alphaMap = useLoader(TextureLoader, process.env.PUBLIC_URL + "/textures/alpha-map.png");

  const meshRef = useRef(null);
  const meshRef2 = useRef(null);

  useEffect(() => {
    if (!meshRef.current) return;

    var uvs = meshRef.current.geometry.attributes.uv.array;
    meshRef.current.geometry.setAttribute("uv2", new BufferAttribute(uvs, 2));

    var uvs2 = meshRef2.current.geometry.attributes.uv.array;
    meshRef2.current.geometry.setAttribute("uv2", new BufferAttribute(uvs2, 2));
  }, [meshRef.current]);

  return (
    <>
      <mesh
        ref={meshRef2}
        position={[-2.285, -0.014, -0.900]}
        rotation-x={-Math.PI * 0.5}
        receiveShadow // Enable shadow receiving
      >
        <planeGeometry args={[12, 10]} />
        <meshBasicMaterial opacity={2.625} transparent color={"green"} />
      </mesh>

      <mesh
        ref={meshRef}
        position={[-2.285, -0.012, -0.900]}
        rotation-x={-Math.PI * 0.5}
        receiveShadow // Enable shadow receiving
      >
        <planeGeometry args={[12, 10]} />
        <MeshReflectorMaterial
          alphaMap={alphaMap}
          transparent
          color={[0, 1, 0]}
          envMapIntensity={0.35}
          roughness={0.4}
          blur={[1024, 512]}
          mixBlur={3}
          mixStrength={0}
          mixContrast={1}
          resolution={1024}
          mirror={0}
          depthScale={0}
          minDepthThreshold={0.9}
          maxDepthThreshold={1}
          depthToBlurRatioBias={0.25}
          debug={0}
          reflectorOffset={0.02}
          receiveShadow // Enable shadow receiving
        ></MeshReflectorMaterial>
      </mesh>
    </>
  );
}
