import React, { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardBody } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface SimplePageProps {
  title: string;
  description?: string;
}

type ModulePlaybook = {
  status: 'Siap Operasional' | 'Perlu Integrasi';
  kpis: { label: string; value: string; hint: string }[];
  workflows: string[];
  quickActions: string[];
  relatedRoutes: { label: string; href: string }[];
};

const defaultPlaybook: ModulePlaybook = {
  status: 'Perlu Integrasi',
  kpis: [
    { label: 'Form Tersedia', value: 'UI Siap', hint: 'Input utama siap dipakai' },
    { label: 'Integrasi API', value: 'Belum', hint: 'Perlu koneksi backend final' },
    { label: 'Uji Skenario', value: 'Parsial', hint: 'Butuh regression lintas modul' },
    { label: 'Audit Aktivitas', value: 'Manual', hint: 'Belum otomatis tercatat penuh' },
  ],
  workflows: [
    'Validasi data utama pasien/transaksi sebelum submit',
    'Sinkronisasi status ke modul terkait (billing/penunjang/rujukan)',
    'Konfirmasi keberhasilan proses dan catat jejak operasional',
  ],
  quickActions: ['Buat entri baru', 'Review antrean hari ini', 'Cek error integrasi', 'Unduh ringkasan operasional'],
  relatedRoutes: [
    { label: 'Katalog Modul', href: '/simrs/modules' },
    { label: 'Dashboard Komando', href: '/dashboard/command' },
    { label: 'Data Pasien', href: '/patients' },
  ],
};

const playbooks: { keyword: string; data: ModulePlaybook }[] = [
  {
    keyword: 'klaim',
    data: {
      status: 'Perlu Integrasi',
      kpis: [
        { label: 'Klaim Diproses', value: '46 berkas', hint: '11 menunggu verifikasi' },
        { label: 'Klaim Ditolak', value: '3 berkas', hint: 'Perlu revisi kode INA-CBG' },
        { label: 'SLA Verifikasi', value: '1.7 hari', hint: 'Target < 2 hari' },
        { label: 'Bridging BPJS', value: 'Stabil', hint: 'Tidak ada downtime hari ini' },
      ],
      workflows: [
        'Validasi kelengkapan SEP, resume medis, dan lampiran penunjang',
        'Kirim berkas klaim ke payer dan monitor status respon',
        'Tindak lanjuti klaim pending/ditolak dengan catatan koreksi',
      ],
      quickActions: ['Input klaim baru', 'Verifikasi berkas pending', 'Sinkronisasi VClaim', 'Cetak rekap klaim'],
      relatedRoutes: [
        { label: 'Kasir/Billing', href: '/cashier' },
        { label: 'Registrasi', href: '/registrations/new' },
        { label: 'Dashboard Keuangan', href: '/finance-dashboard' },
      ],
    },
  },
  {
    keyword: 'audit',
    data: {
      status: 'Siap Operasional',
      kpis: [
        { label: 'Event Tercatat', value: '1.284', hint: '24 jam terakhir' },
        { label: 'Aksi Risiko Tinggi', value: '17', hint: 'Perlu review komite' },
        { label: 'Anomali Login', value: '2 kejadian', hint: 'Sudah ditindaklanjuti' },
        { label: 'Retensi Log', value: '365 hari', hint: 'Sesuai kebijakan' },
      ],
      workflows: [
        'Pantau event prioritas tinggi dan identifikasi pola penyimpangan',
        'Lakukan review dan persetujuan tindak lanjut audit',
        'Distribusikan laporan audit periodik ke manajemen',
      ],
      quickActions: ['Filter event risiko tinggi', 'Ekspor log audit', 'Buat tiket investigasi', 'Bagikan laporan harian'],
      relatedRoutes: [
        { label: 'Laporan', href: '/reports' },
        { label: 'Notifikasi', href: '/notifications' },
        { label: 'Konfigurasi', href: '/settings' },
      ],
    },
  },
  {
    keyword: 'laporan',
    data: {
      status: 'Siap Operasional',
      kpis: [
        { label: 'Laporan Harian', value: '12 laporan', hint: 'Seluruh unit aktif' },
        { label: 'Waktu Generate', value: '24 detik', hint: 'Rata-rata hari ini' },
        { label: 'Kelengkapan Data', value: '96%', hint: '4% menunggu sinkron' },
        { label: 'Permintaan Ad-hoc', value: '7 permintaan', hint: 'Dari komando pusat' },
      ],
      workflows: [
        'Pilih periode laporan dan unit/faskes yang dianalisis',
        'Validasi konsistensi data dari modul operasional',
        'Distribusikan output PDF/Excel ke pemangku kepentingan',
      ],
      quickActions: ['Generate laporan BOR', 'Bandingkan antar-faskes', 'Ekspor Excel', 'Jadwalkan laporan otomatis'],
      relatedRoutes: [
        { label: 'Dashboard Komando', href: '/dashboard/command' },
        { label: 'Laboratorium', href: '/lab' },
        { label: 'Farmasi', href: '/pharmacy' },
      ],
    },
  },
  {
    keyword: 'logistik',
    data: {
      status: 'Perlu Integrasi',
      kpis: [
        { label: 'Stok Aman', value: '82%', hint: '18% item perlu restock' },
        { label: 'Permintaan Pending', value: '14 tiket', hint: '4 tiket > 24 jam' },
        { label: 'Lead Time', value: '2.3 hari', hint: 'Target < 2 hari' },
        { label: 'Akurasi Stok', value: '94%', hint: 'Selisih audit mingguan' },
      ],
      workflows: [
        'Validasi kebutuhan unit dan prioritas pengiriman',
        'Lakukan picking, packing, dan update status distribusi',
        'Tutup transaksi dan lakukan rekonsiliasi stok harian',
      ],
      quickActions: ['Buat permintaan logistik', 'Proses pengiriman', 'Cetak label gudang', 'Rekonsiliasi stok'],
      relatedRoutes: [
        { label: 'Gudang Farmasi', href: '/pharmacy-warehouse' },
        { label: 'Gudang Umum', href: '/general-warehouse' },
        { label: 'Pengadaan', href: '/procurement-purchasing' },
      ],
    },
  },
];

