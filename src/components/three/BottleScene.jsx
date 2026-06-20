"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Float, OrbitControls, Environment } from "@react-three/drei";
import { useRef } from "react";
import Lighting from "@/components/three/Lighting";
import Particles from "@/components/three/Particles";

function BottleModel() {
  const group = useRef();

  useFrame((_, delta) => {
    if (group.current) group.current.rotation.y += delta * 0.32;
  });

  return (
    <Float speed={1.6} rotationIntensity={0.22} floatIntensity={0.32}>
      <group ref={group}>
        <mesh position={[0, -0.25, 0]}>
          <cylinderGeometry args={[0.68, 0.78, 2.45, 96]} />
          <meshStandardMaterial color="#14100d" roughness={0.38} metalness={0.25} />
        </mesh>
        <mesh position={[0, 1.05, 0]}>
          <cylinderGeometry args={[0.28, 0.36, 0.95, 96]} />
          <meshStandardMaterial color="#0a0908" roughness={0.32} metalness={0.2} />
        </mesh>
        <mesh position={[0, 1.6, 0]}>
          <cylinderGeometry args={[0.36, 0.36, 0.16, 96]} />
          <meshStandardMaterial color="#d9a441" roughness={0.18} metalness={0.85} />
        </mesh>
        <mesh position={[0, -0.12, 0.785]}>
          <boxGeometry args={[1.05, 1.1, 0.035]} />
          <meshStandardMaterial color="#4b1019" roughness={0.24} metalness={0.12} />
        </mesh>
        <mesh position={[0, -0.12, 0.81]}>
          <torusGeometry args={[0.32, 0.014, 16, 100]} />
          <meshStandardMaterial color="#d9a441" metalness={0.9} roughness={0.18} />
        </mesh>
      </group>
    </Float>
  );
}

export default function BottleScene() {
  return (
    <div className="h-[520px] w-full overflow-hidden border border-gold/20 bg-black/50">
      <Canvas camera={{ position: [0, 0.45, 5], fov: 38 }} dpr={[1, 1.75]}>
        <Lighting />
        <Particles />
        <BottleModel />
        <Environment preset="night" />
        <OrbitControls enablePan={false} minDistance={3.5} maxDistance={6} autoRotate autoRotateSpeed={0.65} />
      </Canvas>
    </div>
  );
}
