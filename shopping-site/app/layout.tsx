import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/providers";
import { Header } from "@/components/common/header";
import { LoginModal } from "@/components/common/login-modal";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Next Shop | 高性能 Next.js 商品站点",
    template: "%s | Next Shop",
  },
  description:
    "基于 Next.js 与 FakeStore API 打造的购物网站，支持 SEO、分类、无限加载与购物车功能。",
  metadataBase: new URL("https://next-shop-demo.vercel.app"),
  openGraph: {
    title: "Next Shop | 高性能购物体验",
    description:
      "支持分类筛选和购物车能力的 Next.js 示例项目，适合部署至 Vercel。",
    url: "https://next-shop-demo.vercel.app",
    siteName: "Next Shop",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN">
      <body
        className={`${geistSans.variable} ${geistMono.variable} bg-zinc-50 text-zinc-900 antialiased`}
      >
        <Providers>
          <Header />
          <main className="min-h-[calc(100vh-64px)] pb-16">{children}</main>
          <LoginModal />
        </Providers>
      </body>
    </html>
  );
}
