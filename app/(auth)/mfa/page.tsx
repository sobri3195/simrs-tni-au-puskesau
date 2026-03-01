import { Button } from '@/components/ui/button';

export default function MfaPage() {
  return (
    <div>
      <h1>Verifikasi MFA</h1>
      <input aria-label="OTP" placeholder="6 digit OTP" maxLength={6} style={{ width: '100%', marginBottom: 8 }} />
      <Button>Verifikasi</Button>
    </div>
  );
}
