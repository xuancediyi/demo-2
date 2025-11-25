"use client";

import { FormEvent, useState } from "react";
import { useAuth } from "@/contexts/auth-context";

export function LoginModal() {
  const { isLoginModalOpen, closeLoginModal, login } = useAuth();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  if (!isLoginModalOpen) return null;

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    if (!name.trim() || !email.trim()) return;
    login({ name: name.trim(), email: email.trim() });
    setName("");
    setEmail("");
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">
      <div className="w-full max-w-sm rounded-2xl bg-white p-6 shadow-2xl">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-semibold">登录获取购物车权限</h2>
          <button
            aria-label="关闭"
            onClick={closeLoginModal}
            className="text-2xl leading-none text-zinc-500 hover:text-black"
          >
            ×
          </button>
        </div>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="text-sm font-medium text-zinc-600">姓名</label>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="mt-1 w-full rounded-xl border border-zinc-200 px-3 py-2 focus:border-black focus:outline-none"
              placeholder="例如：张三"
              required
            />
          </div>
          <div>
            <label className="text-sm font-medium text-zinc-600">邮箱</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 w-full rounded-xl border border-zinc-200 px-3 py-2 focus:border-black focus:outline-none"
              placeholder="you@example.com"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full rounded-full bg-black py-2 text-sm font-semibold text-white transition hover:bg-black/80"
          >
            登录
          </button>
        </form>
      </div>
    </div>
  );
}

