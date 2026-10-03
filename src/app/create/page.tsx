import type { Metadata } from 'next';
import Configurator from '@/components/configurator/Configurator';

export const metadata: Metadata = {
  title: 'Create Your EKTIFA — The Atelier',
  description:
    'Compose a box entirely by you — its architecture, material, chocolates and engraving — in the EKTIFA digital atelier.',
};

export default function CreatePage() {
  return <Configurator />;
}
