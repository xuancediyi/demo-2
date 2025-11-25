import Image from "next/image";
import Link from "next/link";
import type { Product } from "@/lib/types";
import { AddToCartButton } from "./add-to-cart-button";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  return (
    <article className="flex flex-col rounded-3xl border border-zinc-100 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
      <Link href={`/products/${product.id}`} className="relative block aspect-square">
        <Image
          src={product.image}
          alt={product.title}
          fill
          className="rounded-t-3xl object-contain p-6"
          sizes="(min-width: 1024px) 25vw, (min-width: 640px) 40vw, 90vw"
          loading="lazy"
        />
      </Link>
      <div className="flex flex-1 flex-col gap-3 p-5">
        <Link href={`/products/${product.id}`} className="font-semibold leading-tight line-clamp-2">
          {product.title}
        </Link>
        <p className="text-sm text-zinc-500 line-clamp-2">{product.description}</p>
        <div className="mt-auto flex items-center justify-between">
          <span className="text-lg font-semibold text-black">
            ${product.price.toFixed(2)}
          </span>
          <AddToCartButton product={product} />
        </div>
      </div>
    </article>
  );
}

