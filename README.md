# SIMRS TNI AU Frontend Scaffold (React + Vite)

Scaffold ini menyiapkan fondasi UX SIMRS TNI AU dengan prinsip cepat, aman, terarah, dan tahan gangguan operasional 24/7 **tanpa Next.js**.

## Yang Sudah Disiapkan
- Arsitektur SPA berbasis React + Vite.
- Routing client-side menggunakan `react-router-dom` dengan area `(auth)` dan `(app)`.
- Shell aplikasi (sidebar + topbar), halaman login, serta halaman pasien dasar.
- Alias import `@` mengarah ke folder `src`.

## Menjalankan
```bash
npm install
npm run dev
```

Server Vite sekarang dibuka ke `0.0.0.0`, jadi bisa diakses dari semua perangkat pada jaringan yang sama.

## Build Produksi
```bash
npm run build
npm run preview
```

Tambahan: `npm run start` disediakan sebagai alias Vite untuk semua skenario development lokal.

## Dokumen Analisis
- Analisis mendalam kelengkapan fitur dan kesiapan modul tersedia di `docs/ANALISIS_KELENGKAPAN_MODUL.md`.
