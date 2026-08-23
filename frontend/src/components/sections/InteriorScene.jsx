import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, Float } from "@react-three/drei";
import { useRef } from "react";
import * as THREE from "three";

function LuxuryInterior() {
  const meshRef = useRef();

  useFrame((state) => {
    meshRef.current.rotation.y += 0.002;
    meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.3) * 0.1;
  });

  return (
    <Float speed={2} rotationIntensity={1} floatIntensity={2}>
      <mesh ref={meshRef}>
        <torusKnotGeometry args={[1.2, 0.35, 200, 32]} />
        <meshPhysicalMaterial
          color="#0a0a0a"
          metalness={1}
          roughness={0.2}
          clearcoat={1}
          clearcoatRoughness={0}
          reflectivity={1}
        />
      </mesh>
    </Float>
  );
}

export default function InteriorScene() {
  return (
    <Canvas camera={{ position: [0, 0, 4], fov: 50 }}>
      <color attach="background" args={["#000000"]} />

      {/* Luxury Lighting */}
      <ambientLight intensity={0.3} />
      <spotLight
        position={[5, 5, 5]}
        angle={0.3}
        penumbra={1}
        intensity={3}
        color="#FFD700"
      />

      <LuxuryInterior />
      <Environment preset="night" />
      <fog attach="fog" args={["#000000", 5, 10]} />
    </Canvas>
  );
}
