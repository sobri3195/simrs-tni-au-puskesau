import { NavLink } from 'react-router-dom';
import { APP_MENU } from '@/lib/routes';

export function Sidebar() {
  return (
    <aside style={{ width: 260, background: 'var(--navy)', color: 'white', padding: 12 }}>
      <h3>SIMRS TNI AU</h3>
      <nav>
        {APP_MENU.map((item) => (
          <div key={item.href} style={{ padding: '8px 0' }}>
            <NavLink
              to={item.href}
              style={({ isActive }) => ({
                color: 'white',
                fontWeight: isActive ? 700 : 400,
                textDecoration: 'none'
              })}
            >
              {item.label}
            </NavLink>
          </div>
        ))}
      </nav>
    </aside>
  );
}
