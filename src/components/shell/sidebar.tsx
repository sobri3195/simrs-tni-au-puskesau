import React, { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';

interface MenuItem {
  label: string;
  href: string;
  icon?: React.ReactNode;
  badge?: number;
  children?: { label: string; href: string; badge?: number }[];
}

const menuItems: MenuItem[] = [
  {
    label: 'Dashboard',
    href: '/dashboard/command',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <rect x="3" y="3" width="7" height="7" />
        <rect x="14" y="3" width="7" height="7" />
        <rect x="14" y="14" width="7" height="7" />
        <rect x="3" y="14" width="7" height="7" />
      </svg>
    ),
  },
  {
    label: 'Pasien',
    href: '/patients',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
  },
  {
    label: 'Registrasi & ADT',
    href: '/registrations',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
        <polyline points="14 2 14 8 20 8" />
        <line x1="12" y1="18" x2="12" y2="12" />
        <line x1="9" y1="15" x2="15" y2="15" />
      </svg>
    ),
    children: [
      { label: 'Registrasi Baru', href: '/registrations/new' },
      { label: 'Jadwal Appointment', href: '/registrations/appointments' },
      { label: 'Admission', href: '/registrations/admission' },
      { label: 'Transfer', href: '/registrations/transfer' },
      { label: 'Discharge', href: '/registrations/discharge' },
    ],
  },
  {
    label: 'Layanan Klinis',
    href: '/clinical',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
      </svg>
    ),
    badge: 5,
    children: [
      { label: 'Rawat Jalan', href: '/clinical/outpatient', badge: 3 },
      { label: 'IGD & Triase', href: '/clinical/emergency', badge: 2 },
      { label: 'Rawat Inap', href: '/clinical/inpatient' },
      { label: 'EMR', href: '/clinical/emr' },
    ],
  },
  {
    label: 'Penunjang',
    href: '/support',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
      </svg>
    ),
    children: [
      { label: 'Laboratorium', href: '/lab', badge: 8 },
      { label: 'Radiologi', href: '/radiology' },
      { label: 'Farmasi', href: '/pharmacy', badge: 3 },
    ],
  },
  {
    label: 'Keuangan',
    href: '/finance',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <line x1="12" y1="1" x2="12" y2="23" />
        <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
      </svg>
    ),
    children: [
      { label: 'Billing', href: '/billing' },
      { label: 'Kasir', href: '/cashier' },
      { label: 'Klaim', href: '/claims', badge: 2 },
    ],
  },
  {
    label: 'Operasional RS',
    href: '/operations',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
        <polyline points="9 22 9 12 15 12 15 22" />
      </svg>
    ),
    children: [
      { label: 'Logistik & Stok', href: '/logistics', badge: 4 },
      { label: 'SDM & Shift', href: '/hr' },
      { label: 'Bed Management', href: '/beds' },
    ],
  },
  {
    label: 'Governance',
    href: '/governance',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      </svg>
    ),
    children: [
      { label: 'Audit Trail', href: '/audit' },
      { label: 'Laporan', href: '/reports' },
      { label: 'Konfigurasi', href: '/settings' },
    ],
  },
  {
    label: 'Kolaborasi',
    href: '/collaboration',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
      </svg>
    ),
    badge: 12,
    children: [
      { label: 'Notifikasi', href: '/notifications', badge: 12 },
      { label: 'Task & Handover', href: '/tasks' },
    ],
  },
];

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export function Sidebar({ isOpen, onClose }: SidebarProps) {
  const location = useLocation();
  const [expandedItems, setExpandedItems] = useState<string[]>([]);

  const toggleExpand = (label: string) => {
    setExpandedItems((prev) =>
      prev.includes(label) ? prev.filter((item) => item !== label) : [...prev, label]
    );
  };

  const isChildActive = (children?: MenuItem['children']) => {
    return children?.some((child) => location.pathname.startsWith(child.href));
  };

  return (
    <aside
      className={`sidebar ${isOpen ? 'open' : ''}`}
      style={{
        color: 'white',
        padding: '20px 12px',
        background: 'linear-gradient(180deg, #1a2744 0%, #172338 50%, #0f1929 100%)',
        borderRight: '1px solid rgba(255, 255, 255, 0.08)',
        display: 'flex',
        flexDirection: 'column',
        overflowY: 'auto',
      }}
    >
      {/* Brand */}
      <div
        className="brand"
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          padding: '8px 12px',
          marginBottom: '16px',
        }}
      >
        <img
          src="/logo-simrs.svg"
          alt="Logo SIMRS"
          style={{
            width: '40px',
            height: '40px',
            borderRadius: '12px',
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.3)',
            background: 'white',
            padding: '4px',
          }}
        />
        <div className="brand-text">
          <h3
            className="brand-title"
            style={{
              fontSize: '15px',
              margin: '0 0 2px',
              fontWeight: 700,
              background: 'linear-gradient(135deg, #fff 0%, #94a3b8 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            SIMRS TNI AU
          </h3>
          <p className="brand-subtitle" style={{ fontSize: '11px', color: '#94a3b8', margin: 0 }}>
            Puskesau Komando
          </p>
        </div>
      </div>

      {/* Navigation */}
      <p
        className="sidebar-caption"
        style={{
          margin: '16px 8px 8px',
          fontSize: '10px',
          letterSpacing: '0.1em',
          textTransform: 'uppercase',
          color: '#64748b',
          fontWeight: 600,
        }}
      >
        Navigasi Utama
      </p>
      <nav style={{ display: 'flex', flexDirection: 'column', gap: '4px', flex: 1 }}>
        {menuItems.map((item) => {
          const hasChildren = item.children && item.children.length > 0;
          const isExpanded = expandedItems.includes(item.label);
          const isActive = location.pathname === item.href || location.pathname.startsWith(item.href + '/');
          const childActive = isChildActive(item.children);

          return (
            <div key={item.label}>
              {hasChildren ? (
                <button
                  onClick={() => toggleExpand(item.label)}
                  className={`sidebar-link ${childActive ? 'active' : ''}`}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    padding: '11px 14px',
                    borderRadius: '12px',
                    color: childActive ? 'white' : '#cbd5e1',
                    fontSize: '14px',
                    fontWeight: childActive ? 600 : 500,
                    background: childActive ? 'rgba(61, 90, 128, 0.3)' : 'transparent',
                    border: 'none',
                    cursor: 'pointer',
                    width: '100%',
                    textAlign: 'left',
                    transition: 'all 0.2s ease',
                  }}
                >
                  <span style={{ opacity: 0.8 }}>{item.icon}</span>
                  <span style={{ flex: 1 }}>{item.label}</span>
                  {item.badge && (
                    <span
                      style={{
                        background: 'var(--danger)',
                        color: 'white',
                        fontSize: '11px',
                        fontWeight: 600,
                        padding: '2px 8px',
                        borderRadius: 'var(--radius-full)',
                        minWidth: '20px',
                        textAlign: 'center',
                      }}
                    >
                      {item.badge}
                    </span>
                  )}
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    style={{
                      transform: isExpanded ? 'rotate(180deg)' : 'rotate(0)',
                      transition: 'transform 0.2s ease',
                    }}
                  >
                    <polyline points="6 9 12 15 18 9" />
                  </svg>
                </button>
              ) : (
                <NavLink
                  to={item.href}
                  onClick={onClose}
                  className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`}
                  style={({ isActive }) => ({
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    padding: '11px 14px',
                    borderRadius: '12px',
                    color: isActive ? 'white' : '#cbd5e1',
                    fontSize: '14px',
                    fontWeight: isActive ? 600 : 500,
                    background: isActive ? 'rgba(61, 90, 128, 0.3)' : 'transparent',
                    transition: 'all 0.2s ease',
                    textDecoration: 'none',
                  })}
                >
                  <span style={{ opacity: 0.8 }}>{item.icon}</span>
                  <span style={{ flex: 1 }}>{item.label}</span>
                  {item.badge && (
                    <span
                      style={{
                        background: 'var(--danger)',
                        color: 'white',
                        fontSize: '11px',
                        fontWeight: 600,
                        padding: '2px 8px',
                        borderRadius: 'var(--radius-full)',
                        minWidth: '20px',
                        textAlign: 'center',
                      }}
                    >
                      {item.badge}
                    </span>
                  )}
                </NavLink>
              )}

              {/* Submenu */}
              {hasChildren && isExpanded && (
                <div style={{ paddingLeft: '20px', marginTop: '4px' }}>
                  {item.children?.map((child) => (
                    <NavLink
                      key={child.href}
                      to={child.href}
                      onClick={onClose}
                      className={({ isActive }) => isActive ? 'active' : ''}
                      style={({ isActive }) => ({
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                        padding: '9px 14px',
                        borderRadius: '10px',
                        color: isActive ? 'white' : '#94a3b8',
                        fontSize: '13px',
                        fontWeight: isActive ? 600 : 500,
                        background: isActive ? 'rgba(61, 90, 128, 0.2)' : 'transparent',
                        transition: 'all 0.2s ease',
                        textDecoration: 'none',
                        marginTop: '2px',
                      })}
                    >
                      <span style={{ width: '4px', height: '4px', borderRadius: '50%', background: 'currentColor' }} />
                      <span style={{ flex: 1 }}>{child.label}</span>
                      {child.badge && (
                        <span
                          style={{
                            background: 'rgba(220, 38, 38, 0.8)',
                            color: 'white',
                            fontSize: '10px',
                            fontWeight: 600,
                            padding: '2px 6px',
                            borderRadius: 'var(--radius-full)',
                            minWidth: '18px',
                            textAlign: 'center',
                          }}
                        >
                          {child.badge}
                        </span>
                      )}
                    </NavLink>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </nav>

      {/* User Profile */}
      <div
        className="sidebar-footer"
        style={{
          marginTop: 'auto',
          padding: '16px 12px',
          borderTop: '1px solid rgba(255, 255, 255, 0.08)',
        }}
      >
        <div className="sidebar-user" style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div
            className="sidebar-avatar"
            style={{
              width: '36px',
              height: '36px',
              borderRadius: '50%',
              background: 'linear-gradient(135deg, var(--airforce-blue), var(--airforce-light))',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: 600,
              fontSize: '14px',
              color: 'white',
            }}
          >
            AS
          </div>
          <div className="sidebar-user-info" style={{ flex: 1, minWidth: 0 }}>
            <div
              className="sidebar-user-name"
              style={{
                fontSize: '13px',
                fontWeight: 600,
                color: 'white',
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
              }}
            >
              Dr. Andi Setiawan
            </div>
            <div className="sidebar-user-role" style={{ fontSize: '11px', color: '#94a3b8' }}>
              Dokter • IGD
            </div>
          </div>
          <button
            style={{
              background: 'transparent',
              border: 'none',
              color: '#94a3b8',
              cursor: 'pointer',
              padding: '4px',
              borderRadius: '6px',
              transition: 'all 0.2s ease',
            }}
            title="Logout"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
              <polyline points="16 17 21 12 16 7" />
              <line x1="21" y1="12" x2="9" y2="12" />
            </svg>
          </button>
        </div>
      </div>
    </aside>
  );
}
