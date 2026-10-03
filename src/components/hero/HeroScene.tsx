'use client';

import { Canvas } from '@react-three/fiber';
import { Suspense, useEffect, useState } from 'react';
import ChocolateSurface from './ChocolateSurface';
import { hasWebGL, prefersReducedMotion } from '@/lib/webgl';

/**
 * The Arrival hero canvas. Falls back to a CSS surface when WebGL is
 * unavailable so the hero never breaks.
 */
export default function HeroScene() {
  const [ready, setReady] = useState(false);
  const [webgl, setWebgl] = useState(true);
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    setWebgl(hasWebGL());
    setReduced(prefersReducedMotion());
    setReady(true);
  }, []);

  if (!ready) {
    return <div className="absolute inset-0 bg-obsidian" />;
  }

  if (!webgl) {
    return (
      <div className="absolute inset-0">
        <div
          className="absolute inset-0"
          style={{
            background:
              'radial-gradient(120% 90% at 50% 10%, #3d2619 0%, #1a0f0a 45%, #0b0a09 100%)',
          }}
        />
        <div className="grain-overlay absolute inset-0 opacity-30" />
      </div>
    );
  }

  return (
    <Canvas
      className="absolute inset-0"
      dpr={[1, 1.75]}
      gl={{
        antialias: true,
        alpha: false,
        powerPreference: 'high-performance',
      }}
      camera={{ position: [0, 1.4, 7], fov: 38 }}
      onCreated={({ gl }) => {
        gl.setClearColor('#0b0a09');
      }}
    >
      <fog attach="fog" args={['#0b0a09', 8, 15]} />
      <Suspense fallback={null}>
        <ChocolateSurface reducedMotion={reduced} />
      </Suspense>
    </Canvas>
  );
}
