import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Alert } from '@/components/ui/alert';

export function LoginPage() {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showMFA, setShowMFA] = useState(false);
  const [mfaCode, setMfaCode] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    // Simulate login
    await new Promise((resolve) => setTimeout(resolve, 1500));

    if (!username || !password) {
      setError('Username dan password harus diisi');
      setLoading(false);
      return;
    }

    // Simulate MFA step
    setShowMFA(true);
    setLoading(false);
  };

  const handleMFAVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    await new Promise((resolve) => setTimeout(resolve, 1000));

    if (mfaCode.length !== 6) {
      setError('Kode OTP harus 6 digit');
      setLoading(false);
      return;
    }

    navigate('/dashboard/command');
  };

  return (
    <div
      className="auth-layout"
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '24px',
        background: 'linear-gradient(135deg, #1b263b 0%, #1a2744 50%, #0f1929 100%)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Background Decorations */}
      <div
        style={{
          position: 'absolute',
          top: '-50%',
          left: '-50%',
          width: '200%',
          height: '200%',
          background: `
            radial-gradient(circle at 20% 20%, rgba(61, 90, 128, 0.15) 0%, transparent 40%),
            radial-gradient(circle at 80% 80%, rgba(106, 141, 184, 0.1) 0%, transparent 40%)
          `,
          animation: 'rotate 30s linear infinite',
        }}
      />
      <div
        style={{
          position: 'absolute',
          top: '10%',
          right: '10%',
          width: '300px',
          height: '300px',
          background: 'radial-gradient(circle, rgba(61, 90, 128, 0.2) 0%, transparent 70%)',
          borderRadius: '50%',
          filter: 'blur(40px)',
        }}
      />
      <div
        style={{
          position: 'absolute',
          bottom: '10%',
          left: '10%',
          width: '250px',
          height: '250px',
          background: 'radial-gradient(circle, rgba(106, 141, 184, 0.15) 0%, transparent 70%)',
          borderRadius: '50%',
          filter: 'blur(40px)',
        }}
      />

      {/* Login Card */}
      <div
        className="auth-card"
        style={{
          width: '100%',
          maxWidth: '420px',
          background: 'rgba(255, 255, 255, 0.98)',
          borderRadius: 'var(--radius-xl)',
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
          padding: '36px',
          position: 'relative',
          zIndex: 1,
          backdropFilter: 'blur(20px)',
        }}
      >
        {!showMFA ? (
          <>
            {/* Logo */}
            <div
              className="auth-logo"
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '24px',
              }}
            >
              <div
                style={{
                  width: '64px',
                  height: '64px',
                  borderRadius: '16px',
                  background: 'linear-gradient(135deg, var(--airforce-blue), var(--airforce-dark))',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: '0 8px 24px rgba(61, 90, 128, 0.3)',
                }}
              >
                <img src="/logo-simrs.svg" alt="Logo" width={40} height={40} />
              </div>
            </div>

            {/* Title */}
            <div style={{ textAlign: 'center', marginBottom: '32px' }}>
              <h1 style={{ fontSize: '24px', marginBottom: '8px', color: 'var(--fg)' }}>Selamat Datang</h1>
              <p style={{ color: 'var(--neutral)', margin: 0 }}>
                Masuk ke SIMRS TNI AU untuk melanjutkan
              </p>
            </div>

            {/* Error Alert */}
            {error && (
              <Alert variant="danger" style={{ marginBottom: '20px' }}>
                {error}
              </Alert>
            )}

            {/* Login Form */}
            <form onSubmit={handleLogin}>
              <Input
                label="Username"
                placeholder="Masukkan username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                autoComplete="username"
                icon={
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                    <circle cx="12" cy="7" r="4" />
                  </svg>
                }
              />

              <Input
                label="Password"
                type="password"
                placeholder="Masukkan password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                autoComplete="current-password"
                icon={
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                  </svg>
                }
              />

              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  marginBottom: '24px',
                }}
              >
                <label
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    fontSize: '13px',
                    color: 'var(--fg-secondary)',
                    cursor: 'pointer',
                  }}
                >
                  <input type="checkbox" style={{ width: '16px', height: '16px' }} />
                  Ingat saya
                </label>
                <Link
                  to="/forgot-password"
                  style={{
                    fontSize: '13px',
                    color: 'var(--airforce-blue)',
                    fontWeight: 600,
                  }}
                >
                  Lupa password?
                </Link>
              </div>

              <Button type="submit" fullWidth size="lg" loading={loading}>
                Masuk
              </Button>
            </form>

            {/* Footer */}
            <div
              style={{
                marginTop: '24px',
                paddingTop: '24px',
                borderTop: '1px solid var(--line)',
                textAlign: 'center',
              }}
            >
              <p style={{ fontSize: '12px', color: 'var(--neutral)', margin: 0 }}>
                © 2024 SIMRS TNI AU • Puskesau Komando
              </p>
            </div>
          </>
        ) : (
          <>
            {/* MFA Step */}
            <div style={{ textAlign: 'center', marginBottom: '32px' }}>
              <div
                style={{
                  width: '64px',
                  height: '64px',
                  borderRadius: '16px',
                  background: 'var(--info-light)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 16px',
                }}
              >
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="var(--info)" strokeWidth="2">
                  <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                  <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                </svg>
              </div>
              <h1 style={{ fontSize: '22px', marginBottom: '8px', color: 'var(--fg)' }}>
                Verifikasi Dua Langkah
              </h1>
              <p style={{ color: 'var(--neutral)', margin: 0 }}>
                Masukkan kode 6 digit yang dikirim ke perangkat Anda
              </p>
            </div>

            {error && (
              <Alert variant="danger" style={{ marginBottom: '20px' }}>
                {error}
              </Alert>
            )}

            <form onSubmit={handleMFAVerify}>
              <div style={{ marginBottom: '24px' }}>
                <label
                  style={{
                    display: 'block',
                    fontSize: '13px',
                    fontWeight: 600,
                    color: 'var(--fg)',
                    marginBottom: '8px',
                  }}
                >
                  Kode OTP
                </label>
                <div
                  style={{
                    display: 'flex',
                    gap: '8px',
                    justifyContent: 'center',
                  }}
                >
                  {[...Array(6)].map((_, i) => (
                    <input
                      key={i}
                      type="text"
                      maxLength={1}
                      value={mfaCode[i] || ''}
                      onChange={(e) => {
                        const value = e.target.value.replace(/\D/g, '');
                        const newCode = mfaCode.split('');
                        newCode[i] = value;
                        setMfaCode(newCode.join(''));
                        if (value && e.target.nextSibling) {
                          (e.target.nextSibling as HTMLInputElement).focus();
                        }
                      }}
                      style={{
                        width: '48px',
                        height: '56px',
                        border: '1px solid var(--line)',
                        borderRadius: 'var(--radius)',
                        fontSize: '24px',
                        fontWeight: 600,
                        textAlign: 'center',
                        outline: 'none',
                        transition: 'all 0.2s ease',
                      }}
                      onFocus={(e) => {
                        e.target.style.borderColor = 'var(--airforce-blue)';
                        e.target.style.boxShadow = '0 0 0 3px rgba(61, 90, 128, 0.1)';
                      }}
                      onBlur={(e) => {
                        e.target.style.borderColor = 'var(--line)';
                        e.target.style.boxShadow = 'none';
                      }}
                    />
                  ))}
                </div>
              </div>

              <Button type="submit" fullWidth size="lg" loading={loading}>
                Verifikasi
              </Button>
            </form>

            <div
              style={{
                marginTop: '16px',
                textAlign: 'center',
              }}
            >
              <button
                type="button"
                onClick={() => setShowMFA(false)}
                style={{
                  background: 'none',
                  border: 'none',
                  color: 'var(--neutral)',
                  fontSize: '13px',
                  cursor: 'pointer',
                }}
              >
                ← Kembali ke login
              </button>
            </div>

            <div
              style={{
                marginTop: '16px',
                textAlign: 'center',
              }}
            >
              <p style={{ fontSize: '13px', color: 'var(--neutral)', margin: 0 }}>
                Tidak menerima kode?{' '}
                <button
                  type="button"
                  style={{
                    background: 'none',
                    border: 'none',
                    color: 'var(--airforce-blue)',
                    fontWeight: 600,
                    cursor: 'pointer',
                  }}
                >
                  Kirim ulang
                </button>
              </p>
            </div>
          </>
        )}

        {/* Demo Bypass */}
        <div
          style={{
            marginTop: '20px',
            padding: '12px',
            background: 'var(--surface-secondary)',
            borderRadius: 'var(--radius)',
            textAlign: 'center',
          }}
        >
          <Link
            to="/dashboard/command"
            style={{
              fontSize: '13px',
              color: 'var(--info)',
              fontWeight: 600,
            }}
          >
            ⚡ Bypass login (Demo mode)
          </Link>
        </div>
      </div>

      <style>{`
        @keyframes rotate {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}
