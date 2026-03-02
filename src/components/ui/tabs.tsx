import React from 'react';

interface TabsProps {
  tabs: { id: string; label: string; count?: number; disabled?: boolean }[];
  activeTab: string;
  onChange: (tabId: string) => void;
  className?: string;
}

export function Tabs({ tabs, activeTab, onChange, className = '' }: TabsProps) {
  return (
    <div className={`tabs ${className}`} style={{ display: 'flex', gap: '4px', borderBottom: '1px solid var(--line)', marginBottom: '20px' }}>
      {tabs.map((tab) => (
        <button
          key={tab.id}
          className={`tab ${activeTab === tab.id ? 'active' : ''}`}
          onClick={() => !tab.disabled && onChange(tab.id)}
          disabled={tab.disabled}
          style={{
            padding: '12px 20px',
            fontSize: '14px',
            fontWeight: activeTab === tab.id ? 600 : 500,
            color: activeTab === tab.id ? 'var(--airforce-blue)' : 'var(--neutral)',
            background: 'transparent',
            border: 'none',
            cursor: tab.disabled ? 'not-allowed' : 'pointer',
            position: 'relative',
            transition: 'all 0.2s ease',
            opacity: tab.disabled ? 0.5 : 1,
          }}
        >
          {tab.label}
          {tab.count !== undefined && (
            <span
              style={{
                marginLeft: '8px',
                padding: '2px 8px',
                background: activeTab === tab.id ? 'var(--airforce-blue)' : 'var(--bg-secondary)',
                color: activeTab === tab.id ? 'white' : 'var(--fg-secondary)',
                borderRadius: 'var(--radius-full)',
                fontSize: '12px',
                fontWeight: 600,
              }}
            >
              {tab.count}
            </span>
          )}
          {activeTab === tab.id && (
            <span
              style={{
                position: 'absolute',
                bottom: '-1px',
                left: 0,
                right: 0,
                height: '2px',
                background: 'var(--airforce-blue)',
              }}
            />
          )}
        </button>
      ))}
    </div>
  );
}

interface TabPanelProps {
  children: React.ReactNode;
  activeTab: string;
  tabId: string;
}

export function TabPanel({ children, activeTab, tabId }: TabPanelProps) {
  if (activeTab !== tabId) return null;
  return <div role="tabpanel">{children}</div>;
}
