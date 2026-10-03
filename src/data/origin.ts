// Origin atlas (Section 09) — editorial, not a supply-chain diagram
export interface OriginNode {
  index: string;
  label: string;
  place: string;
  note: string;
  // normalised position on the atlas plate (0-1)
  x: number;
  y: number;
}

export const originNodes: OriginNode[] = [
  {
    index: 'I',
    label: 'CACAO',
    place: 'The equatorial belt',
    note: 'Single-origin beans, chosen for depth over yield.',
    x: 0.22,
    y: 0.62,
  },
  {
    index: 'II',
    label: 'ORIGIN',
    place: 'The slow ferment',
    note: 'Fermented and dried at source, read bean by bean.',
    x: 0.4,
    y: 0.48,
  },
  {
    index: 'III',
    label: 'INGREDIENT',
    place: 'Honey, date, saffron',
    note: 'Gathered from the desert bloom and the Mediterranean.',
    x: 0.56,
    y: 0.38,
  },
  {
    index: 'IV',
    label: 'CRAFT',
    place: 'The atelier',
    note: 'Tempered, filled and finished entirely by hand.',
    x: 0.72,
    y: 0.5,
  },
  {
    index: 'V',
    label: 'EMIRATES',
    place: 'The maison',
    note: 'Composed, numbered and sealed in the United Arab Emirates.',
    x: 0.84,
    y: 0.64,
  },
];
