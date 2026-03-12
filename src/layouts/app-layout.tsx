import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Sidebar } from '@/components/shell/sidebar';
import { Topbar } from '@/components/shell/topbar';

export function AppLayout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="shell">
      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
      {isSidebarOpen && <div className="shell-overlay" onClick={() => setIsSidebarOpen(false)} aria-hidden="true" />}
      <div className="shell-content">
        <Topbar onToggleSidebar={() => setIsSidebarOpen((prev) => !prev)} />
        <main className="page-main">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
