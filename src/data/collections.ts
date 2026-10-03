export interface CollectionStoryBlock {
  label: string;
  heading: string;
  body: string;
}

export interface Collection {
  slug: string;
  index: string;
  name: string;
  arabic: string;
  tagline: string;
  essence: string;
  // 3D presentation
  lidColor: string;
  caseColor: string;
  accentColor: string;
  // editorial
  pieces: number;
  priceFrom: string;
  story: {
    object: string;
    story: string;
    composition: string;
    presentation: string;
  };
  flavours: string[];
  materials: string[];
  craft: string;
}

export const collections: Collection[] = [
  {
    slug: 'majlis',
    index: '001',
    name: 'MAJLIS',
    arabic: 'مجلس',
    tagline: 'The gathering',
    essence:
      'Composed for the moment guests are received. A quiet overture of dark cacao, date and sea salt.',
    lidColor: '#2a1a12',
    caseColor: '#c9b79c',
    accentColor: '#a8864e',
    pieces: 18,
    priceFrom: 'AED 420',
    story: {
      object:
        'A low, architectural case in warm desert sand, closed by a tempered cacao lid. It sits like a vessel of hospitality rather than a box of confection.',
      story:
        'In an Emirati home the majlis is where generosity is practised as an art. MAJLIS translates that ritual of welcome into a composition made to be opened among people.',
      composition:
        'Eighteen pieces arranged in three movements — the opening salt notes, the deep cacao centre, and a close of date and brass-warm caramel.',
      presentation:
        'Each case is hand-finished, sealed with an unbranded brass seam and wrapped in undyed palm-fibre paper.',
    },
    flavours: ['Dark 72%', 'Date & Caramel', 'Sea Salt', 'Honeycomb', 'Pistachio'],
    materials: ['Single-origin cacao', 'Emirati date', 'Fleur de sel', 'Raw honey'],
    craft:
      'Tempered over three days, hand-filled, and finished with a single pass of warm brass light.',
  },
  {
    slug: 'diwan',
    index: '002',
    name: 'DIWAN',
    arabic: 'ديوان',
    tagline: 'The council',
    essence:
      'The considered collection. Longer, more deliberate flavours for conversation that lasts into the night.',
    lidColor: '#1a0f0a',
    caseColor: '#8a8072',
    accentColor: '#c3a876',
    pieces: 30,
    priceFrom: 'AED 680',
    story: {
      object:
        'A deeper case in natural stone, its obsidian lid machined to a soft matte. The proportions are slower, more deliberate — made to be set down and returned to.',
      story:
        'The diwan is where matters are weighed and stories are told. This collection is built for duration: flavours that unfold rather than announce.',
      composition:
        'Thirty pieces across five flavour families, laid in a slow spiral so no two consecutive pieces repeat a note.',
      presentation:
        'Presented in a stone-toned case with an obsidian lid, bound by a single olive-dyed cord.',
    },
    flavours: ['Dark 80%', 'Saffron', 'Pistachio', 'Caramel', 'Honeycomb', 'Date'],
    materials: ['Single-origin cacao', 'Saffron', 'Sicilian pistachio', 'Raw honey'],
    craft:
      'A five-day temper, double-filled centres, and a hand-polished obsidian lid.',
  },
  {
    slug: 'qasr',
    index: '003',
    name: 'QASR',
    arabic: 'قصر',
    tagline: 'The palace',
    essence:
      'The maison at full voice. The rarest materials, the largest architecture, reserved for the most significant gift.',
    lidColor: '#3d2619',
    caseColor: '#e8ddc9',
    accentColor: '#a8864e',
    pieces: 45,
    priceFrom: 'AED 1,240',
    story: {
      object:
        'The largest architecture in the house — a pale ivory case bound in brass, with a cacao lid carved to a single ridge of light. An object before it is ever a gift.',
      story:
        'QASR is reserved for the occasions that deserve a monument. Every material is the rarest the maison sources, assembled with the patience of a commission.',
      composition:
        'Forty-five pieces, each a distinct creation, arranged as a procession from the palest honey to the deepest cacao.',
      presentation:
        'A brass-bound ivory case, numbered and sealed, delivered with a hand-written note of provenance.',
    },
    flavours: ['Dark 85%', 'Saffron', 'Gold-leaf Honey', 'Pistachio', 'Date', 'Caramel', 'Sea Salt'],
    materials: ['Rare single-origin cacao', 'Saffron', 'Sidr honey', 'Gold leaf'],
    craft:
      'A commissioned temper, individually sculpted centres, and a brass binding fitted by hand.',
  },
];

export function getCollection(slug: string): Collection | undefined {
  return collections.find((c) => c.slug === slug);
}
