import { Outlet } from 'react-router-dom';

export function AuthLayout() {
  return (
    <main style={{ minHeight: '100vh', display: 'grid', placeItems: 'center' }}>
      <div style={{ width: 420, background: 'white', padding: 24, borderRadius: 12 }}>
        <Outlet />
      </div>
    </main>
  );
}
