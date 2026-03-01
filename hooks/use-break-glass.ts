'use client';

import { useState } from 'react';

export function useBreakGlass() {
  const [activeUntil, setActiveUntil] = useState<Date | null>(null);
  const activate = (minutes = 15) => setActiveUntil(new Date(Date.now() + minutes * 60 * 1000));
  return { activeUntil, activate };
}
