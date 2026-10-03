'use client';

import type { MaterialItem } from '@/data/materials';

/**
 * A procedural "macro photograph" of a material, composed purely from
 * its duotone palette with layered gradients and grain. No stock imagery.
 * The visitor reads precious material, not food.
 */
export default function MacroSurface({
  material,
  className = '',
}: {
  material: MaterialItem;
  className?: string;
}) {
  const { base, highlight, shadow } = material;
  return (
    <div
      className={`relative h-full w-full overflow-hidden ${className}`}
      style={{ backgroundColor: base }}
      role="img"
      aria-label={`Macro study of ${material.name}`}
    >
      {/* deep base gradient */}
      <div
        className="absolute inset-0"
        style={{
          background: `radial-gradient(120% 120% at 30% 20%, ${highlight} 0%, ${base} 42%, ${shadow} 100%)`,
        }}
      />
      {/* raking highlight sweep */}
      <div
        className="absolute inset-0 opacity-70 mix-blend-screen"
        style={{
          background: `linear-gradient(115deg, transparent 30%, ${highlight}55 48%, transparent 66%)`,
        }}
      />
      {/* soft specular pools */}
      <div
        className="absolute inset-0 opacity-60 mix-blend-soft-light"
        style={{
          background: `radial-gradient(40% 30% at 68% 72%, ${highlight} 0%, transparent 60%), radial-gradient(30% 24% at 22% 60%, ${highlight}aa 0%, transparent 60%)`,
        }}
      />
      {/* shadow trough */}
      <div
        className="absolute inset-0 opacity-70"
        style={{
          background: `radial-gradient(90% 60% at 50% 120%, ${shadow} 0%, transparent 55%)`,
        }}
      />
      <div className="grain-overlay absolute inset-0 opacity-40" />
    </div>
  );
}
