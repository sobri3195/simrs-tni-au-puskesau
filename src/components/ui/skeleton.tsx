import React from 'react';

interface SkeletonProps {
  variant?: 'text' | 'title' | 'circle' | 'rect' | 'card';
  width?: string | number;
  height?: string | number;
  className?: string;
  style?: React.CSSProperties;
}

export function Skeleton({ variant = 'text', width, height, className = '', style }: SkeletonProps) {
  const getStyles = (): React.CSSProperties => {
    const base: React.CSSProperties = {
      background: 'linear-gradient(90deg, var(--bg-secondary) 25%, var(--bg) 50%, var(--bg-secondary) 75%)',
      backgroundSize: '200% 100%',
      animation: 'shimmer 1.5s infinite',
      borderRadius: 'var(--radius)',
    };

    switch (variant) {
      case 'text':
        return { ...base, height: height || 16, width: width || '100%', ...style };
      case 'title':
        return { ...base, height: height || 24, width: width || '60%', ...style };
      case 'circle':
        return { ...base, borderRadius: '50%', width: width || 40, height: height || 40, ...style };
      case 'rect':
        return { ...base, width: width || '100%', height: height || 100, ...style };
      case 'card':
        return { ...base, width: width || '100%', height: height || 200, borderRadius: 'var(--radius-xl)', ...style };
      default:
        return { ...base, ...style };
    }
  };

  return <div className={`skeleton ${className}`} style={getStyles()} />;
}

interface SkeletonTextProps {
  lines?: number;
  className?: string;
}

export function SkeletonText({ lines = 3, className = '' }: SkeletonTextProps) {
  return (
    <div className={className}>
      {Array.from({ length: lines }).map((_, i) => (
        <Skeleton
          key={i}
          variant="text"
          width={i === lines - 1 ? '60%' : '100%'}
          style={{ marginBottom: i < lines - 1 ? '8px' : 0 }}
        />
      ))}
    </div>
  );
}

interface SkeletonCardProps {
  hasHeader?: boolean;
  hasFooter?: boolean;
  lines?: number;
  className?: string;
}

export function SkeletonCard({ hasHeader = true, hasFooter = false, lines = 3, className = '' }: SkeletonCardProps) {
  return (
    <div
      className={className}
      style={{
        background: 'var(--surface)',
        border: '1px solid var(--line)',
        borderRadius: 'var(--radius-xl)',
        overflow: 'hidden',
      }}
    >
      {hasHeader && (
        <div style={{ padding: '20px 24px', borderBottom: '1px solid var(--line)' }}>
          <Skeleton variant="title" width="40%" />
        </div>
      )}
      <div style={{ padding: '24px' }}>
        <SkeletonText lines={lines} />
      </div>
      {hasFooter && (
        <div style={{ padding: '16px 24px', borderTop: '1px solid var(--line)', background: 'var(--surface-secondary)' }}>
          <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end' }}>
            <Skeleton variant="text" width={80} height={36} />
            <Skeleton variant="text" width={80} height={36} />
          </div>
        </div>
      )}
    </div>
  );
}

interface SkeletonTableProps {
  rows?: number;
  columns?: number;
  className?: string;
}

export function SkeletonTable({ rows = 5, columns = 4, className = '' }: SkeletonTableProps) {
  return (
    <div
      className={className}
      style={{
        background: 'var(--surface)',
        border: '1px solid var(--line)',
        borderRadius: 'var(--radius-xl)',
        overflow: 'hidden',
      }}
    >
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            {Array.from({ length: columns }).map((_, i) => (
              <th
                key={i}
                style={{
                  padding: '14px 20px',
                  borderBottom: '1px solid var(--line)',
                  background: 'var(--surface-secondary)',
                }}
              >
                <Skeleton variant="text" width="60%" height={12} />
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {Array.from({ length: rows }).map((_, rowIndex) => (
            <tr key={rowIndex}>
              {Array.from({ length: columns }).map((_, colIndex) => (
                <td
                  key={colIndex}
                  style={{
                    padding: '14px 20px',
                    borderBottom: '1px solid var(--line)',
                  }}
                >
                  <Skeleton variant="text" width={colIndex === 0 ? '80%' : '100%'} />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
