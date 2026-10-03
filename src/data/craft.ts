// Craft sequence (Section 05) — atelier / manufacture presentation
export interface CraftStage {
  index: string;
  title: string;
  line: string;
  detail: string;
}

export const craftStages: CraftStage[] = [
  {
    index: '01',
    title: 'THE HAND',
    line: 'Every centre is placed by a single pair of hands.',
    detail:
      'No part of a creation touches a machine that a maker has not guided. The hand sets the rhythm of the house.',
  },
  {
    index: '02',
    title: 'THE TEMPERATURE',
    line: 'Cacao is coaxed through three days of exact warmth.',
    detail:
      'Temper is the discipline that gives chocolate its gloss and its break. Ours is held to a quarter of a degree.',
  },
  {
    index: '03',
    title: 'THE FINISH',
    line: 'A single pass of brass light reveals the surface.',
    detail:
      'Each piece is inspected under warm, raking light — the same light the maison uses to read its stone.',
  },
  {
    index: '04',
    title: 'THE DETAIL',
    line: 'The seam, the seal, the fibre — all finished by hand.',
    detail:
      'The case is as considered as its contents. Nothing is printed; everything is pressed, folded and bound.',
  },
  {
    index: '05',
    title: 'THE OBJECT',
    line: 'It leaves the atelier as an object, not a product.',
    detail:
      'When a creation is sealed, it carries a number. From that moment it belongs to a single occasion.',
  },
];
