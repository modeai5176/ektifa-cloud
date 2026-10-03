// Materials for the cinematic material gallery (Section 03)
export interface MaterialItem {
  index: string;
  name: string;
  note: string;
  // duotone surface tones used to compose the macro visual (no stock imagery)
  base: string;
  highlight: string;
  shadow: string;
}

export const materialGallery: MaterialItem[] = [
  {
    index: '01',
    name: 'Cacao',
    note: 'Single-origin, stone-ground over days until the bitterness turns to depth.',
    base: '#2a1a12',
    highlight: '#6b4428',
    shadow: '#120a06',
  },
  {
    index: '02',
    name: 'Honey',
    note: 'Raw Sidr honey, amber and slow, drawn from the desert bloom.',
    base: '#9a641d',
    highlight: '#e0a94a',
    shadow: '#4a2f0c',
  },
  {
    index: '03',
    name: 'Caramel',
    note: 'Cooked to the edge of dark, salted by hand, left to settle.',
    base: '#6b4320',
    highlight: '#c3883f',
    shadow: '#2e1a0a',
  },
  {
    index: '04',
    name: 'Pistachio',
    note: 'Sicilian, cold-pressed to a paste the colour of early olive.',
    base: '#6b6a4b',
    highlight: '#9ca06a',
    shadow: '#3a3826',
  },
  {
    index: '05',
    name: 'Date',
    note: 'Emirati, reduced to a dark honeyed centre that holds its origin.',
    base: '#4a3220',
    highlight: '#7a5533',
    shadow: '#231608',
  },
  {
    index: '06',
    name: 'Salt',
    note: 'Fleur de sel, scattered as the final gesture over the temper.',
    base: '#c9b79c',
    highlight: '#efe9dd',
    shadow: '#8a8072',
  },
  {
    index: '07',
    name: 'Saffron',
    note: 'Threads bloomed in warm honey, measured in grams, never more.',
    base: '#9a3d1d',
    highlight: '#d8732e',
    shadow: '#4a1c0c',
  },
  {
    index: '08',
    name: 'The Case',
    note: 'Undyed palm fibre and warm brass — the architecture before the gift.',
    base: '#8a8072',
    highlight: '#c9b79c',
    shadow: '#4a443c',
  },
];
