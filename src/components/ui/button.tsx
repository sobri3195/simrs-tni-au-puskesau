import React from 'react';

type Variant = 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'ghost' | 'link';
type Size = 'sm' | 'md' | 'lg';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
  loading?: boolean;
  fullWidth?: boolean;
}

export function Button({
  variant = 'primary',
  size = 'md',
  icon,
  iconPosition = 'left',
  loading = false,
  fullWidth = false,
  children,
  className = '',
  disabled,
  ...props
}: ButtonProps) {
  const baseStyles: React.CSSProperties = {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '8px',
    fontWeight: 600,
    borderRadius: 'var(--radius)',
    border: 'none',
    cursor: disabled || loading ? 'not-allowed' : 'pointer',
    transition: 'all 0.2s ease',
    whiteSpace: 'nowrap',
    opacity: disabled || loading ? 0.6 : 1,
    width: fullWidth ? '100%' : 'auto',
  };

  const sizeStyles: Record<Size, React.CSSProperties> = {
    sm: { padding: '6px 12px', fontSize: '13px' },
    md: { padding: '10px 18px', fontSize: '14px' },
    lg: { padding: '14px 24px', fontSize: '16px' },
  };

  const variantStyles: Record<Variant, React.CSSProperties> = {
    primary: {
      background: 'linear-gradient(135deg, var(--airforce-blue) 0%, var(--airforce-dark) 100%)',
      color: 'white',
      boxShadow: '0 2px 8px rgba(61, 90, 128, 0.3)',
    },
    secondary: {
      background: 'white',
      color: 'var(--fg)',
      border: '1px solid var(--line)',
    },
    success: {
      background: 'var(--success)',
      color: 'white',
    },
    danger: {
      background: 'var(--danger)',
      color: 'white',
    },
    warning: {
      background: 'var(--warning)',
      color: 'white',
    },
    ghost: {
      background: 'transparent',
      color: 'var(--fg-secondary)',
    },
    link: {
      background: 'transparent',
      color: 'var(--airforce-blue)',
      textDecoration: 'underline',
    },
  };

  const Spinner = () => (
    <svg
      style={{ width: size === 'sm' ? 14 : size === 'lg' ? 20 : 16, height: size === 'sm' ? 14 : size === 'lg' ? 20 : 16 }}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <circle cx="12" cy="12" r="10" opacity="0.25" />
      <path d="M12 2a10 10 0 0 1 10 10" strokeLinecap="round">
        <animateTransform
          attributeName="transform"
          type="rotate"
          from="0 12 12"
          to="360 12 12"
          dur="1s"
          repeatCount="indefinite"
        />
      </path>
    </svg>
  );

  return (
    <button
      className={`btn btn-${variant} ${className}`}
      style={{ ...baseStyles, ...sizeStyles[size], ...variantStyles[variant] }}
      disabled={disabled || loading}
      {...props}
    >
      {loading && <Spinner />}
      {!loading && icon && iconPosition === 'left' && icon}
      {children}
      {!loading && icon && iconPosition === 'right' && icon}
    </button>
  );
}

export function IconButton({
  size = 'md',
  variant = 'ghost',
  ...props
}: ButtonProps) {
  const sizes: Record<Size, React.CSSProperties> = {
    sm: { width: '32px', height: '32px', padding: 0 },
    md: { width: '40px', height: '40px', padding: 0 },
    lg: { width: '48px', height: '48px', padding: 0 },
  };

  return (
    <Button
      variant={variant}
      size={size}
      {...props}
      style={{ ...sizes[size], ...props.style }}
    />
  );
}
