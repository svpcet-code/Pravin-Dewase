"use client";

import { Suspense, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

function GoldenParticles({ count = 200 }: { count?: number }) {
  const mesh = useRef<THREE.Points>(null);
  const positions = new Float32Array(count * 3);
  const speeds = new Float32Array(count);

  for (let i = 0; i < count; i++) {
    positions[i * 3] = (Math.random() - 0.5) * 20;
    positions[i * 3 + 1] = (Math.random() - 0.5) * 20;
    positions[i * 3 + 2] = (Math.random() - 0.5) * 10;
    speeds[i] = 0.002 + Math.random() * 0.008;
  }

  useFrame(() => {
    if (!mesh.current) return;
    const pos = mesh.current.geometry.attributes.position.array as Float32Array;
    for (let i = 0; i < count; i++) {
      pos[i * 3 + 1] += speeds[i];
      if (pos[i * 3 + 1] > 10) pos[i * 3 + 1] = -10;
    }
    mesh.current.geometry.attributes.position.needsUpdate = true;
    mesh.current.rotation.y += 0.0003;
  });

  return (
    <points ref={mesh}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
          count={count}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.04}
        color="#d4af37"
        transparent
        opacity={0.6}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
}

function Stars() {
  const group = useRef<THREE.Group>(null);

  useFrame(() => {
    if (group.current) group.current.rotation.z += 0.0001;
  });

  const stars = Array.from({ length: 80 }, (_, i) => ({
    x: (Math.random() - 0.5) * 30,
    y: (Math.random() - 0.5) * 20,
    z: -5 - Math.random() * 5,
    size: 0.02 + Math.random() * 0.04,
    opacity: 0.3 + Math.random() * 0.5,
  }));

  return (
    <group ref={group}>
      {stars.map((star, i) => (
        <mesh key={i} position={[star.x, star.y, star.z]}>
          <sphereGeometry args={[star.size, 4, 4]} />
          <meshBasicMaterial color="#f4e4bc" transparent opacity={star.opacity} />
        </mesh>
      ))}
    </group>
  );
}

function Scene3D() {
  return (
    <>
      <ambientLight intensity={0.2} />
      <GoldenParticles count={180} />
      <Stars />
    </>
  );
}

export function AmbientBackground() {
  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      <div className="absolute inset-0 night-gradient" />
      <div
        className="absolute inset-0 light-leak opacity-60"
        style={{ "--leak-x": "30%", "--leak-y": "20%" } as React.CSSProperties}
      />
      <div
        className="absolute inset-0 light-leak opacity-40"
        style={{ "--leak-x": "70%", "--leak-y": "60%" } as React.CSSProperties}
      />

      <div className="absolute inset-0 opacity-40">
        <Suspense fallback={null}>
          <Canvas
            camera={{ position: [0, 0, 5], fov: 60 }}
            dpr={[1, 1.5]}
            gl={{ alpha: true, antialias: true }}
            style={{ background: "transparent" }}
          >
            <Scene3D />
          </Canvas>
        </Suspense>
      </div>

      <FloatingSparkles />
    </div>
  );
}

function FloatingSparkles() {
  const sparkles = Array.from({ length: 30 }, (_, i) => ({
    id: i,
    left: `${Math.random() * 100}%`,
    top: `${Math.random() * 100}%`,
    delay: Math.random() * 5,
    duration: 3 + Math.random() * 4,
    size: 2 + Math.random() * 3,
  }));

  return (
    <>
      {sparkles.map((s) => (
        <div
          key={s.id}
          className="absolute rounded-full bg-royal-gold/60 animate-pulse"
          style={{
            left: s.left,
            top: s.top,
            width: s.size,
            height: s.size,
            animationDelay: `${s.delay}s`,
            animationDuration: `${s.duration}s`,
            boxShadow: "0 0 8px rgba(212,175,55,0.5)",
          }}
        />
      ))}
    </>
  );
}
