export type Line = 'QAND' | 'AL FAYA';

export interface Product {
  slug: string;
  line: Line;
  name: string;
  arabic: string;
  kind: string;
  note: string;
  price: string;
  tone: string; // colourway accent
  cover: string;
  gallery: string[];
  description: string;
  options: { label: string; values: string[] };
  details: { label: string; value: string }[];
}

export const products: Product[] = [
  // ——— QAND · chocolate ———
  {
    slug: 'qand-oasis-olive',
    line: 'QAND',
    name: 'Oasis Olive',
    arabic: 'قَنْد',
    kind: 'Chocolate gift box',
    note: 'A sage-toned case of artisanal chocolate.',
    price: 'From AED 120',
    tone: '#808560',
    cover: '/images/qand/medium/Oasis_Olive_M_1.webp',
    gallery: [
      '/images/qand/medium/Oasis_Olive_M_1.webp',
      '/images/qand/medium/Oasis_Olive_M_2.webp',
      '/images/qand/medium/Oasis_Olive_M_3.webp',
      '/images/qand/large/Oasis_Olive_L_1.webp',
    ],
    description:
      'Artisanal chocolate and confectionery, finished by hand in Sharjah and sealed in an olive-toned case with a gold-foiled lid.',
    options: { label: 'Size', values: ['Small', 'Medium', 'Large'] },
    details: [
      { label: 'Line', value: 'QAND · Chocolate' },
      { label: 'Finish', value: 'Gold foil on olive' },
      { label: 'Made in', value: 'Sharjah, UAE' },
    ],
  },
  {
    slug: 'qand-desert-sand',
    line: 'QAND',
    name: 'Desert Sand',
    arabic: 'قَنْد',
    kind: 'Chocolate gift box',
    note: 'A terracotta case of artisanal chocolate.',
    price: 'From AED 120',
    tone: '#b35f33',
    cover: '/images/qand/medium/Desert_Sand_medium_1.webp',
    gallery: [
      '/images/qand/medium/Desert_Sand_medium_1.webp',
      '/images/qand/medium/Desert_Sand_medium_2.webp',
      '/images/qand/medium/Desert_Sand_medium_3.webp',
      '/images/qand/large/Desert_Sand_L_2.webp',
    ],
    description:
      'Artisanal chocolate and confectionery, finished by hand in Sharjah and sealed in a terracotta case with a gold-foiled lid.',
    options: { label: 'Size', values: ['Small', 'Medium', 'Large'] },
    details: [
      { label: 'Line', value: 'QAND · Chocolate' },
      { label: 'Finish', value: 'Gold foil on terracotta' },
      { label: 'Made in', value: 'Sharjah, UAE' },
    ],
  },
  {
    slug: 'qand-coast-pearl',
    line: 'QAND',
    name: 'Coast Pearl',
    arabic: 'قَنْد',
    kind: 'Chocolate gift box',
    note: 'A cream-toned case of artisanal chocolate.',
    price: 'From AED 120',
    tone: '#e2d8c3',
    cover: '/images/qand/medium/Coast_Pearl_M_1.webp',
    gallery: [
      '/images/qand/medium/Coast_Pearl_M_1.webp',
      '/images/qand/medium/Coast_Pearl_M_2.webp',
      '/images/qand/medium/Coast_Pearl_M_3.webp',
      '/images/qand/large/Coast_Pearl_L_1.webp',
    ],
    description:
      'Artisanal chocolate and confectionery, finished by hand in Sharjah and sealed in a cream case with a gold-foiled lid.',
    options: { label: 'Size', values: ['Small', 'Medium', 'Large'] },
    details: [
      { label: 'Line', value: 'QAND · Chocolate' },
      { label: 'Finish', value: 'Gold foil on cream' },
      { label: 'Made in', value: 'Sharjah, UAE' },
    ],
  },
  // ——— AL FAYA · honey ———
  {
    slug: 'al-faya-ghaf',
    line: 'AL FAYA',
    name: 'Ghaf Honey',
    arabic: 'عسل الغاف',
    kind: 'Raw honey',
    note: 'Pale, floral honey from the Ghaf tree.',
    price: 'From AED 180',
    tone: '#d7a24a',
    cover: '/images/al_faya/singleleatherbottle-lightleatherGHAF.webp',
    gallery: [
      '/images/al_faya/singleleatherbottle-lightleatherGHAF.webp',
      '/images/al_faya/BOX_1X_GHAF_WH_BG.webp',
      '/images/al_faya/BOX_2X_GHAF_WH_BG.webp',
    ],
    description:
      'Raw honey drawn from the native Ghaf tree, bottled in glass and wrapped in hand-stitched leather, with a turned wooden dipper.',
    options: { label: 'Format', values: ['Single', 'Pair', 'Trio'] },
    details: [
      { label: 'Line', value: 'AL FAYA · Honey' },
      { label: 'Source', value: 'Ghaf tree' },
      { label: 'Vessel', value: 'Glass in leather' },
    ],
  },
  {
    slug: 'al-faya-samar',
    line: 'AL FAYA',
    name: 'Samar Honey',
    arabic: 'عسل السمر',
    kind: 'Raw honey',
    note: 'Amber honey from the Samar tree.',
    price: 'From AED 180',
    tone: '#a9712f',
    cover:
      '/images/al_faya/singleleatherbottle-lightleather_0d16ce22-f5de-4671-8924-3a4974b53c14.webp',
    gallery: [
      '/images/al_faya/singleleatherbottle-lightleather_0d16ce22-f5de-4671-8924-3a4974b53c14.webp',
      '/images/al_faya/BOX_1X_SAMER_WH_BG.webp',
      '/images/al_faya/BOX_2X_SAMER_WH_BG.webp',
    ],
    description:
      'Raw honey from the native Samar tree, bottled in glass and wrapped in hand-stitched leather, with a turned wooden dipper.',
    options: { label: 'Format', values: ['Single', 'Pair', 'Trio'] },
    details: [
      { label: 'Line', value: 'AL FAYA · Honey' },
      { label: 'Source', value: 'Samar tree' },
      { label: 'Vessel', value: 'Glass in leather' },
    ],
  },
  {
    slug: 'al-faya-sidr',
    line: 'AL FAYA',
    name: 'Sidr Honey',
    arabic: 'عسل السدر',
    kind: 'Raw honey',
    note: 'Deep, prized honey from the Sidr tree.',
    price: 'From AED 240',
    tone: '#6e3f1d',
    cover:
      '/images/al_faya/singleleatherbottle-darkleather_3c2a99c3-0ecf-4ea6-b331-00ea45be52d3.webp',
    gallery: [
      '/images/al_faya/singleleatherbottle-darkleather_3c2a99c3-0ecf-4ea6-b331-00ea45be52d3.webp',
      '/images/al_faya/BOX_1X_SEDAR_WH_BG_8eaebea0-2d23-4c83-a602-7c5baf3d1130.webp',
    ],
    description:
      'The most prized of the three — raw Sidr honey, deep and slow, bottled in glass and wrapped in dark hand-stitched leather.',
    options: { label: 'Format', values: ['Single', 'Pair'] },
    details: [
      { label: 'Line', value: 'AL FAYA · Honey' },
      { label: 'Source', value: 'Sidr tree' },
      { label: 'Vessel', value: 'Glass in leather' },
    ],
  },
  {
    slug: 'al-faya-trio',
    line: 'AL FAYA',
    name: 'The Trio',
    arabic: 'الفاية',
    kind: 'Honey gift set',
    note: 'Ghaf, Samar and Sidr in a leather case.',
    price: 'From AED 520',
    tone: '#b8a079',
    cover: '/images/al_faya/LEATHER_BOX_3X_ASSORTED_WH_BG.webp',
    gallery: [
      '/images/al_faya/LEATHER_BOX_3X_ASSORTED_WH_BG.webp',
      '/images/al_faya/LEATHER_BOX_3X_GHAF_WH_BG.webp',
      '/images/al_faya/LEATHER_BOX_3X_SAMER_WH_BG.webp',
    ],
    description:
      'All three honeys — Ghaf, Samar and Sidr — presented in a hand-stitched leather case with a matching carry bag and wooden dippers.',
    options: { label: 'Set', values: ['Three bottles'] },
    details: [
      { label: 'Line', value: 'AL FAYA · Honey' },
      { label: 'Contents', value: 'Ghaf · Samar · Sidr' },
      { label: 'Case', value: 'Leather with bag' },
    ],
  },
];

export function getProduct(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

export const qand = products.filter((p) => p.line === 'QAND');
export const alFaya = products.filter((p) => p.line === 'AL FAYA');
