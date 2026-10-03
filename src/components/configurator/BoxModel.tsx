'use client';

import { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { RoundedBox } from '@react-three/drei';
import * as THREE from 'three';
import {
  architectures,
  boxMaterials,
  chocolateById,
  ribbons,
} from '@/data/configurator';
import type { CreationState } from '@/lib/creation';

const PITCH = 0.62;
const MARGIN = 0.42;

function slotPositions(cols: number, rows: number) {
  const positions: { x: number; z: number; i: number }[] = [];
  const w = (cols - 1) * PITCH;
  const d = (rows - 1) * PITCH;
  let i = 0;
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      positions.push({
        x: c * PITCH - w / 2,
        z: r * PITCH - d / 2,
        i: i++,
      });
    }
  }
  return positions;
}

/** A single chocolate that animates into its slot on mount. */
function ChocolatePiece({
  kindId,
  x,
  z,
  reduced,
}: {
  kindId: string;
  x: number;
  z: number;
  reduced: boolean;
}) {
  const ref = useRef<THREE.Group>(null);
  const progress = useRef(reduced ? 1 : 0);
  const kind = chocolateById(kindId);

  const mat = useMemo(() => {
    const k = chocolateById(kindId);
    return new THREE.MeshPhysicalMaterial({
      color: new THREE.Color(k?.color ?? '#2a1810'),
      roughness: k?.roughness ?? 0.35,
      metalness: 0.0,
      clearcoat: 0.6,
      clearcoatRoughness: 0.3,
      sheen: 0.3,
      sheenColor: new THREE.Color(k?.specular ?? '#6b4428'),
    });
  }, [kindId]);

  useFrame((_, delta) => {
    if (!ref.current) return;
    if (progress.current < 1) {
      progress.current = Math.min(1, progress.current + delta * 2.4);
      const p = progress.current;
      // ease-out drop with a gentle settle
      const eased = 1 - Math.pow(1 - p, 3);
      ref.current.position.y = 0.26 + (1 - eased) * 1.3;
      const squash = p > 0.85 ? 1 + Math.sin((p - 0.85) * 20) * 0.03 * (1 - p) : 1;
      ref.current.scale.set(1, squash, 1);
    }
  });

  const shape = kind?.shape ?? 'dome';

  return (
    <group ref={ref} position={[x, reduced ? 0.26 : 1.56, z]}>
      {shape === 'dome' && (
        <mesh material={mat} castShadow scale={[1, 0.72, 1]} position={[0, 0.02, 0]}>
          <sphereGeometry args={[0.24, 32, 24]} />
        </mesh>
      )}
      {shape === 'square' && (
        <RoundedBox
          args={[0.42, 0.22, 0.42]}
          radius={0.05}
          smoothness={4}
          material={mat}
          castShadow
        />
      )}
      {shape === 'disc' && (
        <mesh material={mat} castShadow position={[0, 0.02, 0]}>
          <cylinderGeometry args={[0.25, 0.25, 0.18, 36]} />
        </mesh>
      )}
    </group>
  );
}

