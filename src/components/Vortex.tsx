"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

function Particles({ count = 800 }) {
  const mesh = useRef<THREE.InstancedMesh>(null);
  
  const dummy = useMemo(() => new THREE.Object3D(), []);
  
  const particles = useMemo(() => {
    const temp = [];
    for (let i = 0; i < count; i++) {
      const t = Math.random() * 100;
      const factor = 20 + Math.random() * 100;
      const speed = 0.01 + Math.random() / 200;
      const xFactor = -50 + Math.random() * 100;
      const yFactor = -50 + Math.random() * 100;
      const zFactor = -50 + Math.random() * 100;
      
      // Determine if it's an outlier (red node) or aligned (green/teal node)
      const isOutlier = Math.random() > 0.95;
      const color = isOutlier 
        ? new THREE.Color("#ff2a2a") // Alarm Crimson
        : new THREE.Color("#00f0ff"); // Neon Teal
        
      temp.push({ t, factor, speed, xFactor, yFactor, zFactor, mx: 0, my: 0, color });
    }
    return temp;
  }, [count]);

  const colorArray = useMemo(() => {
    const colors = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      particles[i].color.toArray(colors, i * 3);
    }
    return colors;
  }, [particles, count]);

  useFrame((state) => {
    particles.forEach((particle, i) => {
      let { t, factor, speed, xFactor, yFactor, zFactor } = particle;
      t = particle.t += speed / 2;
      const a = Math.cos(t) + Math.sin(t * 1) / 10;
      const b = Math.sin(t) + Math.cos(t * 2) / 10;
      const s = Math.cos(t);
      
      // Vortex motion calculation
      // Radius decreases towards the center over time, creating a suction effect
      const radius = factor + (Math.sin(state.clock.elapsedTime * 0.5) * 5);
      
      dummy.position.set(
        (xFactor + Math.cos((t / 10) * factor) + (Math.sin(t * 1) * factor) / 10) * a,
        (yFactor + Math.sin((t / 10) * factor) + (Math.cos(t * 2) * factor) / 10) * b,
        (zFactor + Math.cos((t / 10) * factor) + (Math.sin(t * 3) * factor) / 10) * s
      );
      
      // Rotate entire system slowly to simulate a spinning vortex
      dummy.rotation.set(s * 5, s * 5, s * 5);
      dummy.scale.set(0.5, 0.5, 0.5);
      dummy.updateMatrix();
      if (mesh.current) {
        mesh.current.setMatrixAt(i, dummy.matrix);
      }
    });
    if (mesh.current) {
      mesh.current.instanceMatrix.needsUpdate = true;
      // Rotate the whole instanced group around the Y axis
      mesh.current.rotation.y += 0.002;
    }
  });

  return (
    <instancedMesh ref={mesh} args={[undefined, undefined, count]}>
      <sphereGeometry args={[0.2, 16, 16]}>
        <instancedBufferAttribute attach="attributes-color" args={[colorArray, 3]} />
      </sphereGeometry>
      <meshBasicMaterial toneMapped={false} vertexColors />
    </instancedMesh>
  );
}

export function Vortex() {
  return (
    <div className="absolute inset-0 z-0 opacity-80 pointer-events-none">
      <Canvas camera={{ fov: 75, position: [0, 0, 80] }} style={{ pointerEvents: 'none' }}>
        <fog attach="fog" args={["#050508", 40, 110]} />
        <ambientLight intensity={0.5} />
        <Particles count={800} />
      </Canvas>
      <div className="absolute inset-0 bg-gradient-to-t from-obsidian via-transparent to-obsidian" />
    </div>
  );
}
