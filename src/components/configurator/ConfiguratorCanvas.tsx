'use client';

import { Canvas } from '@react-three/fiber';
import { OrbitControls, ContactShadows } from '@react-three/drei';
import { Suspense } from 'react';
import * as THREE from 'three';
import BoxModel from './BoxModel';
import type { CreationState } from '@/lib/creation';

export default function ConfiguratorCanvas({
  state,
  onSlotClick,
  reveal = false,
  reduced = false,
}: {
  state: CreationState;
  onSlotClick?: (slot: number) => void;
  reveal?: boolean;
  reduced?: boolean;
}) {
  return (
    <Canvas
      shadows
      dpr={[1, 1.75]}
      gl={{ antialias: true, powerPreference: 'high-performance' }}
      camera={{ position: [0, 3, 6.4], fov: 40 }}
      onCreated={({ gl, scene }) => {
        gl.setClearColor('#0d0b0a');
        gl.toneMapping = THREE.ACESFilmicToneMapping;
        gl.toneMappingExposure = 1.05;
        scene.fog = new THREE.Fog('#0d0b0a', 14, 24);
      }}
    >
      {/* lighting rig — key / fill / rim, warm brass accents */}
      <ambientLight intensity={0.35} color="#4a3826" />
      <directionalLight
        position={[5, 8, 5]}
        intensity={2.4}
        color="#f1e3c6"
        castShadow
        shadow-mapSize={[1024, 1024]}
        shadow-camera-near={1}
        shadow-camera-far={25}
        shadow-camera-left={-8}
        shadow-camera-right={8}
        shadow-camera-top={8}
        shadow-camera-bottom={-8}
      />
      <directionalLight position={[-6, 3, -4]} intensity={0.8} color="#a8864e" />
      <pointLight position={[0, 4, 4]} intensity={6} color="#e0c89a" distance={16} />
      <spotLight
        position={[0, 9, 0]}
        angle={0.6}
        penumbra={1}
        intensity={reveal ? 11 : 4}
        color="#ffffff"
        distance={20}
      />

      <Suspense fallback={null}>
        {/* a gentle scale-down in the reveal reads as the camera pulling back */}
        <group
          rotation={[0, reveal ? 0 : -0.35, 0]}
          scale={reveal ? 0.84 : 1}
        >
          <BoxModel state={state} onSlotClick={onSlotClick} reduced={reduced} />
        </group>

        <ContactShadows
          position={[0, 0.01, 0]}
          opacity={0.55}
          scale={14}
          blur={2.6}
          far={6}
          color="#000000"
        />
      </Suspense>

      <OrbitControls
        enablePan={false}
        enableZoom={!reveal}
        minDistance={4.5}
        maxDistance={10}
        minPolarAngle={0.2}
        maxPolarAngle={Math.PI / 2.1}
        enableDamping
        dampingFactor={0.06}
        rotateSpeed={0.5}
        autoRotate={reveal && !reduced}
        autoRotateSpeed={0.6}
        target={[0, 0.6, 0]}
      />
    </Canvas>
  );
}