export default function BoxModel({
  state,
  onSlotClick,
  reduced = false,
}: {
  state: CreationState;
  onSlotClick?: (slot: number) => void;
  reduced?: boolean;
}) {
  const arch = architectures.find((a) => a.id === state.architectureId)!;
  const material = boxMaterials.find((m) => m.id === state.materialId)!;
  const ribbon = ribbons.find((r) => r.id === state.ribbonId)!;

  const positions = useMemo(
    () => slotPositions(arch.cols, arch.rows),
    [arch.cols, arch.rows]
  );

  const caseW = (arch.cols - 1) * PITCH + MARGIN * 2 + 0.3;
  const caseD = (arch.rows - 1) * PITCH + MARGIN * 2 + 0.3;
  const scale = 4.4 / Math.max(caseW, caseD, 3);

  const lidRef = useRef<THREE.Group>(null);

  const caseMat = useMemo(
    () =>
      new THREE.MeshPhysicalMaterial({
        color: new THREE.Color(material.caseColor),
        roughness: material.roughness,
        metalness: material.metalness,
        clearcoat: material.clearcoat,
        clearcoatRoughness: 0.4,
      }),
    [material]
  );
  const lidMat = useMemo(
    () =>
      new THREE.MeshPhysicalMaterial({
        color: new THREE.Color(material.lidColor),
        roughness: material.roughness,
        metalness: material.metalness,
        clearcoat: material.clearcoat,
        clearcoatRoughness: 0.35,
      }),
    [material]
  );
  const interiorMat = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: new THREE.Color('#1a120c'),
        roughness: 0.95,
      }),
    []
  );

  // engraving texture
  const engravingTex = useMemo(() => {
    if (!state.engraving) return null;
    const canvas = document.createElement('canvas');
    canvas.width = 1024;
    canvas.height = 256;
    const ctx = canvas.getContext('2d');
    if (!ctx) return null;
    ctx.clearRect(0, 0, 1024, 256);
    ctx.fillStyle = 'rgba(200,170,110,0.92)';
    ctx.font = '300 90px Georgia, serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(state.engraving.toUpperCase(), 512, 138);
    const tex = new THREE.CanvasTexture(canvas);
    tex.anisotropy = 4;
    tex.needsUpdate = true;
    return tex;
  }, [state.engraving]);

  useFrame((_, delta) => {
    if (!lidRef.current) return;
    const target = state.lidOpen ? -2.0 : 0;
    const k = reduced ? 1 : Math.min(1, delta * 4);
    lidRef.current.rotation.x = THREE.MathUtils.lerp(
      lidRef.current.rotation.x,
      target,
      k
    );
  });

  const caseHeight = 0.5;
  const lidHeight = 0.16;
  const hingeZ = -caseD / 2;

  return (
    <group scale={scale} position={[0, 0, 0]}>
      {/* case body */}
      <RoundedBox
        args={[caseW, caseHeight, caseD]}
        radius={0.06}
        smoothness={4}
        position={[0, caseHeight / 2, 0]}
        material={caseMat}
        castShadow
        receiveShadow
      />

      {/* interior well */}
      <mesh
        position={[0, caseHeight - 0.04, 0]}
        rotation={[-Math.PI / 2, 0, 0]}
        material={interiorMat}
      >
        <planeGeometry args={[caseW - MARGIN * 1.2, caseD - MARGIN * 1.2]} />
      </mesh>

      {/* slots + chocolates */}
      {positions.map((p) => {
        const filled = state.slots[p.i];
        return (
          <group key={p.i} position={[p.x, caseHeight - 0.02, p.z]}>
            {/* slot recess / hit target */}
            <mesh
              rotation={[-Math.PI / 2, 0, 0]}
              onClick={(e) => {
                e.stopPropagation();
                onSlotClick?.(p.i);
              }}
              onPointerOver={(e) => {
                e.stopPropagation();
                document.body.style.cursor = 'pointer';
              }}
              onPointerOut={() => {
                document.body.style.cursor = '';
              }}
            >
              <circleGeometry args={[0.27, 28]} />
              <meshStandardMaterial
                color={filled ? '#120c08' : '#0f0a07'}
                roughness={1}
                transparent
                opacity={filled ? 0 : 0.85}
              />
            </mesh>
            {filled && (
              <ChocolatePiece
                key={`${p.i}-${filled}`}
                kindId={filled}
                x={0}
                z={0}
                reduced={reduced}
              />
            )}
          </group>
        );
      })}

      {/* lid group — hinged at the back edge */}
      <group ref={lidRef} position={[0, caseHeight, hingeZ]}>
        <group position={[0, lidHeight / 2, caseD / 2]}>
          <RoundedBox
            args={[caseW, lidHeight, caseD]}
            radius={0.06}
            smoothness={4}
            material={lidMat}
            castShadow
          />

          {/* brass seam line */}
          <mesh position={[0, lidHeight / 2 + 0.001, 0]} rotation={[-Math.PI / 2, 0, 0]}>
            <ringGeometry args={[caseW * 0.3, caseW * 0.3 + 0.012, 64]} />
            <meshStandardMaterial
              color={material.id === 'pearl' || material.id === 'desert' ? '#a8864e' : '#c3a876'}
              metalness={0.8}
              roughness={0.35}
            />
          </mesh>

          {/* engraving */}
          {engravingTex && (
            <mesh position={[0, lidHeight / 2 + 0.002, 0]} rotation={[-Math.PI / 2, 0, 0]}>
              <planeGeometry args={[caseW * 0.7, caseW * 0.175]} />
              <meshBasicMaterial map={engravingTex} transparent />
            </mesh>
          )}

          {/* ribbon */}
          {ribbon.id !== 'none' && (
            <group>
              <mesh position={[0, lidHeight / 2 + 0.004, 0]}>
                <boxGeometry args={[0.18, 0.02, caseD + 0.1]} />
                <meshPhysicalMaterial color={ribbon.color} roughness={0.5} sheen={0.6} />
              </mesh>
              <mesh position={[0, lidHeight / 2 + 0.004, 0]}>
                <boxGeometry args={[caseW + 0.1, 0.02, 0.18]} />
                <meshPhysicalMaterial color={ribbon.color} roughness={0.5} sheen={0.6} />
              </mesh>
            </group>
          )}
        </group>
      </group>
    </group>
  );
}
