'use client';

import { boxMaterials } from '@/data/configurator';
import { useCreation } from '@/lib/creation';

export default function MaterialSelector() {
  const { state, dispatch } = useCreation();
  const current = boxMaterials.find((m) => m.id === state.materialId)!;

  return (
    <div>
      <div className="space-y-2">
        {boxMaterials.map((m) => {
          const active = m.id === state.materialId;
          return (
            <button
              key={m.id}
              onClick={() => dispatch({ type: 'SET_MATERIAL', id: m.id })}
              className={`flex w-full items-center gap-4 border p-3 text-left transition-all duration-500 ${
                active
                  ? 'border-brass/60 bg-brass/5'
                  : 'border-sand/12 hover:border-sand/30'
              }`}
            >
              <span
                className="h-10 w-10 shrink-0 rounded-sm"
                style={{
                  background: `linear-gradient(135deg, ${m.caseColor}, ${m.lidColor})`,
                  boxShadow: active
                    ? '0 0 0 1px rgba(168,134,78,0.5)'
                    : 'inset 0 0 0 1px rgba(0,0,0,0.3)',
                }}
                aria-hidden
              />
              <span className="flex-1">
                <span
                  className={`block text-xs tracking-widest ${
                    active ? 'text-pearl' : 'text-sand/70'
                  }`}
                >
                  {m.name}
                </span>
              </span>
            </button>
          );
        })}
      </div>
      <p className="mt-5 text-xs font-light leading-relaxed tracking-luxe text-stone">
        {current.description}
      </p>
    </div>
  );
}
