import { useMemo } from 'react';
import { useLocation } from 'react-router-dom';

export function useQueryState(name: string, fallback = '') {
  const { search } = useLocation();

  return useMemo(() => {
    const params = new URLSearchParams(search);
    return params.get(name) ?? fallback;
  }, [search, name, fallback]);
}
