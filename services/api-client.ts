import { API_MODE } from '@/lib/constants';

export async function apiClient<T>(path: string, init?: RequestInit): Promise<T> {
  const base = API_MODE === 'mock' ? '/api/mock' : '/api/proxy';
  const res = await fetch(`${base}${path}`, {
    ...init,
    headers: { 'Content-Type': 'application/json', ...(init?.headers ?? {}) }
  });

  if (!res.ok) throw new Error(`API error ${res.status}`);
  return res.json() as Promise<T>;
}
