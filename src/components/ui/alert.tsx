import React from 'react';

type AlertVariant = 'success' | 'warning' | 'danger' | 'info';

interface AlertProps {
  variant: AlertVariant;
  title?: string;
  children: React.ReactNode;
  icon?: React.ReactNode;
  onClose?: () => void;
  className?: string;
  style?: React.CSSProperties;
}

export function Alert({ variant, title, children, icon, onClose, className = '', style }: AlertProps) {
  const variantStyles: Record<AlertVariant, { bg: string; color: string; border: string }> = {
    success: { bg: 'var(--success-light)', color: 'var(--success)', border: 'var(--success-border)' },
    warning: { bg: 'var(--warning-light)', color: '#92400e', border: 'var(--warning-border)' },
    danger: { bg: 'var(--danger-light)', color: 'var(--danger)', border: 'var(--danger-border)' },
    info: { bg: 'var(--info-light)', color: 'var(--info)', border: 'var(--info-border)' },
  };

  const defaultIcons: Record<AlertVariant, React.ReactNode> = {
    success: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
        <polyline points="22 4 12 14.01 9 11.01" />
      </svg>
    ),
    warning: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
        <line x1="12" y1="9" x2="12" y2="13" />
        <line x1="12" y1="17" x2="12.01" y2="17" />
      </svg>
    ),
    danger: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <circle cx="12" cy="12" r="10" />
        <line x1="15" y1="9" x2="9" y2="15" />
        <line x1="9" y1="9" x2="15" y2="15" />
      </svg>
    ),
    info: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <circle cx="12" cy="12" r="10" />
        <line x1="12" y1="16" x2="12" y2="12" />
        <line x1="12" y1="8" x2="12.01" y2="8" />
      </svg>
    ),
  };

  const styles = variantStyles[variant];

  return (
    <div
      className={`alert alert-${variant} ${className}`}
      style={{
        padding: '14px 18px',
        borderRadius: 'var(--radius)',
        display: 'flex',
        alignItems: 'flex-start',
        gap: '12px',
        background: styles.bg,
        color: styles.color,
        border: `1px solid ${styles.border}`,
        ...style,
      }}
      role="alert"
    >
      <span style={{ flexShrink: 0, marginTop: 2 }}>{icon || defaultIcons[variant]}</span>
      <div style={{ flex: 1 }}>
        {title && <div style={{ fontWeight: 600, marginBottom: 2 }}>{title}</div>}
        <div style={{ fontSize: 13 }}>{children}</div>
      </div>
      {onClose && (
        <button
          onClick={onClose}
          style={{
            background: 'transparent',
            border: 'none',
            padding: 0,
            cursor: 'pointer',
            color: 'inherit',
            opacity: 0.7,
          }}
          aria-label="Close"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M18 6L6 18M6 6l12 12" />
          </svg>
        </button>
      )}
    </div>
  );
}

interface ToastProps {
  variant: AlertVariant;
  message: string;
  onClose: () => void;
}

export function Toast({ variant, message, onClose }: ToastProps) {
  React.useEffect(() => {
    const timer = setTimeout(onClose, 5000);
    return () => clearTimeout(timer);
  }, [onClose]);

  const borderColors: Record<AlertVariant, string> = {
    success: 'var(--success)',
    warning: 'var(--warning)',
    danger: 'var(--danger)',
    info: 'var(--info)',
  };

  return (
    <div
      className={`toast toast-${variant}`}
      style={{
        background: 'var(--surface)',
        borderRadius: 'var(--radius)',
        boxShadow: 'var(--shadow-lg)',
        padding: '16px 20px',
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        minWidth: '300px',
        maxWidth: '400px',
        borderLeft: `4px solid ${borderColors[variant]}`,
      }}
    >
      <span>{message}</span>
      <button
        onClick={onClose}
        style={{
          background: 'transparent',
          border: 'none',
          padding: 0,
          cursor: 'pointer',
          color: 'var(--neutral)',
          marginLeft: 'auto',
        }}
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M18 6L6 18M6 6l12 12" />
        </svg>
      </button>
    </div>
  );
}
