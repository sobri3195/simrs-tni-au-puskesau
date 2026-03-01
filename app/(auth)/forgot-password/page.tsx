import { Button } from '@/components/ui/button';

export default function ForgotPasswordPage() {
  return (
    <div>
      <h1>Reset Password</h1>
      <input aria-label="Email" placeholder="Email/Username" style={{ width: '100%', marginBottom: 8 }} />
      <Button>Kirim Link Reset</Button>
    </div>
  );
}
