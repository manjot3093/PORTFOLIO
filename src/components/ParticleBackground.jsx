import { useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";

function Particles({ count = 1400 }) {
  const pointsRef = useRef();
  const mouse = useRef({ x: 0, y: 0 });

  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      arr[i * 3] = (Math.random() - 0.5) * 18;
      arr[i * 3 + 1] = (Math.random() - 0.5) * 10;
      arr[i * 3 + 2] = (Math.random() - 0.5) * 12;
    }
    return arr;
  }, [count]);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (pointsRef.current) {
      pointsRef.current.rotation.y = t * 0.02 + mouse.current.x * 0.3;
      pointsRef.current.rotation.x = mouse.current.y * 0.2;
    }
  });

  const onMove = (e) => {
    mouse.current.x = (e.clientX / window.innerWidth) * 2 - 1;
    mouse.current.y = (e.clientY / window.innerHeight) * 2 - 1;
  };

  return (
    <points ref={pointsRef} onPointerMove={onMove}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={positions.length / 3}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.035}
        color="#8b5cf6"
        transparent
        opacity={0.7}
        sizeAttenuation
      />
    </points>
  );
}

export default function ParticleBackground() {
  return (
    <div className="absolute inset-0 -z-10" onMouseMove={() => {}}>
      <Canvas
        camera={{ position: [0, 0, 6], fov: 60 }}
        onPointerMove={(e) => {
          window.__mouseX = e.clientX;
        }}
      >
        <ambientLight intensity={0.5} />
        <Particles />
      </Canvas>
    </div>
  );
}
