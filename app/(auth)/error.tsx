'use client';

export default function AuthError({ reset }: { reset: () => void }) {
  return (
    <div>
      <h2>Error autentikasi</h2>
      <button onClick={reset}>Coba lagi</button>
    </div>
  );
}
