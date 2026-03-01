'use client';

import { useMemo } from 'react';
import { useSearchParams } from 'next/navigation';

export function useQueryState(name: string, fallback = '') {
  const params = useSearchParams();
  return useMemo(() => params.get(name) ?? fallback, [params, name, fallback]);
}
