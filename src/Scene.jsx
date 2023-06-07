import React from "react";
import { Environment, OrbitControls, PerspectiveCamera, SpotLight } from "@react-three/drei";
import { Suspense, useState, useEffect } from "react";
import { Track } from "./Track";
import { Ground } from "./Ground";
import { Car } from "./Car";
import { Blimp } from "./Blimp";
import { Pit } from "./Pit";

export function Scene() {
  const [cameraPosition, setCameraPosition] = useState([-6, 3.9, 6.21]);
  const [thirdPerson, setThirdPerson] = useState(false);
  const [topView, setTopView] = useState(false);

  useEffect(() => {
    function keydownHandler(e) {
      if (e.key === "1") {
        if (thirdPerson) setCameraPosition([-6, 3.9, 6.21 + Math.random() * 0.01]);
        setThirdPerson(!thirdPerson);
        setTopView(false);
      } else if (e.key === "2") {
        if (topView) setCameraPosition([-6, 3.9, 6.21 + Math.random() * 0.01]);
        setThirdPerson(false);
        setTopView(!topView);
      } 
    }

    window.addEventListener("keydown", keydownHandler);
    return () => window.removeEventListener("keydown", keydownHandler);
  }, [thirdPerson, topView]);

  return (
    <Suspense fallback={null}>
      <Environment
        files={process.env.PUBLIC_URL + "/textures/envmap.hdr"}
        background={"both"}
      />

      <PerspectiveCamera makeDefault position={cameraPosition} fov={40} />
      {!thirdPerson && !topView && (
        <OrbitControls target={[-2.64, -0.71, 0.03]} />
      )}

      <Track receiveShadow />
      <Ground />
      <Car thirdPerson={thirdPerson} topView={topView} />
      <Blimp />
      <Pit />

      <SpotLight
        intensity={1} // Adjust the intensity as needed
        position={[10, 10, 10]} // Adjust the position as needed
        angle={Math.PI / 6} // Adjust the spotlight angle as needed
        penumbra={0.1} // Adjust the penumbra as needed
        castShadow // Enable shadow casting for the spotlight
      />
    </Suspense>
  );
}
