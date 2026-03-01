'use client';

import { useEffect, useState } from 'react';

export function useOfflineQueue(key: string) {
  const [items, setItems] = useState<string[]>([]);

  useEffect(() => {
    const raw = localStorage.getItem(key);
    if (raw) setItems(JSON.parse(raw));
  }, [key]);

  const enqueue = (item: string) => {
    const next = [...items, item];
    setItems(next);
    localStorage.setItem(key, JSON.stringify(next));
  };

  return { items, enqueue };
}
