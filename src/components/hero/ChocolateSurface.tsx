'use client';

import { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

/**
 * A tempered dark-chocolate surface rendered as a displaced plane.
 * Displacement is layered trigonometric noise (deterministic, cheap) so
 * the surface reads first as an abstract landscape of ridges, then — as
 * light sweeps it — as glossy chocolate.
 */
export default function ChocolateSurface({
  reducedMotion = false,
}: {
  reducedMotion?: boolean;
}) {
  const meshRef = useRef<THREE.Mesh>(null);
  const lightRef = useRef<THREE.SpotLight>(null);
  const rimRef = useRef<THREE.DirectionalLight>(null);

  // Build a displaced plane geometry once.
  const geometry = useMemo(() => {
    const geo = new THREE.PlaneGeometry(18, 12, 220, 150);
    const pos = geo.attributes.position as THREE.BufferAttribute;
    const v = new THREE.Vector3();
    for (let i = 0; i < pos.count; i++) {
      v.fromBufferAttribute(pos, i);
      const x = v.x;
      const y = v.y;
      // layered ridges — dune-like macro relief
      const z =
        Math.sin(x * 0.55) * 0.42 +
        Math.sin(x * 1.3 + y * 0.6) * 0.22 +
        Math.cos(y * 0.9 + x * 0.3) * 0.3 +
        Math.sin(x * 2.6 + y * 1.4) * 0.09 +
        Math.cos(x * 4.1) * 0.04;
      pos.setZ(i, z);
    }
    geo.computeVertexNormals();
    return geo;
  }, []);

  const material = useMemo(
    () =>
      new THREE.MeshPhysicalMaterial({
        color: new THREE.Color('#2a1810'),
        roughness: 0.34,
        metalness: 0.05,
        clearcoat: 0.7,
        clearcoatRoughness: 0.28,
        sheen: 0.2,
        sheenColor: new THREE.Color('#6b4428'),
        reflectivity: 0.4,
      }),
    []
  );

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    // slow, confident light sweep across the surface
    if (lightRef.current) {
      const sweep = reducedMotion ? 0 : Math.sin(t * 0.18) * 6;
      lightRef.current.position.set(sweep, 3.2, 4.2);
      lightRef.current.target.position.set(sweep * 0.3, 0, 0);
      lightRef.current.target.updateMatrixWorld();
    }
    if (rimRef.current && !reducedMotion) {
      rimRef.current.intensity = 0.7 + Math.sin(t * 0.3) * 0.12;
    }
    // very subtle parallax tilt from pointer
    if (meshRef.current) {
      const px = state.pointer.x;
      const py = state.pointer.y;
      meshRef.current.rotation.x = THREE.MathUtils.lerp(
        meshRef.current.rotation.x,
        -1.12 + py * 0.04,
        0.04
      );
      meshRef.current.rotation.z = THREE.MathUtils.lerp(
        meshRef.current.rotation.z,
        px * 0.03,
        0.04
      );
    }
  });

  return (
    <group>
      <ambientLight intensity={0.12} color="#3d2619" />
      <spotLight
        ref={lightRef}
        intensity={42}
        angle={0.7}
        penumbra={1}
        distance={30}
        color="#e0c89a"
        position={[0, 3.2, 4.2]}
      />
      <directionalLight
        ref={rimRef}
        intensity={0.7}
        color="#a8864e"
        position={[-6, 2, -3]}
      />
      <pointLight intensity={6} color="#c88a2e" position={[4, 1.5, 3]} distance={14} />
      <mesh
        ref={meshRef}
        geometry={geometry}
        material={material}
        rotation={[-1.12, 0, 0]}
        position={[0, -0.6, 0]}
      />
    </group>
  );
}
