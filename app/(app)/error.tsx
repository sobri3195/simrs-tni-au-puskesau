'use client';

export default function ErrorPage({ reset }: { reset: () => void }) {
  return (
    <div>
      <h2>Gagal memuat modul</h2>
      <button onClick={reset}>Retry</button>
    </div>
  );
}
