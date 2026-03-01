import { Sidebar } from '@/components/shell/sidebar';
import { Topbar } from '@/components/shell/topbar';

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ display: 'flex', minHeight: '100vh' }}>
      <Sidebar />
      <div style={{ flex: 1 }}>
        <Topbar />
        <main style={{ padding: 16 }}>{children}</main>
      </div>
    </div>
  );
}
