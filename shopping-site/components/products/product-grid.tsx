"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import type { Product } from "@/lib/types";
import { ProductCard } from "./product-card";
import { CategoryFilter } from "./category-filter";
import { useInfiniteScroll } from "@/hooks/useInfiniteScroll";

const PAGE_SIZE = 8;
const API_BASE = "https://fakestoreapi.com";

interface ProductGridProps {
  categories: string[];
  initialProducts: Product[];
}

export function ProductGrid({
  categories,
  initialProducts,
}: ProductGridProps) {
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [category, setCategory] = useState("all");
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);
  const [isLoading, setIsLoading] = useState(false);
  const [isPaginating, setIsPaginating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (category === "all") {
      setProducts(initialProducts);
    }
  }, [initialProducts, category]);

  const hasMore = visibleCount < products.length;
  const visibleProducts = useMemo(
    () => products.slice(0, visibleCount),
    [products, visibleCount],
  );

  const loadMore = useCallback(() => {
    if (!hasMore || isLoading || isPaginating) return;
    setIsPaginating(true);
    setVisibleCount((prev) => Math.min(prev + PAGE_SIZE, products.length));
    if (typeof window !== "undefined") {
      window.requestAnimationFrame(() => setIsPaginating(false));
    } else {
      setIsPaginating(false);
    }
  }, [hasMore, isLoading, isPaginating, products.length]);

  const sentinelRef = useInfiniteScroll<HTMLDivElement>(loadMore);

  const handleCategoryChange = useCallback(
    async (nextCategory: string) => {
      setCategory(nextCategory);
      setVisibleCount(PAGE_SIZE);
      setIsPaginating(false);
      setError(null);

      if (nextCategory === "all") {
        setProducts(initialProducts);
        return;
      }

      setIsLoading(true);
      try {
        const response = await fetch(
          `${API_BASE}/products/category/${encodeURIComponent(nextCategory)}`,
        );
        if (!response.ok) {
          throw new Error("获取分类数据失败");
        }
        const data = (await response.json()) as Product[];
        setProducts(data);
      } catch (err) {
        console.error(err);
        setError(err instanceof Error ? err.message : "加载失败");
        setProducts([]);
      } finally {
        setIsLoading(false);
      }
    },
    [initialProducts],
  );

  return (
    <section className="space-y-6">
      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <h1 className="text-2xl font-semibold">热门精选</h1>
        <CategoryFilter
          categories={categories}
          selected={category}
          onChange={handleCategoryChange}
        />
      </div>

      {error && (
        <p className="rounded-2xl bg-red-50 px-4 py-3 text-sm text-red-600">
          {error}
        </p>
      )}

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {visibleProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      {isLoading && (
        <div className="flex items-center justify-center py-6 text-sm text-zinc-500">
          正在加载更多商品...
        </div>
      )}

      {!isLoading && visibleProducts.length === 0 && (
        <p className="py-10 text-center text-sm text-zinc-500">
          暂无相关商品
        </p>
      )}

      {hasMore && !isLoading && !isPaginating && (
        <div className="h-10 w-full" ref={sentinelRef} />
      )}
    </section>
  );
}

