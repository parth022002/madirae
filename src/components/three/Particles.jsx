"use client";

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";

export default function Particles() {
  const ref = useRef();
  const positions = useMemo(() => {
    const values = new Float32Array(180 * 3);
    for (let i = 0; i < values.length; i += 3) {
      values[i] = (Math.random() - 0.5) * 8;
      values[i + 1] = (Math.random() - 0.5) * 5;
      values[i + 2] = (Math.random() - 0.5) * 8;
    }
    return values;
  }, []);

  useFrame((_, delta) => {
    if (ref.current) ref.current.rotation.y += delta * 0.05;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={positions.length / 3} array={positions} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial size={0.025} color="#d9a441" transparent opacity={0.55} />
    </points>
  );
}
