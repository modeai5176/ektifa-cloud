'use client';

import { steps } from '@/data/configurator';
import { useCreation } from '@/lib/creation';

export default function ConfiguratorSidebar() {
  const { state, dispatch } = useCreation();

  return (
    <nav aria-label="Creation steps" className="flex flex-col gap-1">
      {steps.map((s, i) => {
        const active = i === state.stepIndex;
        const done = i < state.stepIndex;
        return (
          <button
            key={s.id}
            onClick={() => dispatch({ type: 'SET_STEP', index: i })}
            className="group flex items-center gap-4 py-2 text-left"
            aria-current={active ? 'step' : undefined}
          >
            <span
              className={`flex h-7 w-7 shrink-0 items-center justify-center text-[0.6rem] tracking-widest transition-all duration-500 ${
                active
                  ? 'text-brass-light'
                  : done
                    ? 'text-sand/60'
                    : 'text-stone/50'
              }`}
            >
              {s.index}
            </span>
            <span className="relative flex items-center gap-3">
              <span
                className={`h-px transition-all duration-500 ease-luxe ${
                  active ? 'w-6 bg-brass-light' : 'w-3 bg-sand/25'
                }`}
              />
              <span
                className={`text-xs tracking-widest transition-colors duration-500 ${
                  active
                    ? 'text-pearl'
                    : 'text-stone/60 group-hover:text-sand/80'
                }`}
              >
                {s.title}
              </span>
            </span>
          </button>
        );
      })}
    </nav>
  );
}
