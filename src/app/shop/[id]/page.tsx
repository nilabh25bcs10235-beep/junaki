import { notFound } from "next/navigation";
import type { Metadata } from "next";
import {
  getProduct,
  getProductReviews,
  getRelatedProducts,
  products,
} from "@/lib/mock/data";
import { ProductDetail } from "@/components/shop/ProductDetail";

type Props = {
  params: Promise<{ id: string }>;
};

export function generateStaticParams() {
  return products.map((p) => ({ id: p.id }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const product = getProduct(id);
  if (!product) return { title: "Product · Junaki" };
  return {
    title: `${product.name} · Junaki`,
    description: product.description,
  };
}

export default async function ProductPage({ params }: Props) {
  const { id } = await params;
  const product = getProduct(id);
  if (!product) notFound();

  const reviews = getProductReviews(product.id);
  const related = getRelatedProducts(product.id);

  return (
    <ProductDetail product={product} reviews={reviews} related={related} />
  );
}
