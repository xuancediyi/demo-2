"use client";

import Link from "next/link";
import { useCart } from "@/contexts/cart-context";
import { useAuth } from "@/contexts/auth-context";

export function Header() {
  const { itemCount } = useCart();
  const { user, logout, openLoginModal } = useAuth();

  return (
    <header className="border-b border-zinc-200 bg-white">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 px-4 py-4 sm:px-6">
        <Link href="/" className="font-semibold text-xl tracking-tight">
          Next Shop
        </Link>
        <nav className="flex items-center gap-4 text-sm font-medium text-zinc-600">
          <Link href="/" className="hover:text-black">
            商品列表
          </Link>
          <Link href="/cart" className="relative flex items-center gap-1 hover:text-black">
            购物车
            {itemCount > 0 && (
              <span className="flex h-5 min-w-[20px] items-center justify-center rounded-full bg-black px-1 text-xs font-semibold text-white">
                {itemCount}
              </span>
            )}
          </Link>
        </nav>
        <div className="flex items-center gap-3 text-sm text-zinc-600">
          {user ? (
            <>
              <span>你好，{user.name}</span>
              <button
                onClick={logout}
                className="rounded-full border border-zinc-300 px-4 py-1 text-xs font-semibold hover:border-black"
              >
                退出
              </button>
            </>
          ) : (
            <button
              onClick={openLoginModal}
              className="rounded-full border border-black bg-black px-4 py-1 text-xs font-semibold text-white"
            >
              登录
            </button>
          )}
        </div>
      </div>
    </header>
  );
}

