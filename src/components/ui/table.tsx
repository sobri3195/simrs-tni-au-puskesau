import React from 'react';

interface Column<T> {
  key: string;
  header: string;
  width?: string;
  render?: (item: T, index: number) => React.ReactNode;
  sortable?: boolean;
}

interface TableProps<T> {
  columns: Column<T>[];
  data: T[];
  keyExtractor: (item: T, index: number) => string;
  onRowClick?: (item: T, index: number) => void;
  loading?: boolean;
  emptyMessage?: string;
  emptyAction?: React.ReactNode;
  className?: string;
}

export function Table<T>({
  columns,
  data,
  keyExtractor,
  onRowClick,
  loading = false,
  emptyMessage = 'Tidak ada data',
  emptyAction,
  className = '',
}: TableProps<T>) {
  if (loading) {
    return (
      <div className={`table-container ${className}`}>
        <div style={{ padding: '20px' }}>
          {[...Array(5)].map((_, i) => (
            <div key={i} style={{ display: 'flex', gap: '16px', marginBottom: '12px' }}>
              {columns.map((col, j) => (
                <div
                  key={j}
                  className="skeleton"
                  style={{ width: col.width || '100px', height: '16px' }}
                />
              ))}
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (data.length === 0) {
    return (
      <div className={`table-container ${className}`}>
        <div className="empty-state">
          <div className="empty-state-icon">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
              <polyline points="14 2 14 8 20 8" />
              <line x1="16" y1="13" x2="8" y2="13" />
              <line x1="16" y1="17" x2="8" y2="17" />
            </svg>
          </div>
          <h3>{emptyMessage}</h3>
          {emptyAction}
        </div>
      </div>
    );
  }

  return (
    <div className={`table-container ${className}`}>
      <table className="table" style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            {columns.map((col) => (
              <th
                key={col.key}
                style={{
                  textAlign: 'left',
                  padding: '14px 20px',
                  borderBottom: '1px solid var(--line)',
                  background: 'var(--surface-secondary)',
                  fontSize: 11,
                  fontWeight: 600,
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em',
                  color: 'var(--neutral)',
                  width: col.width,
                }}
              >
                {col.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr
              key={keyExtractor(item, index)}
              onClick={() => onRowClick?.(item, index)}
              style={{
                cursor: onRowClick ? 'pointer' : 'default',
                transition: 'background 0.2s ease',
              }}
              onMouseEnter={(e) => {
                if (onRowClick) e.currentTarget.style.background = 'var(--surface-secondary)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'transparent';
              }}
            >
              {columns.map((col) => (
                <td
                  key={col.key}
                  style={{
                    padding: '14px 20px',
                    borderBottom: '1px solid var(--line)',
                  }}
                >
                  {col.render
                    ? col.render(item, index)
                    : (item as Record<string, unknown>)[col.key] as React.ReactNode}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

interface TableHeaderProps {
  title: string;
  action?: React.ReactNode;
  search?: {
    value: string;
    onChange: (value: string) => void;
    placeholder?: string;
  };
}

export function TableHeader({ title, action, search }: TableHeaderProps) {
  return (
    <div
      className="table-header"
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '16px 20px',
        borderBottom: '1px solid var(--line)',
        background: 'var(--surface-secondary)',
      }}
    >
      <h3 style={{ fontSize: 15, fontWeight: 600, margin: 0 }}>{title}</h3>
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        {search && (
          <div style={{ position: 'relative' }}>
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              style={{
                position: 'absolute',
                left: '12px',
                top: '50%',
                transform: 'translateY(-50%)',
                color: 'var(--neutral)',
              }}
            >
              <circle cx="11" cy="11" r="8" />
              <path d="M21 21l-4.35-4.35" />
            </svg>
            <input
              type="search"
              value={search.value}
              onChange={(e) => search.onChange(e.target.value)}
              placeholder={search.placeholder || 'Cari...'}
              style={{
                padding: '8px 12px 8px 36px',
                border: '1px solid var(--line)',
                borderRadius: 'var(--radius)',
                fontSize: '13px',
                width: '200px',
              }}
            />
          </div>
        )}
        {action}
      </div>
    </div>
  );
}
