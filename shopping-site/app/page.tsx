import { ProductGrid } from "@/components/products/product-grid";
import { getCategories, getProducts } from "@/lib/api";

export default async function HomePage() {
  const [products, categories] = await Promise.all([
    getProducts(),
    getCategories(),
  ]);

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
