"use client";

import { useCallback, useEffect, useRef, useState } from "react";

export function useInfiniteScroll<T extends HTMLElement>(
  onIntersect: () => void,
  options?: IntersectionObserverInit,
) {
  const observer = useRef<IntersectionObserver | null>(null);
  const [node, setNode] = useState<T | null>(null);

  const setRef = useCallback((value: T | null) => {
    setNode(value);
  }, []);

  useEffect(() => {
    if (!node) {
      observer.current?.disconnect();
      observer.current = null;
      return;
    }

    observer.current?.disconnect();
    observer.current = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          onIntersect();
        }
      },
      { rootMargin: "200px", threshold: 0.01, ...options },
    );
    observer.current.observe(node);

    return () => observer.current?.disconnect();
  }, [node, onIntersect, options]);

  return setRef;
}

