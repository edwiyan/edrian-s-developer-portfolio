import { useMemo, useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Environment, Float, Lightformer, MeshDistortMaterial } from "@react-three/drei";
import { EffectComposer, Bloom, Vignette } from "@react-three/postprocessing";
import * as THREE from "three";

type Props = {
  /** 0 → 1 as the hero scrolls away; drives zoom and spin. */
  progress: React.MutableRefObject<number>;
  lite: boolean;
  active: boolean;
};

const ACCENT = new THREE.Color("#FF4D2E");
const WARM = new THREE.Color("#FFB36B");

/** Chrome core that warps slowly and reflects ember-coloured light panels. */
function Core({ progress, lite }: Pick<Props, "progress" | "lite">) {
  const group = useRef<THREE.Group>(null);
  const shell = useRef<THREE.Mesh>(null);
  const { pointer, viewport } = useThree();
  const scale = Math.min(1, viewport.width / 6.5);

  useFrame((state, delta) => {
    const g = group.current;
    if (!g) return;
    const p = progress.current;
    // Follow the pointer gently, spin faster as the user scrolls.
    g.rotation.y += delta * (0.15 + p * 1.6);
    g.rotation.x = THREE.MathUtils.damp(g.rotation.x, pointer.y * 0.35, 3, delta);
    g.position.x = THREE.MathUtils.damp(g.position.x, pointer.x * 0.35, 3, delta);
    const s = scale * (1 + p * 1.4);
    g.scale.setScalar(THREE.MathUtils.damp(g.scale.x, s, 4, delta));
    if (shell.current) {
      shell.current.rotation.x -= delta * 0.12;
      shell.current.rotation.z += delta * 0.08;
    }
    state.camera.position.z = THREE.MathUtils.damp(state.camera.position.z, 6 - p * 2.5, 4, delta);
  });

  return (
    <group ref={group}>
      <Float speed={1.4} rotationIntensity={0.5} floatIntensity={0.8}>
        <mesh>
          <icosahedronGeometry args={[1.25, lite ? 24 : 64]} />
          <MeshDistortMaterial
            color="#121216"
            metalness={1}
            roughness={0.14}
            distort={0.38}
            speed={1.6}
            envMapIntensity={1.4}
          />
        </mesh>
      </Float>
      <mesh ref={shell} scale={1.95}>
        <icosahedronGeometry args={[1, 1]} />
        <meshBasicMaterial color={ACCENT} wireframe transparent opacity={0.14} />
      </mesh>
    </group>
  );
}

/** Drifting particle field; parallaxes against the pointer. */
function Particles({ count }: { count: number }) {
  const ref = useRef<THREE.Points>(null);
  const { pointer } = useThree();

  const [positions, colors] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);
    const c = new THREE.Color();
    for (let i = 0; i < count; i++) {
      // Points on a thick spherical shell around the core.
      const r = 2.6 + Math.random() * 5;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      pos[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      pos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta) * 0.7;
      // Keep points well in front of the camera's near plane so none render as giant squares.
      pos[i * 3 + 2] = THREE.MathUtils.clamp(r * Math.cos(phi) - 1, -9, 2.5);
      c.copy(Math.random() > 0.72 ? ACCENT : WARM).lerp(new THREE.Color("#ffffff"), Math.random() * 0.6);
      col.set([c.r, c.g, c.b], i * 3);
    }
    return [pos, col];
  }, [count]);

  // Soft round sprite so particles read as glowing dots, not squares.
  const sprite = useMemo(() => {
    const c = document.createElement("canvas");
    c.width = c.height = 64;
    const g = c.getContext("2d")!;
    const grd = g.createRadialGradient(32, 32, 0, 32, 32, 32);
    grd.addColorStop(0, "rgba(255,255,255,1)");
    grd.addColorStop(0.35, "rgba(255,255,255,0.6)");
    grd.addColorStop(1, "rgba(255,255,255,0)");
    g.fillStyle = grd;
    g.fillRect(0, 0, 64, 64);
    return new THREE.CanvasTexture(c);
  }, []);

  useFrame((_, delta) => {
    const p = ref.current;
    if (!p) return;
    p.rotation.y += delta * 0.025;
    p.rotation.x = THREE.MathUtils.damp(p.rotation.x, -pointer.y * 0.12, 2, delta);
    p.rotation.z = THREE.MathUtils.damp(p.rotation.z, pointer.x * 0.08, 2, delta);
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-color" args={[colors, 3]} />
      </bufferGeometry>
      <pointsMaterial size={0.06} map={sprite} alphaMap={sprite} vertexColors transparent opacity={0.9} sizeAttenuation depthWrite={false} blending={THREE.AdditiveBlending} />
    </points>
  );
}

export default function HeroScene({ progress, lite, active }: Props) {
  return (
    <Canvas
      dpr={lite ? [1, 1.5] : [1, 2]}
      camera={{ position: [0, 0, 6], fov: 35 }}
      gl={{ antialias: !lite, alpha: true, powerPreference: "high-performance" }}
      frameloop={active ? "always" : "never"}
      aria-hidden
    >
      <ambientLight intensity={0.2} />
      <Core progress={progress} lite={lite} />
      <Particles count={lite ? 700 : 2200} />
      {/* Local light panels instead of a downloaded HDR: no network, fully on-brand reflections. */}
      <Environment resolution={lite ? 128 : 256} frames={1}>
        <Lightformer form="rect" intensity={6} color="#FF4D2E" position={[-4, 1, 2]} scale={[2, 6, 1]} />
        <Lightformer form="rect" intensity={3} color="#FFB36B" position={[4, -1, 1]} scale={[2, 5, 1]} />
        <Lightformer form="ring" intensity={2.5} color="#ffffff" position={[0, 4, -3]} scale={3} />
        <Lightformer form="rect" intensity={1} color="#5b6cff" position={[0, -4, 3]} scale={[6, 1, 1]} />
      </Environment>
      {!lite && (
        <EffectComposer multisampling={0}>
          <Bloom mipmapBlur intensity={0.9} luminanceThreshold={0.25} luminanceSmoothing={0.2} />
          <Vignette eskil={false} offset={0.2} darkness={0.75} />
        </EffectComposer>
      )}
    </Canvas>
  );
}
