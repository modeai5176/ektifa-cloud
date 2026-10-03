import type { Metadata } from 'next';
import CollectionShowcase from '@/components/sections/CollectionShowcase';

export const metadata: Metadata = {
  title: 'Collection — EKTIFA',
  description:
    'The EKTIFA collections — MAJLIS, DIWAN and QASR. Three houses within the maison, each an object before it is a gift.',
};

export default function CollectionPage() {
  return (
    <div className="pt-16">
      <CollectionShowcase />
    </div>
  );
}
