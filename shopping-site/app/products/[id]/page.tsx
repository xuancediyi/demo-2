import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { getProductById } from "@/lib/api";
import { AddToCartButton } from "@/components/products/add-to-cart-button";

interface ProductPageProps {
  params: { id: string };
}

export async function generateMetadata(
  { params }: ProductPageProps,
): Promise<Metadata> {
  const product = await getProductById(params.id);
  return {
    title: `${product.title} | Next Shop`,
    description: product.description,
    openGraph: {
      title: product.title,
      description: product.description,
      images: [product.image],
    },
  };
}

export default async function ProductDetailPage({ params }: ProductPageProps) {
  const product = await getProductById(params.id);

  return (
    <div className="mx-auto flex max-w-5xl flex-col gap-10 px-4 py-8 sm:px-6">
      <Link href="/" className="text-sm text-zinc-500 hover:text-black">
        ← 返回商品列表
      </Link>
      <div className="grid gap-8 rounded-3xl bg-white p-6 shadow-sm lg:grid-cols-2">
        <div className="relative flex min-h-[320px] items-center justify-center rounded-2xl border border-zinc-100 bg-zinc-50 p-6">
          <Image
            src={product.image}
            alt={product.title}
            width={400}
            height={400}
            className="h-full w-full object-contain"
            loading="lazy"
          />
        </div>
        <div className="flex flex-col gap-5">
          <div>
            <p className="text-xs uppercase tracking-wide text-zinc-500">
              {product.category}
            </p>
            <h1 className="mt-2 text-3xl font-semibold">{product.title}</h1>
          </div>
          <p className="text-sm leading-relaxed text-zinc-600">
            {product.description}
          </p>
          {product.rating && (
            <div className="text-sm text-zinc-500">
              评分 {product.rating.rate}（{product.rating.count} 条评价）
            </div>
          )}
          <div className="flex items-center gap-6">
            <span className="text-3xl font-semibold text-black">
              ${product.price.toFixed(2)}
            </span>
            <AddToCartButton product={product} className="px-8 py-3 text-base" />
          </div>
        </div>
      </div>
    </div>
  );
}

