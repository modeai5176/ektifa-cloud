import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { collections, getCollection } from '@/data/collections';
import ProductStory from '@/components/product/ProductStory';

export function generateStaticParams() {
  return collections.map((c) => ({ slug: c.slug }));
}

export function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Metadata {
  const collection = getCollection(params.slug);
  if (!collection) return { title: 'EKTIFA' };
  return {
    title: `${collection.name} — EKTIFA`,
    description: collection.essence,
  };
}

export default function CollectionDetailPage({
  params,
}: {
  params: { slug: string };
}) {
  const collection = getCollection(params.slug);
  if (!collection) notFound();
  return <ProductStory collection={collection} />;
}
