import React from 'react';

type BadgeVariant = 'success' | 'warning' | 'danger' | 'info' | 'neutral' | 'restricted';
type BadgeSize = 'sm' | 'md' | 'lg';

interface BadgeProps {
  variant?: BadgeVariant;
  size?: BadgeSize;
  children: React.ReactNode;
  icon?: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

export function Badge({ variant = 'neutral', size = 'md', children, icon, className = '', style }: BadgeProps) {
  const sizeStyles: Record<BadgeSize, React.CSSProperties> = {
    sm: { padding: '2px 8px', fontSize: '11px' },
    md: { padding: '4px 10px', fontSize: '12px' },
    lg: { padding: '6px 14px', fontSize: '13px' },
  };

  const variantStyles: Record<BadgeVariant, React.CSSProperties> = {
    success: {
      background: 'var(--success-light)',
      color: 'var(--success)',
      border: '1px solid var(--success-border)',
    },
    warning: {
      background: 'var(--warning-light)',
      color: '#92400e',
      border: '1px solid var(--warning-border)',
    },
    danger: {
      background: 'var(--danger-light)',
      color: 'var(--danger)',
      border: '1px solid var(--danger-border)',
    },
    info: {
      background: 'var(--info-light)',
      color: 'var(--info)',
      border: '1px solid var(--info-border)',
    },
    neutral: {
      background: 'var(--bg-secondary)',
      color: 'var(--fg-secondary)',
      border: '1px solid var(--line)',
    },
    restricted: {
      background: 'var(--restricted-light)',
      color: 'var(--restricted)',
      border: '1px solid var(--restricted-border)',
    },
  };

  return (
    <span
      className={`badge badge-${variant} ${className}`}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '6px',
        borderRadius: 'var(--radius-full)',
        fontWeight: 600,
        ...sizeStyles[size],
        ...variantStyles[variant],
        ...style,
      }}
    >
      {icon}
      {children}
    </span>
  );
}

interface TriageBadgeProps {
  level: 'P1' | 'P2' | 'P3' | 'P0';
  label?: string;
}

export function TriageBadge({ level, label }: TriageBadgeProps) {
  const styles: Record<string, React.CSSProperties> = {
    P1: { background: '#fef2f2', color: 'var(--triage-p1)', border: '1px solid #fecaca' },
    P2: { background: '#fffbeb', color: '#b45309', border: '1px solid #fde68a' },
    P3: { background: '#f0fdf4', color: 'var(--triage-p3)', border: '1px solid #bbf7d0' },
    P0: { background: '#f3f4f6', color: 'var(--triage-p0)', border: '1px solid #d1d5db' },
  };

  const labels: Record<string, string> = {
    P1: 'Kritis',
    P2: 'Urgent',
    P3: 'Normal',
    P0: 'Meninggal',
  };

  return (
    <span
      className="triage-badge"
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '6px',
        padding: '4px 12px',
        borderRadius: 'var(--radius-full)',
        fontSize: '12px',
        fontWeight: 700,
        ...styles[level],
      }}
    >
      <span
        className="triage-dot"
        style={{
          width: 8,
          height: 8,
          borderRadius: '50%',
          background: styles[level].color,
        }}
      />
      {label || labels[level] || level}
    </span>
  );
}

interface StatusBadgeProps {
  status: 'active' | 'pending' | 'inactive' | 'completed' | 'cancelled';
  label?: string;
}

export function StatusBadge({ status, label }: StatusBadgeProps) {
  const statusMap: Record<string, { variant: BadgeVariant; label: string }> = {
    active: { variant: 'success', label: 'Aktif' },
    pending: { variant: 'warning', label: 'Tertunda' },
    inactive: { variant: 'neutral', label: 'Tidak Aktif' },
    completed: { variant: 'success', label: 'Selesai' },
    cancelled: { variant: 'danger', label: 'Dibatalkan' },
  };

  const { variant, label: defaultLabel } = statusMap[status] || { variant: 'neutral', label: status };

  return <Badge variant={variant}>{label || defaultLabel}</Badge>;
}
