'use client';

import { useEffect, useState } from 'react';
import { SESSION_TIMEOUT_MINUTES } from '@/lib/constants';

export function useSession() {
  const [remainingMinutes, setRemainingMinutes] = useState(SESSION_TIMEOUT_MINUTES);

  useEffect(() => {
    const timer = setInterval(() => setRemainingMinutes((v) => Math.max(0, v - 1)), 60000);
    return () => clearInterval(timer);
  }, []);

  return { remainingMinutes };
}
