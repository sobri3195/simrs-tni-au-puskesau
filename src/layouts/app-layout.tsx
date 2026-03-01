import { Outlet } from 'react-router-dom';
import { Sidebar } from '@/components/shell/sidebar';
import { Topbar } from '@/components/shell/topbar';

export function AppLayout() {
  return (
    <div className="shell">
      <Sidebar />
      <div className="shell-content">
        <Topbar />
        <main className="page-main">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
