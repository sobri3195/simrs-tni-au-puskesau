# SIMRS TNI AU Frontend Scaffold (Next.js App Router)

Scaffold ini menyiapkan fondasi UX SIMRS TNI AU dengan prinsip cepat, aman, terarah, dan tahan gangguan operasional 24/7.

## Yang Sudah Disiapkan
- Struktur route group `(auth)` dan `(app)` dengan `layout`, `loading`, `error`, `not-found`.
- Domain route utama: dashboard komando, pasien, registrasi, EMR, lab, radiologi, farmasi, billing, klaim, logistik, HR, audit, report, notifikasi.
- API mode switch (`mock`/`real`) melalui `services/api-client.ts`.
- Mock API route handlers (`/api/mock/*`) dan proxy API (`/api/proxy/*`).
- RBAC matrix dasar, hook session/break-glass/offline queue, dan komponen shell + break-glass modal.
- ENV template siap deploy Vercel pada `.env.example`.

## Menjalankan
```bash
npm install
npm run dev
```

## ENV
Lihat `.env.example` untuk daftar variabel `NEXT_PUBLIC_*` dan server-only.
