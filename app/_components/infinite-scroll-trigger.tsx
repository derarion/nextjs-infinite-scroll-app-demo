"use client";

import { useEffect, useRef } from "react";

interface InfiniteScrollTriggerProps {
  onLoadMore: () => void;
  hasMore: boolean;
}

export function InfiniteScrollTrigger({ onLoadMore, hasMore }: InfiniteScrollTriggerProps) {
  const observerTarget = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const target = observerTarget.current;
    if (!target || !hasMore) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          onLoadMore();
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(target);

    return () => {
      if (target) {
        observer.unobserve(target);
      }
    };
  }, [onLoadMore, hasMore]);

  if (!hasMore) return null;

  return <div ref={observerTarget} className="h-10" />;
}
