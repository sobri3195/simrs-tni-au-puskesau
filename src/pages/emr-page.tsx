import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardBody } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export function EmrPage() {
  const navigate = useNavigate();

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '60vh',
      }}
    >
      <Card style={{ maxWidth: '480px', width: '100%' }}>
        <CardBody style={{ textAlign: 'center', padding: '48px 32px' }}>
          <div style={{ fontSize: '40px', lineHeight: 1, marginBottom: '16px' }}>📋</div>
          <h1 style={{ marginBottom: '12px', fontSize: '24px' }}>EMR</h1>
          <p style={{ color: 'var(--fg-secondary)', marginBottom: '32px', lineHeight: 1.6 }}>
            Electronic Medical Record untuk dokumentasi klinis.
          </p>

          <div style={{ display: 'flex', gap: '12px', justifyContent: 'center' }}>
            <Button variant="secondary" onClick={() => navigate(-1)}>
              Kembali
            </Button>
            <Button onClick={() => navigate('/')}>
              Dashboard
            </Button>
          </div>

          <div
            style={{
              marginTop: '32px',
              padding: '16px',
              background: 'var(--surface-secondary)',
              borderRadius: 'var(--radius)',
              fontSize: '13px',
              color: 'var(--neutral)',
            }}
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              style={{ display: 'inline-block', verticalAlign: 'middle', marginRight: '6px' }}
            >
              <circle cx="12" cy="12" r="10" />
              <line x1="12" y1="16" x2="12" y2="12" />
              <line x1="12" y1="8" x2="12.01" y2="8" />
            </svg>
            Halaman ini sedang dalam pengembangan aktif dan akan segera tersedia.
          </div>
        </CardBody>
      </Card>
    </div>
  );
}
