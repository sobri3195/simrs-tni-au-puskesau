import { NavLink } from 'react-router-dom';
import { APP_MENU } from '@/lib/routes';

export function Sidebar() {
  return (
    <aside className="sidebar">
      <div className="brand">
        <img src="/logo-simrs.svg" alt="Logo SIMRS" />
        <div>
          <h3 className="brand-title">SIMRS TNI AU</h3>
          <p className="brand-subtitle">Puskesau Komando</p>
        </div>
      </div>
      <p className="sidebar-caption">Navigasi Utama</p>
      <nav>
        {APP_MENU.map((item) => (
          <NavLink
            key={item.href}
            to={item.href}
            className={({ isActive }) => `sidebar-link${isActive ? ' active' : ''}`}
          >
            {item.label}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
}
