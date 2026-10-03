'use client';

import { chocolateKinds } from '@/data/configurator';
import { useCreation, filledCount } from '@/lib/creation';

export default function ChocolateSelector() {
  const { state, dispatch } = useCreation();
  const filled = filledCount(state);
  const total = state.slots.length;

  return (
    <div>
      <p className="mb-5 text-xs font-light leading-relaxed tracking-luxe text-stone">
        Select a chocolate, then place it into an open slot in the box.
        {filled > 0 && (
          <span className="mt-1 block text-sand/60">
            {filled} of {total} placed.
          </span>
        )}
      </p>

      <div className="grid grid-cols-2 gap-2">
        {chocolateKinds.map((c) => {
          const active = c.id === state.activeChocolate;
          return (
            <button
              key={c.id}
              onClick={() =>
                dispatch({ type: 'SET_ACTIVE_CHOCOLATE', id: c.id })
              }
              aria-pressed={active}
              className={`group flex flex-col gap-2 border p-3 text-left transition-all duration-500 ${
                active
                  ? 'border-brass/60 bg-brass/5'
                  : 'border-sand/12 hover:border-sand/30'
              }`}
            >
              <span
                className="h-8 w-8 rounded-full"
                style={{
                  background: `radial-gradient(circle at 35% 30%, ${c.specular}, ${c.color})`,
                  boxShadow: '0 4px 10px rgba(0,0,0,0.4)',
                }}
                aria-hidden
              />
              <span>
                <span
                  className={`block text-[0.7rem] tracking-widest ${
                    active ? 'text-pearl' : 'text-sand/70'
                  }`}
                >
                  {c.name}
                </span>
                <span className="block text-[0.6rem] tracking-wide text-stone/70">
                  {c.note}
                </span>
              </span>
            </button>
          );
        })}
      </div>

      <div className="mt-5 flex gap-3">
        <button
          onClick={() => dispatch({ type: 'FILL_REMAINING' })}
          className="eyebrow flex-1 border border-sand/20 py-3 text-sand/70 transition-colors hover:border-sand/40 hover:text-pearl"
        >
          Fill open slots
        </button>
        <button
          onClick={() => dispatch({ type: 'CLEAR_ALL' })}
          className="eyebrow flex-1 border border-sand/20 py-3 text-sand/70 transition-colors hover:border-sand/40 hover:text-pearl"
        >
          Clear
        </button>
      </div>
    </div>
  );
}
