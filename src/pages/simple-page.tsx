import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardBody } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface SimplePageProps {
  title: string;
  description?: string;
}

export function SimplePage({ title, description }: SimplePageProps) {
  const navigate = useNavigate();
  const isOutpatientPage = title.toLowerCase().includes('rawat jalan');
  const isInpatientPage = title.toLowerCase().includes('rawat inap');

  const getPageIcon = () => {
    if (title.toLowerCase().includes('password')) return '🔐';
    if (title.toLowerCase().includes('pasien')) return '👤';
    if (title.toLowerCase().includes('appointment')) return '📅';
    if (title.toLowerCase().includes('admission')) return '🏥';
    if (title.toLowerCase().includes('transfer')) return '↔️';
    if (title.toLowerCase().includes('discharge')) return '🏠';
    if (title.toLowerCase().includes('rawat jalan')) return '🩺';
    if (title.toLowerCase().includes('rawat inap')) return '🛏️';
    if (title.toLowerCase().includes('emr')) return '📋';
    if (title.toLowerCase().includes('radiologi')) return '📷';
    if (title.toLowerCase().includes('klaim')) return '📄';
    if (title.toLowerCase().includes('logistik')) return '📦';
    if (title.toLowerCase().includes('sdm')) return '👥';
    if (title.toLowerCase().includes('bed')) return '🛏️';
    if (title.toLowerCase().includes('audit')) return '🔍';
    if (title.toLowerCase().includes('laporan')) return '📊';
    if (title.toLowerCase().includes('konfigurasi')) return '⚙️';
    if (title.toLowerCase().includes('notifikasi')) return '🔔';
    if (title.toLowerCase().includes('task')) return '✅';
    if (title.toLowerCase().includes('tidak ditemukan')) return '🔍';
    return '📄';
  };

  const getDescription = () => {
    if (description) return description;
    if (title.toLowerCase().includes('password')) return 'Halaman pemulihan password untuk mengatur ulang kredensial akun Anda.';
    if (title.toLowerCase().includes('pasien')) return 'Halaman detail pasien dengan informasi lengkap dan riwayat medis.';
    if (title.toLowerCase().includes('appointment')) return 'Kelola jadwal appointment pasien untuk pemeriksaan dan konsultasi.';
    if (title.toLowerCase().includes('admission')) return 'Proses penerimaan pasien rawat inap ke rumah sakit.';
    if (title.toLowerCase().includes('transfer')) return 'Proses pemindahan pasien antar ruangan atau unit.';
    if (title.toLowerCase().includes('discharge')) return 'Proses pelepasan pasien dari rawat inap.';
    if (title.toLowerCase().includes('rawat jalan')) return 'Layanan klinik rawat jalan dan konsultasi dokter.';
    if (title.toLowerCase().includes('rawat inap')) return 'Manajemen pasien rawat inap dan monitoring kondisi.';
    if (title.toLowerCase().includes('emr')) return 'Electronic Medical Record untuk dokumentasi klinis.';
    if (title.toLowerCase().includes('radiologi')) return 'Layanan pencitraan radiologi dan hasil pemeriksaan.';
    if (title.toLowerCase().includes('klaim')) return 'Manajemen klaim asuransi dan BPJS.';
    if (title.toLowerCase().includes('logistik')) return 'Pengelolaan stok obat dan alat kesehatan.';
    if (title.toLowerCase().includes('sdm')) return 'Manajemen sumber daya manusia dan penjadwalan shift.';
    if (title.toLowerCase().includes('bed')) return 'Monitoring okupansi tempat tidur rumah sakit.';
    if (title.toLowerCase().includes('audit')) return 'Log aktivitas sistem dan audit trail.';
    if (title.toLowerCase().includes('laporan')) return 'Laporan operasional dan statistik rumah sakit.';
    if (title.toLowerCase().includes('konfigurasi')) return 'Pengaturan sistem dan konfigurasi aplikasi.';
    if (title.toLowerCase().includes('notifikasi')) return 'Pusat notifikasi dan pesan sistem.';
    if (title.toLowerCase().includes('task')) return 'Manajemen tugas dan handover antar shift.';
    if (title.toLowerCase().includes('tidak ditemukan')) return 'Halaman yang Anda cari tidak dapat ditemukan.';
    return 'Halaman ini sedang dalam pengembangan.';
  };

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '60vh',
      }}
    >
      <Card style={{ maxWidth: isOutpatientPage || isInpatientPage ? '880px' : '480px', width: '100%' }}>
        <CardBody style={{ textAlign: 'center', padding: isOutpatientPage || isInpatientPage ? '40px 32px' : '48px 32px' }}>
          <div
            style={{
              width: '80px',
              height: '80px',
              borderRadius: '50%',
              background: 'linear-gradient(135deg, var(--airforce-blue) 0%, var(--airforce-light) 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 24px',
              fontSize: '36px',
              boxShadow: '0 8px 24px rgba(61, 90, 128, 0.2)',
            }}
          >
            {getPageIcon()}
          </div>
          <h1 style={{ marginBottom: '12px', fontSize: '24px' }}>{title}</h1>
          <p style={{ color: 'var(--fg-secondary)', marginBottom: isOutpatientPage || isInpatientPage ? '24px' : '32px', lineHeight: 1.6 }}>
            {getDescription()}
          </p>

          {isOutpatientPage && (
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
                gap: '12px',
                marginBottom: '24px',
                textAlign: 'left',
              }}
            >
              {[
                { label: 'Antrian Hari Ini', value: '42 Pasien', hint: '16 menunggu' },
                { label: 'Dokter Bertugas', value: '8 Dokter', hint: 'Poli umum & spesialis' },
                { label: 'Rata-rata Tunggu', value: '18 Menit', hint: 'Lebih cepat 4 menit' },
                { label: 'Kunjungan Selesai', value: '26 Kunjungan', hint: 'Sampai pukul 13:00' },
              ].map((item) => (
                <div
                  key={item.label}
                  style={{
                    border: '1px solid var(--line)',
                    borderRadius: 'var(--radius)',
                    padding: '12px',
                    background: 'var(--surface)',
                  }}
                >
                  <div style={{ fontSize: '12px', color: 'var(--fg-secondary)' }}>{item.label}</div>
                  <div style={{ fontWeight: 700, marginTop: '4px' }}>{item.value}</div>
                  <div style={{ fontSize: '12px', color: 'var(--neutral)', marginTop: '6px' }}>{item.hint}</div>
                </div>
              ))}
            </div>
          )}

          {isInpatientPage && (
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
                gap: '12px',
                marginBottom: '24px',
                textAlign: 'left',
              }}
            >
              {[
                { label: 'Pasien Dirawat', value: '124 Pasien', hint: 'BOR 78% hari ini' },
                { label: 'Bed Tersedia', value: '35 Bed', hint: 'ICU 4 • NICU 3' },
                { label: 'Kondisi Prioritas', value: '9 Pasien', hint: 'Perlu monitoring ketat' },
                { label: 'Rencana Pulang', value: '18 Pasien', hint: 'Target sebelum 17:00' },
              ].map((item) => (
                <div
                  key={item.label}
                  style={{
                    border: '1px solid var(--line)',
                    borderRadius: 'var(--radius)',
                    padding: '12px',
                    background: 'var(--surface)',
                  }}
                >
                  <div style={{ fontSize: '12px', color: 'var(--fg-secondary)' }}>{item.label}</div>
                  <div style={{ fontWeight: 700, marginTop: '4px' }}>{item.value}</div>
                  <div style={{ fontSize: '12px', color: 'var(--neutral)', marginTop: '6px' }}>{item.hint}</div>
                </div>
              ))}
            </div>
          )}

          {title.toLowerCase().includes('tidak ditemukan') ? (
            <Button onClick={() => navigate('/')} icon={
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                <polyline points="9 22 9 12 15 12 15 22" />
              </svg>
            }>
              Kembali ke Dashboard
            </Button>
          ) : (
            <div style={{ display: 'flex', gap: '12px', justifyContent: 'center' }}>
              <Button variant="secondary" onClick={() => navigate(-1)}>
                Kembali
              </Button>
              <Button onClick={() => navigate('/')}>
                Dashboard
              </Button>
            </div>
          )}

          {!title.toLowerCase().includes('tidak ditemukan') &&
           !title.toLowerCase().includes('password') &&
           !isOutpatientPage &&
           !isInpatientPage && (
            <div
              style={{
                marginTop: '32px',
                padding: '16px',
                background: 'var(--surface-secondary)',
                borderRadius: 'var(--radius)',
                fontSize: '13px',
                color: 'var(--neutral)',
              }}
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                style={{ display: 'inline-block', verticalAlign: 'middle', marginRight: '6px' }}
              >
                <circle cx="12" cy="12" r="10" />
                <line x1="12" y1="16" x2="12" y2="12" />
                <line x1="12" y1="8" x2="12.01" y2="8" />
              </svg>
              Halaman ini sedang dalam pengembangan aktif dan akan segera tersedia.
            </div>
          )}

          {isOutpatientPage && (
            <div
              style={{
                marginTop: '28px',
                padding: '16px',
                border: '1px solid color-mix(in srgb, var(--airforce-blue) 20%, transparent)',
                background: 'color-mix(in srgb, var(--airforce-light) 10%, white)',
                borderRadius: 'var(--radius)',
                textAlign: 'left',
              }}
            >
              <div style={{ fontWeight: 700, marginBottom: '6px' }}>Aksi Cepat Rawat Jalan</div>
              <div style={{ fontSize: '13px', color: 'var(--fg-secondary)', lineHeight: 1.6 }}>
                Modul ini sudah disiapkan untuk operasional harian: registrasi kunjungan, triase awal, pemeriksaan dokter,
                order penunjang, hingga penyelesaian administrasi pasien.
              </div>
            </div>
          )}

          {isInpatientPage && (
            <div
              style={{
                marginTop: '28px',
                padding: '16px',
                border: '1px solid color-mix(in srgb, var(--airforce-blue) 20%, transparent)',
                background: 'color-mix(in srgb, var(--airforce-light) 10%, white)',
                borderRadius: 'var(--radius)',
                textAlign: 'left',
              }}
            >
              <div style={{ fontWeight: 700, marginBottom: '6px' }}>Aksi Cepat Rawat Inap</div>
              <div style={{ fontSize: '13px', color: 'var(--fg-secondary)', lineHeight: 1.6 }}>
                Modul rawat inap kini menampilkan ringkasan okupansi, kondisi pasien prioritas, pemantauan bed,
                hingga proses transfer dan discharge agar koordinasi antar-ruang lebih cepat dan terukur.
              </div>
            </div>
          )}
        </CardBody>
      </Card>
    </div>
  );
}
