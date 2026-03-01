'use client';

export default function GlobalError({ reset }: { reset: () => void }) {
  return (
    <div style={{ padding: 24 }}>
      <h2>Terjadi gangguan sistem</h2>
      <button onClick={reset}>Coba lagi</button>
    </div>
  );
}
