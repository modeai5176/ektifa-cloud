'use client';

import {
  useCreation,
  filledCount,
  estimatePrice,
  architectures,
  boxMaterials,
} from '@/lib/creation';

export default function CreationSummary() {
  const { state } = useCreation();
  const arch = architectures.find((a) => a.id === state.architectureId)!;
  const material = boxMaterials.find((m) => m.id === state.materialId)!;
  const filled = filledCount(state);
  const price = estimatePrice(state);

  const cells = [
    { label: 'Architecture', value: `${arch.count} pieces` },
    { label: 'Material', value: material.name },
    { label: 'Chocolates', value: `${filled} / ${arch.count}` },
    {
      label: 'Engraving',
      value: state.engraving ? state.engraving.toUpperCase() : '—',
    },
  ];

  return (
    <div className="flex flex-wrap items-center justify-between gap-6">
      <div className="flex flex-wrap items-center gap-x-10 gap-y-4">
        {cells.map((c) => (
          <div key={c.label}>
            <p className="text-[0.55rem] tracking-widest text-stone/70">
              {c.label.toUpperCase()}
            </p>
            <p className="mt-1 text-sm font-light tracking-luxe text-pearl">
              {c.value}
            </p>
          </div>
        ))}
      </div>
      <div className="text-right">
        <p className="text-[0.55rem] tracking-widest text-stone/70">ESTIMATE</p>
        <p className="mt-1 font-display text-2xl font-light text-pearl">
          AED {price.toLocaleString()}
        </p>
      </div>
    </div>
  );
}
