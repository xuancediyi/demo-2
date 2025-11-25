import type { Metadata } from "next";
import { CartView } from "@/components/cart/cart-view";

export const metadata: Metadata = {
  title: "购物车 | Next Shop",
  description: "管理购物车、调整数量、完成结算的页面。",
};

export default function CartPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
      <h1 className="text-2xl font-semibold">购物车</h1>
      <p className="mt-2 text-sm text-zinc-500">
        可在此修改商品数量、删除商品并查看支付金额。
      </p>
      <div className="mt-6">
        <CartView />
      </div>
    </div>
  );
}