export function SimplePage({ title, description }: SimplePageProps) {
  const navigate = useNavigate();
  const pageKey = `simrs-note:${title.toLowerCase()}`;
  const checklistKey = `simrs-checklist:${title.toLowerCase()}`;
  const normalizedTitle = title.toLowerCase();
  const isNotFound = normalizedTitle.includes('tidak ditemukan');
  const isPasswordPage = normalizedTitle.includes('password');

  const [note, setNote] = useState(() => {
    if (typeof window === 'undefined') return '';
    return localStorage.getItem(pageKey) ?? '';
  });
  const [checklist, setChecklist] = useState<Record<number, boolean>>(() => {
    if (typeof window === 'undefined') return {};
    const stored = localStorage.getItem(checklistKey);
    if (!stored) return {};

    try {
      return JSON.parse(stored) as Record<number, boolean>;
    } catch {
      return {};
    }
  });

  const playbook = useMemo(
    () => playbooks.find((item) => normalizedTitle.includes(item.keyword))?.data ?? defaultPlaybook,
    [normalizedTitle]
  );

  const saveNote = () => {
    localStorage.setItem(pageKey, note);
  };

  const toggleChecklist = (index: number, checked: boolean) => {
    setChecklist((prev) => {
      const next = {
        ...prev,
        [index]: checked,
      };
      localStorage.setItem(checklistKey, JSON.stringify(next));
      return next;
    });
  };

  const clearModuleProgress = () => {
    setChecklist({});
    setNote('');
    localStorage.removeItem(checklistKey);
    localStorage.removeItem(pageKey);
  };

  const completedChecklist = playbook.workflows.filter((_, index) => Boolean(checklist[index])).length;
  const checklistProgress = Math.round((completedChecklist / playbook.workflows.length) * 100);

  const getPageIcon = () => {
    if (normalizedTitle.includes('password')) return '🔐';
    if (normalizedTitle.includes('pasien')) return '👤';
    if (normalizedTitle.includes('appointment')) return '📅';
    if (normalizedTitle.includes('admission')) return '🏥';
    if (normalizedTitle.includes('transfer')) return '↔️';
    if (normalizedTitle.includes('discharge')) return '🏠';
    if (normalizedTitle.includes('rawat jalan')) return '🩺';
    if (normalizedTitle.includes('rawat inap')) return '🛏️';
    if (normalizedTitle.includes('emr')) return '📋';
    if (normalizedTitle.includes('radiologi')) return '📷';
    if (normalizedTitle.includes('klaim')) return '📄';
    if (normalizedTitle.includes('logistik')) return '📦';
    if (normalizedTitle.includes('sdm')) return '👥';
    if (normalizedTitle.includes('bed')) return '🛏️';
    if (normalizedTitle.includes('audit')) return '🔍';
    if (normalizedTitle.includes('laporan')) return '📊';
    if (normalizedTitle.includes('konfigurasi')) return '⚙️';
    if (normalizedTitle.includes('notifikasi')) return '🔔';
    if (normalizedTitle.includes('task')) return '✅';
    if (normalizedTitle.includes('tidak ditemukan')) return '🔍';
    return '📄';
  };

  const getDescription = () => {
    if (description) return description;
    if (normalizedTitle.includes('password')) return 'Halaman pemulihan password untuk mengatur ulang kredensial akun Anda.';
    if (normalizedTitle.includes('pasien')) return 'Halaman detail pasien dengan informasi lengkap dan riwayat medis.';
    if (normalizedTitle.includes('appointment')) return 'Kelola jadwal appointment pasien untuk pemeriksaan dan konsultasi.';
    if (normalizedTitle.includes('admission')) return 'Proses penerimaan pasien rawat inap ke rumah sakit.';
    if (normalizedTitle.includes('transfer')) return 'Proses pemindahan pasien antar ruangan atau unit.';
    if (normalizedTitle.includes('discharge')) return 'Proses pelepasan pasien dari rawat inap.';
    if (normalizedTitle.includes('rawat jalan')) return 'Layanan klinik rawat jalan dan konsultasi dokter.';
    if (normalizedTitle.includes('rawat inap')) return 'Manajemen pasien rawat inap dan monitoring kondisi.';
    if (normalizedTitle.includes('emr')) return 'Electronic Medical Record untuk dokumentasi klinis.';
    if (normalizedTitle.includes('radiologi')) return 'Layanan pencitraan radiologi dan hasil pemeriksaan.';
    if (normalizedTitle.includes('klaim')) return 'Manajemen klaim asuransi dan BPJS.';
    if (normalizedTitle.includes('logistik')) return 'Pengelolaan stok obat dan alat kesehatan.';
    if (normalizedTitle.includes('sdm')) return 'Manajemen sumber daya manusia dan penjadwalan shift.';
    if (normalizedTitle.includes('bed')) return 'Monitoring okupansi tempat tidur rumah sakit.';
    if (normalizedTitle.includes('audit')) return 'Log aktivitas sistem dan audit trail.';
    if (normalizedTitle.includes('laporan')) return 'Laporan operasional dan statistik rumah sakit.';
    if (normalizedTitle.includes('konfigurasi')) return 'Pengaturan sistem dan konfigurasi aplikasi.';
    if (normalizedTitle.includes('notifikasi')) return 'Pusat notifikasi dan pesan sistem.';
    if (normalizedTitle.includes('task')) return 'Manajemen tugas dan handover antar shift.';
    if (normalizedTitle.includes('tidak ditemukan')) return 'Halaman yang Anda cari tidak dapat ditemukan.';
    return 'Halaman ini sedang dalam pengembangan.';
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', minHeight: '60vh' }}>
      <Card style={{ maxWidth: '980px', width: '100%' }}>
        <CardBody style={{ padding: '36px 28px' }}>
          <div style={{ textAlign: 'center' }}>
            <div
              style={{
                width: '80px',
                height: '80px',
                borderRadius: '50%',
                background: 'linear-gradient(135deg, var(--airforce-blue) 0%, var(--airforce-light) 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 16px',
                fontSize: '36px',
              }}
            >
              {getPageIcon()}
            </div>
            <h1 style={{ marginBottom: '10px', fontSize: '24px' }}>{title}</h1>
            <p style={{ color: 'var(--fg-secondary)', marginBottom: '18px', lineHeight: 1.6 }}>{getDescription()}</p>
            {!isNotFound && !isPasswordPage && (
              <Badge variant={playbook.status === 'Siap Operasional' ? 'success' : 'warning'}>{playbook.status}</Badge>
            )}
          </div>

          {!isNotFound && !isPasswordPage && (
            <>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '12px', marginTop: '22px' }}>
                {playbook.kpis.map((item) => (
                  <div key={item.label} style={{ border: '1px solid var(--line)', borderRadius: 'var(--radius)', padding: '12px' }}>
                    <div style={{ fontSize: '12px', color: 'var(--fg-secondary)' }}>{item.label}</div>
                    <div style={{ fontWeight: 700, marginTop: '4px' }}>{item.value}</div>
                    <div style={{ fontSize: '12px', color: 'var(--neutral)', marginTop: '6px' }}>{item.hint}</div>
                  </div>
                ))}
              </div>

              <div style={{ marginTop: '14px', border: '1px solid var(--line)', borderRadius: 'var(--radius)', padding: '12px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px', fontSize: '13px' }}>
                  <strong>Progress Workflow</strong>
                  <span style={{ color: 'var(--fg-secondary)' }}>{completedChecklist}/{playbook.workflows.length} langkah</span>
                </div>
                <div style={{ height: '8px', borderRadius: '999px', background: 'var(--surface)', overflow: 'hidden' }}>
                  <div
                    style={{
                      width: `${checklistProgress}%`,
                      height: '100%',
                      background: checklistProgress === 100 ? 'var(--success)' : 'var(--airforce-blue)',
                      transition: 'width 0.25s ease',
                    }}
                  />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginTop: '20px' }}>
                <div style={{ border: '1px solid var(--line)', borderRadius: 'var(--radius)', padding: '14px' }}>
                  <h3 style={{ marginTop: 0 }}>Checklist Workflow</h3>
                  {playbook.workflows.map((item, index) => (
                    <label key={item} style={{ display: 'flex', gap: '8px', alignItems: 'flex-start', marginBottom: '8px', fontSize: '14px' }}>
                      <input
                        type="checkbox"
                        checked={Boolean(checklist[index])}
                        onChange={(event) => toggleChecklist(index, event.target.checked)}
                      />
                      <span>{item}</span>
                    </label>
                  ))}
                </div>
                <div style={{ border: '1px solid var(--line)', borderRadius: 'var(--radius)', padding: '14px' }}>
                  <h3 style={{ marginTop: 0 }}>Aksi Cepat</h3>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '12px' }}>
                    {playbook.quickActions.map((action) => (
                      <Badge key={action} variant="info">{action}</Badge>
                    ))}
                  </div>
                  <div style={{ fontSize: '13px', color: 'var(--fg-secondary)' }}>Catatan operasional modul (tersimpan lokal per halaman).</div>
                  <textarea
                    value={note}
                    onChange={(event) => setNote(event.target.value)}
                    rows={4}
                    style={{ width: '100%', marginTop: '8px', borderRadius: '10px', border: '1px solid var(--line)', padding: '10px', fontFamily: 'inherit' }}
                    placeholder="Contoh: menunggu integrasi API verifikasi klaim BPJS..."
                  />
                  <Button size="sm" onClick={saveNote} style={{ marginTop: '10px' }}>Simpan Catatan</Button>
                </div>
              </div>

              <div style={{ marginTop: '16px', border: '1px solid var(--line)', borderRadius: 'var(--radius)', padding: '14px' }}>
                <h3 style={{ marginTop: 0 }}>Rute Terkait</h3>
                <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                  {playbook.relatedRoutes.map((route) => (
                    <Button key={route.href} size="sm" variant="secondary" onClick={() => navigate(route.href)}>
                      {route.label}
                    </Button>
                  ))}
                  <Button size="sm" variant="ghost" onClick={clearModuleProgress}>Reset Progres Modul</Button>
                </div>
              </div>
            </>
          )}

          <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', marginTop: '24px' }}>
            <Button variant="secondary" onClick={() => navigate(-1)}>
              Kembali
            </Button>
            <Button onClick={() => navigate('/')}>Dashboard</Button>
          </div>
        </CardBody>
      </Card>
    </div>
  );
}
