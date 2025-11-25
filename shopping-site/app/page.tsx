import { ProductGrid } from "@/components/products/product-grid";
import { getCategories, getProducts } from "@/lib/api";
import type { Product } from "@/lib/types";
import { fallbackProducts } from "@/data/fallback-products";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function HomePage() {
  let products: Product[] = [];
  let categories: string[] = [];

  try {
    const [p, c] = await Promise.all([getProducts(), getCategories()]);
    products = p;
    categories = c;
  } catch (error) {
    console.error("加载首页数据失败：", error);
  }

  if (products.length === 0) {
    products = fallbackProducts;
  }

  if (categories.length === 0) {
    categories = Array.from(new Set(products.map((product) => product.category)));
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
      <div className="flex flex-col gap-3">
        <p className="text-sm uppercase tracking-[0.2em] text-zinc-500">
          精选好物
        </p>
        <h1 className="text-3xl font-semibold tracking-tight">Next Shop</h1>
        <p className="text-sm text-zinc-500">
          支持分类筛选、无限滚动加载，快来挑选你喜欢的商品。
        </p>
      </div>
      <div className="mt-8">
        <ProductGrid categories={categories} initialProducts={products} />
      </div>
    </div>
  );
}
