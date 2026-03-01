import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

export function LoginPage() {
  return (
    <div>
      <h1>Login SIMRS</h1>
      <p>Akses aman pengguna dengan MFA.</p>
      <input aria-label="Username" placeholder="Username" style={{ width: '100%', marginBottom: 8 }} />
      <input aria-label="Password" type="password" placeholder="Password" style={{ width: '100%', marginBottom: 8 }} />
      <Button style={{ width: '100%' }}>Masuk</Button>
      <p style={{ marginTop: 12 }}>
        <Link to="/forgot-password">Lupa password?</Link>
      </p>
    </div>
  );
}
