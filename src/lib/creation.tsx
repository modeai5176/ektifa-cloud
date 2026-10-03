'use client';

import {
  createContext,
  useContext,
  useReducer,
  type ReactNode,
  type Dispatch,
} from 'react';
import {
  architectures,
  boxMaterials,
  chocolateKinds,
} from '@/data/configurator';

export interface CreationState {
  stepIndex: number;
  architectureId: string;
  materialId: string;
  slots: (string | null)[]; // chocolate id per slot
  activeChocolate: string; // currently selected chocolate to place
  engraving: string;
  recipient: string;
  message: string;
  ribbonId: string;
  lidOpen: boolean;
}

export type CreationAction =
  | { type: 'SET_STEP'; index: number }
  | { type: 'SET_ARCHITECTURE'; id: string }
  | { type: 'SET_MATERIAL'; id: string }
  | { type: 'SET_ACTIVE_CHOCOLATE'; id: string }
  | { type: 'PLACE'; slot: number }
  | { type: 'CLEAR_SLOT'; slot: number }
  | { type: 'FILL_REMAINING' }
  | { type: 'CLEAR_ALL' }
  | { type: 'AUTO_CURATE' }
  | { type: 'SET_ENGRAVING'; value: string }
  | { type: 'SET_RECIPIENT'; value: string }
  | { type: 'SET_MESSAGE'; value: string }
  | { type: 'SET_RIBBON'; id: string }
  | { type: 'SET_LID'; open: boolean };

function slotCount(id: string): number {
  return architectures.find((a) => a.id === id)?.count ?? 6;
}

export const initialCreation: CreationState = {
  stepIndex: 0,
  architectureId: 'a18',
  materialId: 'desert',
  slots: Array(slotCount('a18')).fill(null),
  activeChocolate: 'dark',
  engraving: '',
  recipient: '',
  message: '',
  ribbonId: 'brass',
  lidOpen: false,
};

// A balanced, aesthetically considered arrangement — alternating tones
function curate(count: number): string[] {
  const palette = ['dark', 'date', 'pistachio', 'honeycomb', 'milk', 'saffron', 'caramel', 'seasalt'];
  const out: string[] = [];
  for (let i = 0; i < count; i++) {
    // weave so no two neighbours share, favouring dark as the base note
    const base = palette[i % palette.length];
    out.push(base);
  }
  return out;
}

function reducer(state: CreationState, action: CreationAction): CreationState {
  switch (action.type) {
    case 'SET_STEP':
      // lid opens for the chocolate & arrangement steps, closes to present
      return {
        ...state,
        stepIndex: action.index,
        lidOpen: action.index === 2 || action.index === 3,
      };
    case 'SET_ARCHITECTURE': {
      const n = slotCount(action.id);
      const slots = Array(n).fill(null) as (string | null)[];
      // preserve what fits
      state.slots.slice(0, n).forEach((s, i) => (slots[i] = s));
      return { ...state, architectureId: action.id, slots };
    }
    case 'SET_MATERIAL':
      return { ...state, materialId: action.id };
    case 'SET_ACTIVE_CHOCOLATE':
      return { ...state, activeChocolate: action.id };
    case 'PLACE': {
      const slots = [...state.slots];
      slots[action.slot] = state.activeChocolate;
      return { ...state, slots };
    }
    case 'CLEAR_SLOT': {
      const slots = [...state.slots];
      slots[action.slot] = null;
      return { ...state, slots };
    }
    case 'FILL_REMAINING': {
      const slots = state.slots.map((s) => s ?? state.activeChocolate);
      return { ...state, slots };
    }
    case 'CLEAR_ALL':
      return { ...state, slots: state.slots.map(() => null) };
    case 'AUTO_CURATE':
      return { ...state, slots: curate(state.slots.length) };
    case 'SET_ENGRAVING':
      return { ...state, engraving: action.value.slice(0, 18) };
    case 'SET_RECIPIENT':
      return { ...state, recipient: action.value.slice(0, 40) };
    case 'SET_MESSAGE':
      return { ...state, message: action.value.slice(0, 160) };
    case 'SET_RIBBON':
      return { ...state, ribbonId: action.id };
    case 'SET_LID':
      return { ...state, lidOpen: action.open };
    default:
      return state;
  }
}

const CreationContext = createContext<{
  state: CreationState;
  dispatch: Dispatch<CreationAction>;
} | null>(null);

export function CreationProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(reducer, initialCreation);
  return (
    <CreationContext.Provider value={{ state, dispatch }}>
      {children}
    </CreationContext.Provider>
  );
}

export function useCreation() {
  const ctx = useContext(CreationContext);
  if (!ctx) throw new Error('useCreation must be used within CreationProvider');
  return ctx;
}

// Derived helpers
export function filledCount(state: CreationState): number {
  return state.slots.filter(Boolean).length;
}

export function estimatePrice(state: CreationState): number {
  const bases: Record<string, number> = {
    a6: 260,
    a10: 380,
    a18: 560,
    a30: 840,
    a45: 1240,
  };
  const base = bases[state.architectureId] ?? 560;
  const perChoc = 14;
  return base + filledCount(state) * perChoc;
}

export function chocolateMix(state: CreationState) {
  const counts = new Map<string, number>();
  state.slots.forEach((s) => {
    if (s) counts.set(s, (counts.get(s) ?? 0) + 1);
  });
  return Array.from(counts.entries()).map(([id, n]) => ({
    kind: chocolateKinds.find((c) => c.id === id)!,
    n,
  }));
}

export { boxMaterials, architectures, chocolateKinds };
