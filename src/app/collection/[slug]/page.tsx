import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { products, getProduct } from '@/data/products';
import ProductDetail from '@/components/product/ProductDetail';

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Metadata {
  const product = getProduct(params.slug);
  if (!product) return { title: 'EKTIFA' };
  return {
    title: `${product.name} — ${product.line} · EKTIFA`,
    description: product.description,
  };
}

export default function ProductPage({ params }: { params: { slug: string } }) {
  const product = getProduct(params.slug);
  if (!product) notFound();
  return <ProductDetail product={product} />;
}
