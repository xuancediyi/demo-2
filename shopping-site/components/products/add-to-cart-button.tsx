"use client";

import { useState } from "react";
import { useCart } from "@/contexts/cart-context";
import { useAuth } from "@/contexts/auth-context";
import type { Product } from "@/lib/types";

interface AddToCartButtonProps {
  product: Product;
  quantity?: number;
  className?: string;
}

export function AddToCartButton({
  product,
  quantity = 1,
  className = "",
}: AddToCartButtonProps) {
  const { addItem } = useCart();
  const { ensureAuthenticated } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [label, setLabel] = useState("加入购物车");

  const handleClick = () => {
    if (isSubmitting) return;
    if (!ensureAuthenticated()) return;
    setIsSubmitting(true);
    addItem(product, quantity);
    setLabel("已加入 ✓");
    setTimeout(() => {
      setIsSubmitting(false);
      setLabel("加入购物车");
    }, 1500);
  };

  return (
    <button
      onClick={handleClick}
      disabled={isSubmitting}
      className={`rounded-full bg-black px-4 py-2 text-sm font-semibold text-white transition hover:bg-black/80 disabled:cursor-not-allowed disabled:bg-black/40 ${className}`}
    >
      {label}
    </button>
  );
}

