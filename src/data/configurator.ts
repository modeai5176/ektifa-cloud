// Configuration-driven data for the 3D atelier / box configurator

export interface BoxArchitecture {
  id: string;
  count: number;
  label: string;
  // grid layout of slots
  cols: number;
  rows: number;
  description: string;
}

export const architectures: BoxArchitecture[] = [
  { id: 'a6', count: 6, label: 'SIX', cols: 3, rows: 2, description: 'An intimate gesture.' },
  { id: 'a10', count: 10, label: 'TEN', cols: 5, rows: 2, description: 'A considered gift.' },
  { id: 'a18', count: 18, label: 'EIGHTEEN', cols: 6, rows: 3, description: 'The majlis format.' },
  { id: 'a30', count: 30, label: 'THIRTY', cols: 6, rows: 5, description: 'For the gathering.' },
  { id: 'a45', count: 45, label: 'FORTY-FIVE', cols: 9, rows: 5, description: 'The palace.' },
];

export interface BoxMaterial {
  id: string;
  name: string;
  // PBR-ish values
  caseColor: string;
  lidColor: string;
  roughness: number;
  metalness: number;
  clearcoat: number;
  description: string;
}

export const boxMaterials: BoxMaterial[] = [
  {
    id: 'desert',
    name: 'DESERT',
    caseColor: '#c9b79c',
    lidColor: '#b4a582',
    roughness: 0.85,
    metalness: 0.0,
    clearcoat: 0.1,
    description: 'Warm desert sand, matte and dry to the eye.',
  },
  {
    id: 'oasis',
    name: 'OASIS',
    caseColor: '#5c6a52',
    lidColor: '#47523f',
    roughness: 0.6,
    metalness: 0.0,
    clearcoat: 0.3,
    description: 'Muted olive, the green of shade and water.',
  },
  {
    id: 'pearl',
    name: 'PEARL',
    caseColor: '#efe9dd',
    lidColor: '#e4dccb',
    roughness: 0.35,
    metalness: 0.15,
    clearcoat: 0.6,
    description: 'Pearl diving made material — soft, luminous.',
  },
  {
    id: 'obsidian',
    name: 'OBSIDIAN',
    caseColor: '#1a1816',
    lidColor: '#0f0e0d',
    roughness: 0.25,
    metalness: 0.2,
    clearcoat: 0.8,
    description: 'Deep volcanic black with a controlled sheen.',
  },
  {
    id: 'sandstone',
    name: 'SANDSTONE',
    caseColor: '#a8906f',
    lidColor: '#8f7656',
    roughness: 0.95,
    metalness: 0.0,
    clearcoat: 0.05,
    description: 'Quarried stone, honest and unpolished.',
  },
];

export interface ChocolateKind {
  id: string;
  name: string;
  color: string;
  specular: string;
  roughness: number;
  note: string;
  shape: 'dome' | 'square' | 'disc';
}

export const chocolateKinds: ChocolateKind[] = [
  { id: 'dark', name: 'Dark', color: '#2a1810', specular: '#6b4428', roughness: 0.3, note: '72% single-origin', shape: 'dome' },
  { id: 'milk', name: 'Milk', color: '#6b4428', specular: '#9c6b3f', roughness: 0.35, note: 'Caramelised milk', shape: 'dome' },
  { id: 'honeycomb', name: 'Honeycomb', color: '#c88a2e', specular: '#e0a94a', roughness: 0.5, note: 'Aerated honey', shape: 'square' },
  { id: 'date', name: 'Date', color: '#4a3220', specular: '#7a5533', roughness: 0.4, note: 'Emirati date centre', shape: 'square' },
  { id: 'pistachio', name: 'Pistachio', color: '#6b6a4b', specular: '#9ca06a', roughness: 0.45, note: 'Sicilian paste', shape: 'disc' },
  { id: 'saffron', name: 'Saffron', color: '#b5551f', specular: '#d8732e', roughness: 0.4, note: 'Bloomed in honey', shape: 'dome' },
  { id: 'seasalt', name: 'Sea Salt', color: '#3a2a1e', specular: '#c9b79c', roughness: 0.3, note: 'Fleur de sel', shape: 'disc' },
  { id: 'caramel', name: 'Caramel', color: '#7a4f24', specular: '#c3883f', roughness: 0.3, note: 'Dark salted', shape: 'square' },
];

export function chocolateById(id: string): ChocolateKind | undefined {
  return chocolateKinds.find((c) => c.id === id);
}

export interface RibbonOption {
  id: string;
  name: string;
  color: string;
}

export const ribbons: RibbonOption[] = [
  { id: 'none', name: 'None', color: 'transparent' },
  { id: 'brass', name: 'Brass', color: '#a8864e' },
  { id: 'olive', name: 'Olive', color: '#6b6a4b' },
  { id: 'cacao', name: 'Cacao', color: '#2a1a12' },
  { id: 'pearl', name: 'Pearl', color: '#efe9dd' },
];

export interface ConfiguratorStep {
  index: string;
  id: string;
  title: string;
}

export const steps: ConfiguratorStep[] = [
  { index: '01', id: 'architecture', title: 'ARCHITECTURE' },
  { index: '02', id: 'material', title: 'MATERIAL' },
  { index: '03', id: 'chocolates', title: 'CHOCOLATES' },
  { index: '04', id: 'arrangement', title: 'ARRANGEMENT' },
  { index: '05', id: 'personalise', title: 'PERSONALISE' },
  { index: '06', id: 'reveal', title: 'REVEAL' },
];
