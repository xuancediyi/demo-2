"use client";

import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/contexts/cart-context";

export function CartView() {
  const { items, subtotal, updateQuantity, removeItem, clearCart } = useCart();

  if (items.length === 0) {
    return (
      <div className="rounded-3xl bg-white p-10 text-center shadow-sm">
        <p className="text-lg font-semibold">购物车还是空的</p>
        <p className="mt-2 text-sm text-zinc-500">
          去挑选一些喜欢的商品吧～
        </p>
        <Link
          href="/"
          className="mt-6 inline-flex rounded-full bg-black px-5 py-2 text-sm font-semibold text-white"
        >
          浏览商品
        </Link>
      </div>
    );
  }

  return (
    <div className="grid gap-8 lg:grid-cols-[2fr,1fr]">
      <div className="space-y-4">
        {items.map((item) => (
          <div
            key={item.id}
            className="flex flex-col gap-4 rounded-3xl border border-zinc-100 bg-white p-4 shadow-sm sm:flex-row sm:items-center"
          >
            <div className="flex items-center gap-4">
              <div className="relative h-24 w-24 rounded-2xl border border-zinc-100 bg-zinc-50 p-3">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-contain"
                  sizes="96px"
                  loading="lazy"
                />
              </div>
              <div>
                <p className="font-semibold">{item.title}</p>
                <p className="text-sm text-zinc-500">${item.price.toFixed(2)}</p>
              </div>
            </div>
            <div className="flex flex-1 items-center justify-end gap-4">
              <div className="flex items-center rounded-full border border-zinc-200">
                <button
                  className="px-3 py-1 text-lg"
                  onClick={() => updateQuantity(item.id, item.quantity - 1)}
                >
                  −
                </button>
                <input
                  type="number"
                  min={1}
                  value={item.quantity}
                  onChange={(e) => {
                    const value = Number(e.target.value);
                    updateQuantity(item.id, Number.isNaN(value) ? 1 : value);
                  }}
                  className="w-12 border-x border-zinc-200 text-center"
                />
                <button
                  className="px-3 py-1 text-lg"
                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                >
                  +
                </button>
              </div>
              <button
                className="text-sm text-red-500"
                onClick={() => removeItem(item.id)}
              >
                删除
              </button>
            </div>
          </div>
        ))}
        <button
          onClick={clearCart}
          className="text-sm text-zinc-500 underline hover:text-black"
        >
          清空购物车
        </button>
      </div>

      <div className="rounded-3xl border border-zinc-100 bg-white p-6 shadow-sm">
        <h2 className="text-lg font-semibold">订单摘要</h2>
        <div className="mt-4 space-y-3 text-sm text-zinc-600">
          <div className="flex justify-between">
            <span>商品金额</span>
            <span>${subtotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between">
            <span>配送</span>
            <span>免费</span>
          </div>
          <div className="flex justify-between">
            <span>税费（示例 5%）</span>
            <span>${(subtotal * 0.05).toFixed(2)}</span>
          </div>
        </div>
        <div className="mt-4 flex items-center justify-between text-xl font-semibold">
          <span>合计</span>
          <span>${(subtotal * 1.05).toFixed(2)}</span>
        </div>
        <button className="mt-6 w-full rounded-full bg-black py-3 text-sm font-semibold text-white">
          去支付
        </button>
      </div>
    </div>
  );
}

