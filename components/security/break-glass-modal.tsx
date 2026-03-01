'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';

export function BreakGlassModal() {
  const [reason, setReason] = useState('');
  const valid = reason.trim().length >= 20;

  return (
    <section style={{ border: '1px solid #e2e8f0', borderRadius: 8, padding: 12 }}>
      <h4>Break-glass Access</h4>
      <p>Akses darurat memerlukan alasan audit eksplisit.</p>
      <textarea
        aria-label="Alasan break-glass"
        value={reason}
        onChange={(e) => setReason(e.target.value)}
        rows={4}
        style={{ width: '100%' }}
      />
      <div style={{ marginTop: 8 }}>
        <Button disabled={!valid}>Aktifkan Akses Darurat</Button>
      </div>
      {!valid && <small>Minimal 20 karakter.</small>}
    </section>
  );
}
