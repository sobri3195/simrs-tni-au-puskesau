import React from 'react';

type Variant = 'primary' | 'secondary' | 'destructive' | 'ghost';

const styles: Record<Variant, React.CSSProperties> = {
  primary: { background: 'var(--airforce-blue)', color: 'white' },
  secondary: { background: 'white', color: 'var(--navy)', border: '1px solid #cbd5e1' },
  destructive: { background: 'var(--danger)', color: 'white' },
  ghost: { background: 'transparent', color: 'var(--navy)' }
};

export function Button({ variant = 'primary', ...props }: React.ButtonHTMLAttributes<HTMLButtonElement> & { variant?: Variant }) {
  return (
    <button
      {...props}
      style={{
        borderRadius: 8,
        border: 'none',
        padding: '8px 12px',
        fontWeight: 600,
        cursor: 'pointer',
        ...styles[variant],
        ...(props.style ?? {})
      }}
    />
  );
}
