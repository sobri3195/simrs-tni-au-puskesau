import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export function Topbar() {
  const navigate = useNavigate();
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [showNotifications, setShowNotifications] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);

  const notifications = [
    { id: 1, title: 'Pasien kritis di IGD', message: 'Pasien P001 memerlukan perhatian segera', time: '2 menit lalu', read: false },
    { id: 2, title: 'Hasil Lab tersedia', message: 'Hasil lab untuk P002 sudah selesai', time: '15 menit lalu', read: false },
    { id: 3, title: 'Order farmasi baru', message: '3 resep menunggu diproses', time: '30 menit lalu', read: true },
  ];

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <header
      className="topbar"
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        gap: '16px',
        padding: '16px 24px',
        background: 'rgba(255, 255, 255, 0.95)',
        borderBottom: '1px solid var(--line)',
        backdropFilter: 'blur(12px)',
        position: 'sticky',
        top: 0,
        zIndex: 100,
      }}
    >
      {/* Left Section */}
      <div className="topbar-left" style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
        <div className="topbar-context" style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <strong className="topbar-title" style={{ fontSize: '15px', fontWeight: 600, color: 'var(--fg)' }}>
              Unit: IGD Komando
            </strong>
            <span
              style={{
                padding: '2px 8px',
                background: 'var(--success-light)',
                color: 'var(--success)',
                borderRadius: 'var(--radius-full)',
                fontSize: '11px',
                fontWeight: 600,
              }}
            >
              Online
            </span>
          </div>
          <span className="topbar-subtitle" style={{ fontSize: '12px', color: 'var(--neutral)' }}>
            SIMRS Puskesau • Operasional Harian
          </span>
        </div>
      </div>

      {/* Right Section */}
      <div className="topbar-actions" style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        {/* Search */}
        <div style={{ position: 'relative' }}>
          <input
            className="topbar-search"
            type="search"
            placeholder="Cari menu, pasien, order... (Ctrl+K)"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{
              width: searchOpen ? '320px' : '280px',
              padding: '10px 14px 10px 40px',
              border: '1px solid var(--line)',
              borderRadius: 'var(--radius-lg)',
              fontSize: '13px',
              background: 'var(--surface-secondary)',
              transition: 'all 0.2s ease',
            }}
          />
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            style={{
              position: 'absolute',
              left: '14px',
              top: '50%',
              transform: 'translateY(-50%)',
              color: 'var(--neutral)',
            }}
          >
            <circle cx="11" cy="11" r="8" />
            <path d="M21 21l-4.35-4.35" />
          </svg>
        </div>

        {/* Quick Actions */}
        <button
          style={{
            width: '40px',
            height: '40px',
            border: 'none',
            background: 'var(--bg-secondary)',
            borderRadius: 'var(--radius)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'var(--fg-secondary)',
            cursor: 'pointer',
            transition: 'all 0.2s ease',
          }}
          title="Buat registrasi baru"
          onClick={() => navigate('/registrations/new')}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="12" y1="5" x2="12" y2="19" />
            <line x1="5" y1="12" x2="19" y2="12" />
          </svg>
        </button>

        {/* Notifications */}
        <div style={{ position: 'relative' }}>
          <button
            className="topbar-icon-btn"
            onClick={() => setShowNotifications(!showNotifications)}
            style={{
              width: '40px',
              height: '40px',
              border: 'none',
              background: 'transparent',
              borderRadius: 'var(--radius)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'var(--neutral)',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
              position: 'relative',
            }}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
              <path d="M13.73 21a2 2 0 0 1-3.46 0" />
            </svg>
            {unreadCount > 0 && (
              <span
                className="badge"
                style={{
                  position: 'absolute',
                  top: '4px',
                  right: '4px',
                  width: '18px',
                  height: '18px',
                  background: 'var(--danger)',
                  color: 'white',
                  fontSize: '10px',
                  fontWeight: 600,
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  border: '2px solid white',
                }}
              >
                {unreadCount}
              </span>
            )}
          </button>

          {/* Notifications Dropdown */}
          {showNotifications && (
            <div
              style={{
                position: 'absolute',
                top: '100%',
                right: 0,
                marginTop: '8px',
                width: '360px',
                background: 'var(--surface)',
                border: '1px solid var(--line)',
                borderRadius: 'var(--radius-lg)',
                boxShadow: 'var(--shadow-lg)',
                zIndex: 200,
                overflow: 'hidden',
              }}
            >
              <div
                style={{
                  padding: '16px',
                  borderBottom: '1px solid var(--line)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}
              >
                <h4 style={{ margin: 0, fontSize: '14px' }}>Notifikasi</h4>
                <button style={{ background: 'none', border: 'none', color: 'var(--airforce-blue)', fontSize: '12px', cursor: 'pointer', fontWeight: 600 }}>
                  Tandai semua dibaca
                </button>
              </div>
              <div style={{ maxHeight: '320px', overflowY: 'auto' }}>
                {notifications.map((notif) => (
                  <div
                    key={notif.id}
                    style={{
                      padding: '14px 16px',
                      borderBottom: '1px solid var(--line)',
                      background: notif.read ? 'transparent' : 'rgba(61, 90, 128, 0.04)',
                      cursor: 'pointer',
                      transition: 'background 0.2s ease',
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                      {!notif.read && (
                        <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--airforce-blue)', flexShrink: 0, marginTop: '6px' }} />
                      )}
                      <div style={{ flex: 1 }}>
                        <div style={{ fontWeight: 600, fontSize: '13px', marginBottom: '2px', color: 'var(--fg)' }}>{notif.title}</div>
                        <div style={{ fontSize: '12px', color: 'var(--fg-secondary)', marginBottom: '4px' }}>{notif.message}</div>
                        <div style={{ fontSize: '11px', color: 'var(--neutral)' }}>{notif.time}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div style={{ padding: '12px', borderTop: '1px solid var(--line)', textAlign: 'center' }}>
                <button
                  onClick={() => navigate('/notifications')}
                  style={{ background: 'none', border: 'none', color: 'var(--airforce-blue)', fontSize: '13px', cursor: 'pointer', fontWeight: 600 }}
                >
                  Lihat semua notifikasi
                </button>
              </div>
            </div>
          )}
        </div>

        {/* User Menu */}
        <div style={{ position: 'relative' }}>
          <button
            onClick={() => setShowUserMenu(!showUserMenu)}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              padding: '6px 12px 6px 6px',
              border: '1px solid var(--line)',
              borderRadius: 'var(--radius-lg)',
              background: 'white',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
            }}
          >
            <div
              style={{
                width: '32px',
                height: '32px',
                borderRadius: '50%',
                background: 'linear-gradient(135deg, var(--airforce-blue), var(--airforce-light))',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white',
                fontWeight: 600,
                fontSize: '12px',
              }}
            >
              AS
            </div>
            <div style={{ textAlign: 'left' }}>
              <div style={{ fontSize: '13px', fontWeight: 600, color: 'var(--fg)' }}>Dr. Andi</div>
              <div style={{ fontSize: '11px', color: 'var(--neutral)' }}>Dokter IGD</div>
            </div>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ color: 'var(--neutral)' }}>
              <polyline points="6 9 12 15 18 9" />
            </svg>
          </button>

          {/* User Dropdown */}
          {showUserMenu && (
            <div
              style={{
                position: 'absolute',
                top: '100%',
                right: 0,
                marginTop: '8px',
                width: '200px',
                background: 'var(--surface)',
                border: '1px solid var(--line)',
                borderRadius: 'var(--radius)',
                boxShadow: 'var(--shadow-lg)',
                zIndex: 200,
                overflow: 'hidden',
              }}
            >
              <div style={{ padding: '12px 14px' }}>
                <div style={{ fontWeight: 600, fontSize: '14px', color: 'var(--fg)' }}>Dr. Andi Setiawan</div>
                <div style={{ fontSize: '12px', color: 'var(--neutral)' }}>andi.setiawan@tni.au.mil</div>
              </div>
              <div style={{ borderTop: '1px solid var(--line)' }}>
                {[
                  { label: 'Profil Saya', icon: 'M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2M12 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8z' },
                  { label: 'Pengaturan', icon: 'M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z' },
                ].map((item, index) => (
                  <button
                    key={index}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '10px',
                      width: '100%',
                      padding: '10px 14px',
                      border: 'none',
                      background: 'transparent',
                      textAlign: 'left',
                      cursor: 'pointer',
                      fontSize: '13px',
                      color: 'var(--fg)',
                      transition: 'background 0.2s ease',
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.background = 'var(--bg)')}
                    onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d={item.icon} />
                    </svg>
                    {item.label}
                  </button>
                ))}
              </div>
              <div style={{ borderTop: '1px solid var(--line)' }}>
                <button
                  onClick={() => navigate('/login')}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px',
                    width: '100%',
                    padding: '10px 14px',
                    border: 'none',
                    background: 'transparent',
                    textAlign: 'left',
                    cursor: 'pointer',
                    fontSize: '13px',
                    color: 'var(--danger)',
                    fontWeight: 600,
                  }}
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                    <polyline points="16 17 21 12 16 7" />
                    <line x1="21" y1="12" x2="9" y2="12" />
                  </svg>
                  Keluar
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
