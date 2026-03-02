import React from 'react';

interface ProgressProps {
  value: number;
  max?: number;
  variant?: 'primary' | 'success' | 'warning' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  showLabel?: boolean;
  label?: string;
  className?: string;
}

export function Progress({
  value,
  max = 100,
  variant = 'primary',
  size = 'md',
  showLabel = false,
  label,
  className = '',
}: ProgressProps) {
  const percentage = Math.min(Math.max((value / max) * 100, 0), 100);

  const sizeStyles: Record<string, { height: number; radius: string }> = {
    sm: { height: 4, radius: '2px' },
    md: { height: 8, radius: 'var(--radius)' },
    lg: { height: 12, radius: 'var(--radius)' },
  };

  const variantStyles: Record<string, string> = {
    primary: 'linear-gradient(90deg, var(--airforce-blue), var(--airforce-light))',
    success: 'var(--success)',
    warning: 'var(--warning)',
    danger: 'var(--danger)',
  };

  const { height, radius } = sizeStyles[size];

  return (
    <div className={className}>
      {(showLabel || label) && (
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
          <span style={{ fontSize: '12px', color: 'var(--fg-secondary)' }}>{label}</span>
          {showLabel && (
            <span style={{ fontSize: '12px', fontWeight: 600, color: 'var(--fg)' }}>
              {Math.round(percentage)}%
            </span>
          )}
        </div>
      )}
      <div
        className="progress"
        style={{
          height,
          background: 'var(--bg-secondary)',
          borderRadius: radius,
          overflow: 'hidden',
        }}
      >
        <div
          className={`progress-bar ${variant}`}
          style={{
            height: '100%',
            width: `${percentage}%`,
            background: variantStyles[variant],
            borderRadius: radius,
            transition: 'width 0.3s ease',
          }}
        />
      </div>
    </div>
  );
}

interface CircularProgressProps {
  value: number;
  max?: number;
  size?: number;
  strokeWidth?: number;
  variant?: 'primary' | 'success' | 'warning' | 'danger';
  showValue?: boolean;
  label?: string;
}

export function CircularProgress({
  value,
  max = 100,
  size = 80,
  strokeWidth = 8,
  variant = 'primary',
  showValue = true,
  label,
}: CircularProgressProps) {
  const percentage = Math.min(Math.max((value / max) * 100, 0), 100);
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const offset = circumference - (percentage / 100) * circumference;

  const variantColors: Record<string, string> = {
    primary: 'var(--airforce-blue)',
    success: 'var(--success)',
    warning: 'var(--warning)',
    danger: 'var(--danger)',
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <div style={{ position: 'relative', width: size, height: size }}>
        <svg width={size} height={size} style={{ transform: 'rotate(-90deg)' }}>
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke="var(--bg-secondary)"
            strokeWidth={strokeWidth}
          />
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke={variantColors[variant]}
            strokeWidth={strokeWidth}
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            strokeLinecap="round"
            style={{ transition: 'stroke-dashoffset 0.3s ease' }}
          />
        </svg>
        {showValue && (
          <div
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              fontSize: size < 60 ? '14px' : '18px',
              fontWeight: 700,
              color: 'var(--fg)',
            }}
          >
            {Math.round(percentage)}%
          </div>
        )}
      </div>
      {label && (
        <span style={{ marginTop: '8px', fontSize: '12px', color: 'var(--fg-secondary)' }}>
          {label}
        </span>
      )}
    </div>
  );
}
