import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

export function LoginPage() {
  return (
    <div>
      <img src="/logo-simrs.svg" alt="Logo SIMRS" width={46} height={46} />
      <h1>Login SIMRS</h1>
      <p className="auth-description">Akses aman pengguna dengan MFA.</p>
      <input aria-label="Username" placeholder="Username" className="auth-input" />
      <input aria-label="Password" type="password" placeholder="Password" className="auth-input" />
      <Button style={{ width: '100%' }}>Masuk</Button>
      <div className="auth-links">
        <Link to="/forgot-password">Lupa password?</Link>
        <Link to="/dashboard/command" className="bypass-link">
          Bypass login
        </Link>
      </div>
    </div>
  );
}
