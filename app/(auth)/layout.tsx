export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <main style={{ minHeight: '100vh', display: 'grid', placeItems: 'center' }}>
      <div style={{ width: 420, background: 'white', padding: 24, borderRadius: 12 }}>{children}</div>
    </main>
  );
}
