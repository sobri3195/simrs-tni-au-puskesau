import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
  onClick?: () => void;
  style?: React.CSSProperties;
}

export function Card({ children, className = '', hover = false, onClick, style }: CardProps) {
  return (
    <div
      className={`card ${className}`}
      style={{
        background: 'var(--surface)',
        border: '1px solid var(--line)',
        borderRadius: 'var(--radius-xl)',
        boxShadow: 'var(--shadow)',
        overflow: 'hidden',
        transition: 'all 0.2s ease',
        cursor: onClick ? 'pointer' : 'default',
        ...style,
      }}
      onClick={onClick}
      onMouseEnter={(e) => {
        if (hover || onClick) {
          e.currentTarget.style.transform = 'translateY(-2px)';
          e.currentTarget.style.boxShadow = 'var(--shadow-md)';
        }
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'translateY(0)';
        e.currentTarget.style.boxShadow = 'var(--shadow)';
      }}
    >
      {children}
    </div>
  );
}

interface CardHeaderProps {
  children: React.ReactNode;
  className?: string;
  action?: React.ReactNode;
}

export function CardHeader({ children, className = '', action }: CardHeaderProps) {
  return (
    <div
      className={`card-header ${className}`}
      style={{
        padding: '20px 24px',
        borderBottom: '1px solid var(--line)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: '16px',
      }}
    >
      <div>{children}</div>
      {action && <div>{action}</div>}
    </div>
  );
}

interface CardBodyProps {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

export function CardBody({ children, className = '', style }: CardBodyProps) {
  return (
    <div className={`card-body ${className}`} style={{ padding: '24px', ...style }}>
      {children}
    </div>
  );
}

interface CardFooterProps {
  children: React.ReactNode;
  className?: string;
}

export function CardFooter({ children, className = '' }: CardFooterProps) {
  return (
    <div
      className={`card-footer ${className}`}
      style={{
        padding: '16px 24px',
        borderTop: '1px solid var(--line)',
        background: 'var(--surface-secondary)',
      }}
    >
      {children}
    </div>
  );
}

interface MetricCardProps {
  title: string;
  value: string | number;
  trend?: string;
  trendDirection?: 'up' | 'down' | 'neutral';
  icon?: React.ReactNode;
  iconColor?: 'blue' | 'green' | 'amber' | 'red' | 'purple';
}

export function MetricCard({ title, value, trend, trendDirection = 'neutral', icon, iconColor = 'blue' }: MetricCardProps) {
  const iconColors: Record<string, { bg: string; color: string }> = {
    blue: { bg: 'var(--info-light)', color: 'var(--info)' },
    green: { bg: 'var(--success-light)', color: 'var(--success)' },
    amber: { bg: 'var(--warning-light)', color: 'var(--warning)' },
    red: { bg: 'var(--danger-light)', color: 'var(--danger)' },
    purple: { bg: 'var(--restricted-light)', color: 'var(--restricted)' },
  };

  const trendColors: Record<string, string> = {
    up: 'var(--success)',
    down: 'var(--danger)',
    neutral: 'var(--neutral)',
  };

  return (
    <Card hover>
      <CardBody>
        {icon && (
          <div
            className="metric-card-icon"
            style={{
              width: 44,
              height: 44,
              borderRadius: 'var(--radius)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: 12,
              background: iconColors[iconColor].bg,
              color: iconColors[iconColor].color,
            }}
          >
            {icon}
          </div>
        )}
        <p style={{ fontSize: 13, color: 'var(--neutral)', marginBottom: 4 }}>{title}</p>
        <div style={{ fontSize: 28, fontWeight: 700, color: 'var(--fg)', lineHeight: 1.2 }}>{value}</div>
        {trend && (
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 4,
              fontSize: 12,
              fontWeight: 600,
              marginTop: 4,
              color: trendColors[trendDirection],
            }}
          >
            {trendDirection === 'up' && '↑'}
            {trendDirection === 'down' && '↓'}
            {trend}
          </div>
        )}
      </CardBody>
    </Card>
  );
}
