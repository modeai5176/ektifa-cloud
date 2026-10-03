'use client';

import { ribbons } from '@/data/configurator';
import { useCreation } from '@/lib/creation';

export default function EngravingPanel() {
  const { state, dispatch } = useCreation();

  return (
    <div className="space-y-7">
      {/* engraving */}
      <div>
        <label htmlFor="engraving" className="eyebrow text-sand/60">
          Engraving
        </label>
        <input
          id="engraving"
          type="text"
          value={state.engraving}
          maxLength={18}
          placeholder="FOR HUSSAIN"
          onChange={(e) =>
            dispatch({ type: 'SET_ENGRAVING', value: e.target.value })
          }
          className="mt-3 w-full border-b border-sand/25 bg-transparent pb-2 font-display text-xl font-light tracking-wide text-pearl placeholder:text-stone/50 focus:border-brass focus:outline-none"
        />
        <p className="mt-2 text-[0.6rem] tracking-widest text-stone/60">
          Pressed into the lid · {18 - state.engraving.length} characters left
        </p>
      </div>

      {/* recipient */}
      <div>
        <label htmlFor="recipient" className="eyebrow text-sand/60">
          Recipient
        </label>
        <input
          id="recipient"
          type="text"
          value={state.recipient}
          maxLength={40}
          placeholder="Name of the recipient"
          onChange={(e) =>
            dispatch({ type: 'SET_RECIPIENT', value: e.target.value })
          }
          className="mt-3 w-full border-b border-sand/25 bg-transparent pb-2 text-sm font-light tracking-luxe text-pearl placeholder:text-stone/50 focus:border-brass focus:outline-none"
        />
      </div>

      {/* message / card */}
      <div>
        <label htmlFor="message" className="eyebrow text-sand/60">
          A message
        </label>
        <textarea
          id="message"
          value={state.message}
          maxLength={160}
          rows={3}
          placeholder="Hand-written on the enclosed card."
          onChange={(e) =>
            dispatch({ type: 'SET_MESSAGE', value: e.target.value })
          }
          className="mt-3 w-full resize-none border border-sand/20 bg-transparent p-3 text-sm font-light leading-relaxed tracking-luxe text-pearl placeholder:text-stone/50 focus:border-brass focus:outline-none"
        />
      </div>

      {/* ribbon */}
      <div>
        <p className="eyebrow text-sand/60">Ribbon</p>
        <div className="mt-3 flex gap-3">
          {ribbons.map((r) => {
            const active = r.id === state.ribbonId;
            return (
              <button
                key={r.id}
                onClick={() => dispatch({ type: 'SET_RIBBON', id: r.id })}
                aria-label={`${r.name} ribbon`}
                aria-pressed={active}
                className={`flex flex-col items-center gap-2 transition-opacity ${
                  active ? 'opacity-100' : 'opacity-60 hover:opacity-90'
                }`}
              >
                <span
                  className={`h-8 w-8 rounded-full border ${
                    active ? 'border-brass' : 'border-sand/20'
                  }`}
                  style={{
                    background:
                      r.id === 'none'
                        ? 'repeating-linear-gradient(45deg,#1a1512,#1a1512 4px,#2a2420 4px,#2a2420 8px)'
                        : r.color,
                  }}
                />
                <span className="text-[0.55rem] tracking-widest text-stone">
                  {r.name}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
