import { Product } from "./types";

const API_BASE = "https://fakestoreapi.com";
const DEFAULT_REVALIDATE = 60 * 5; // 5 minutes

async function handleResponse<T>(response: Response): Promise<T> {
  if (!response.ok) {
    const message = await response.text();
    throw new Error(message || `Request failed (${response.status})`);
  }
  return response.json();
}

export async function getProducts(limit?: number): Promise<Product[]> {
  const url = new URL(`${API_BASE}/products`);
  if (limit) {
    url.searchParams.set("limit", String(limit));
  }
  const res = await fetch(url, { next: { revalidate: DEFAULT_REVALIDATE } });
  return handleResponse<Product[]>(res);
}

export async function getProductById(id: string): Promise<Product> {
  const res = await fetch(`${API_BASE}/products/${id}`, {
    next: { revalidate: DEFAULT_REVALIDATE },
  });
  return handleResponse<Product>(res);
}

export async function getCategories(): Promise<string[]> {
  const res = await fetch(`${API_BASE}/products/categories`, {
    next: { revalidate: DEFAULT_REVALIDATE },
  });
  return handleResponse<string[]>(res);
}

export async function getProductsByCategory(
  category: string,
): Promise<Product[]> {
  const res = await fetch(`${API_BASE}/products/category/${category}`, {
    next: { revalidate: DEFAULT_REVALIDATE },
  });
  return handleResponse<Product[]>(res);
}

