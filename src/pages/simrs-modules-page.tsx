import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardBody } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

const moduleCategories = [
  {
    name: 'Administrasi',
    modules: [
      { name: 'Master Pasien (MPI)', desc: 'Manajemen identitas pasien terpusat', status: 'Aktif', href: '/patients', features: 6 },
      { name: 'Registrasi & Admit', desc: 'Pendaftaran dan admission pasien', status: 'Aktif', href: '/registrations/new', features: 6 },
      { name: 'Jadwal Dokter', desc: 'Penjadwalan praktik dokter', status: 'Aktif', href: '/registrations/appointments', features: 4 },
      { name: 'Manajemen Antrian', desc: 'Pengaturan antrian layanan klinik secara real-time', status: 'Aktif', href: '/queue-management', features: 5 },
      { name: 'Rujukan', desc: 'Kelola rujukan masuk dan keluar fasilitas kesehatan', status: 'Aktif', href: '/referrals', features: 5 },
      { name: 'Appointment Online', desc: 'Pemesanan jadwal kunjungan pasien secara daring', status: 'Aktif', href: '/appointments-online', features: 5 },
    ],
  },
  {
    name: 'Klinis',
    modules: [
      { name: 'EMR & CPOE', desc: 'Electronic Medical Record dan Computerized Physician Order Entry', status: 'Aktif', href: '/clinical/emr', features: 12 },
      { name: 'Rawat Jalan', desc: 'Layanan poliklinik rawat jalan', status: 'Aktif', href: '/clinical/outpatient', features: 6 },
      { name: 'IGD & Triase', desc: 'Unit gawat darurat dan penilaian triase', status: 'Aktif', href: '/clinical/emergency', features: 6 },
      { name: 'Rawat Inap', desc: 'Manajemen pasien rawat inap', status: 'Aktif', href: '/clinical/inpatient', features: 6 },
      { name: 'ICU & HDU', desc: 'Monitoring pasien intensif dengan protokol kritikal', status: 'Aktif', href: '/icu', features: 6 },
      { name: 'Kamar Operasi', desc: 'Perencanaan operasi dan dokumentasi tindakan bedah', status: 'Aktif', href: '/operating-room', features: 6 },
      { name: 'Telemedicine', desc: 'Konsultasi medis jarak jauh dan tindak lanjut pasien', status: 'Aktif', href: '/telemedicine', features: 5 },
      { name: 'Gizi Klinik', desc: 'Asesmen gizi dan rencana diet pasien terintegrasi', status: 'Aktif', href: '/nutrition', features: 4 },
    ],
  },
  {
    name: 'Penunjang',
    modules: [
      { name: 'Laboratorium', desc: 'Pemeriksaan lab dan hasil', status: 'Aktif', href: '/lab', features: 6 },
      { name: 'Radiologi', desc: 'Pencitraan dan hasil radiologi', status: 'Aktif', href: '/radiology', features: 6 },
      { name: 'Farmasi', desc: 'Manajemen obat dan resep', status: 'Aktif', href: '/pharmacy', features: 6 },
      { name: 'Rehabilitasi Medik', desc: 'Layanan fisioterapi dan rehabilitasi pasien', status: 'Aktif', href: '/rehabilitation', features: 5 },
      { name: 'Bank Darah', desc: 'Manajemen stok darah, donor, dan distribusi komponen darah', status: 'Aktif', href: '/blood-bank', features: 5 },
      { name: 'Hemodialisa', desc: 'Pengelolaan jadwal dan tindakan layanan hemodialisa', status: 'Aktif', href: '/hemodialysis', features: 5 },
    ],
  },
  {
    name: 'Keuangan',
    modules: [
      { name: 'Billing & Kasir', desc: 'Penagihan dan pembayaran', status: 'Aktif', href: '/billing', features: 6 },
      { name: 'Klaim & Verifikasi', desc: 'Klaim asuransi dan verifikasi', status: 'Aktif', href: '/claims', features: 6 },
      { name: 'Manajemen Tarif', desc: 'Pengaturan paket layanan dan tarif tindakan', status: 'Aktif', href: '/tariff-management', features: 5 },
      { name: 'Akuntansi Biaya', desc: 'Pencatatan cost center dan analisis biaya layanan', status: 'Aktif', href: '/cost-accounting', features: 5 },
      { name: 'Dashboard Keuangan', desc: 'Pemantauan KPI keuangan dan cashflow rumah sakit', status: 'Aktif', href: '/finance-dashboard', features: 5 },
    ],
  },
  {
    name: 'Operasional',
    modules: [
      { name: 'Logistik & Gudang', desc: 'Manajemen stok dan inventori', status: 'Aktif', href: '/logistics', features: 6 },
      { name: 'SDM & Shift', desc: 'Manajemen SDM dan jadwal shift', status: 'Aktif', href: '/hr', features: 6 },
      { name: 'Bed Management', desc: 'Monitoring tempat tidur', status: 'Aktif', href: '/beds', features: 4 },
      { name: 'Asset Management', desc: 'Inventarisasi dan lifecycle aset medis/nonmedis', status: 'Aktif', href: '/asset-management', features: 5 },
      { name: 'Maintenance', desc: 'Penjadwalan preventive dan corrective maintenance alat', status: 'Aktif', href: '/maintenance', features: 5 },
      { name: 'Ambulance Dispatch', desc: 'Koordinasi armada ambulans dan respon lapangan', status: 'Aktif', href: '/ambulance', features: 5 },
    ],
  },
  {
    name: 'Governance',
    modules: [
      { name: 'Audit Trail', desc: 'Log aktivitas sistem', status: 'Aktif', href: '/audit', features: 6 },
      { name: 'Laporan & Ekspor', desc: 'Laporan dan ekspor data', status: 'Aktif', href: '/reports', features: 6 },
      { name: 'Konfigurasi', desc: 'Pengaturan sistem', status: 'Aktif', href: '/settings', features: 4 },
      { name: 'Clinical Governance', desc: 'Pemantauan kepatuhan klinis dan patient safety', status: 'Aktif', href: '/clinical-governance', features: 5 },
      { name: 'Indikator Mutu', desc: 'Pelacakan indikator mutu layanan dan mutu klinis', status: 'Aktif', href: '/quality-indicators', features: 5 },
      { name: 'Kontrol Dokumen', desc: 'Manajemen dokumen kebijakan, SOP, dan versi', status: 'Aktif', href: '/document-control', features: 4 },
    ],
  },
  {
    name: 'Kolaborasi',
    modules: [
      { name: 'Notifikasi', desc: 'Pusat notifikasi sistem', status: 'Aktif', href: '/notifications', features: 4 },
      { name: 'Task & Handover', desc: 'Manajemen tugas dan operan shift', status: 'Aktif', href: '/tasks', features: 6 },
      { name: 'Internal Chat', desc: 'Komunikasi internal lintas unit secara aman', status: 'Aktif', href: '/internal-chat', features: 5 },
      { name: 'Laporan Insiden', desc: 'Pelaporan insiden dan tindak lanjut keselamatan', status: 'Aktif', href: '/incident-report', features: 5 },
    ],
  },
];

export function SimrsModulesPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const totalModules = moduleCategories.reduce((acc, cat) => acc + cat.modules.length, 0);
  const totalFeatures = moduleCategories.reduce(
    (acc, cat) => acc + cat.modules.reduce((macc, m) => macc + m.features, 0),
    0
  );

  const filteredCategories = moduleCategories
    .filter((cat) => !selectedCategory || cat.name === selectedCategory)
    .map((cat) => ({
      ...cat,
      modules: cat.modules.filter(
        (m) =>
          m.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          m.desc.toLowerCase().includes(searchQuery.toLowerCase())
      ),
    }))
    .filter((cat) => cat.modules.length > 0);

  return (
    <section style={{ maxWidth: '1200px', margin: '0 auto' }}>
      {/* Page Header */}
      <div className="page-header-card" style={{ marginBottom: '24px' }}>
        <h1 style={{ marginBottom: '8px' }}>Modul SIMRS</h1>
        <p style={{ margin: 0, color: 'var(--fg-secondary)' }}>
          {totalModules} modul utama dengan {totalFeatures}+ fitur untuk mendukung layanan Puskesau secara end-to-end.
        </p>
      </div>

      {/* Statistics */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
          gap: '16px',
          marginBottom: '24px',
        }}
      >
        <Card>
          <CardBody style={{ textAlign: 'center', padding: '16px' }}>
            <div style={{ fontSize: '28px', fontWeight: 700, color: 'var(--airforce-blue)' }}>{totalModules}</div>
            <div style={{ fontSize: '12px', color: 'var(--neutral)' }}>Total Modul</div>
          </CardBody>
        </Card>
        <Card>
          <CardBody style={{ textAlign: 'center', padding: '16px' }}>
            <div style={{ fontSize: '28px', fontWeight: 700, color: 'var(--success)' }}>{totalModules}</div>
            <div style={{ fontSize: '12px', color: 'var(--neutral)' }}>Modul Aktif</div>
          </CardBody>
        </Card>
        <Card>
          <CardBody style={{ textAlign: 'center', padding: '16px' }}>
            <div style={{ fontSize: '28px', fontWeight: 700 }}>{totalFeatures}+</div>
            <div style={{ fontSize: '12px', color: 'var(--neutral)' }}>Total Fitur</div>
          </CardBody>
        </Card>
        <Card>
          <CardBody style={{ textAlign: 'center', padding: '16px' }}>
            <div style={{ fontSize: '28px', fontWeight: 700, color: 'var(--info)' }}>{moduleCategories.length}</div>
            <div style={{ fontSize: '12px', color: 'var(--neutral)' }}>Kategori</div>
          </CardBody>
        </Card>
      </div>

      {/* Search and Filter */}
      <Card style={{ marginBottom: '24px' }}>
        <CardBody>
          <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
            <div style={{ flex: '1', minWidth: '250px' }}>
              <Input
                placeholder="Cari modul..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                icon={
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="11" cy="11" r="8" />
                    <path d="M21 21l-4.35-4.35" />
                  </svg>
                }
              />
            </div>
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
              <Button
                variant={selectedCategory === null ? 'primary' : 'secondary'}
                size="sm"
                onClick={() => setSelectedCategory(null)}
              >
                Semua
              </Button>
              {moduleCategories.map((cat) => (
                <Button
                  key={cat.name}
                  variant={selectedCategory === cat.name ? 'primary' : 'secondary'}
                  size="sm"
                  onClick={() => setSelectedCategory(cat.name)}
                >
                  {cat.name}
                </Button>
              ))}
            </div>
          </div>
        </CardBody>
      </Card>

      {/* Module Categories */}
      {filteredCategories.map((category) => (
        <div key={category.name} style={{ marginBottom: '32px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
            <h2 style={{ fontSize: '18px', margin: 0 }}>{category.name}</h2>
            <Badge variant="neutral">{category.modules.length} modul</Badge>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
              gap: '16px',
            }}
          >
            {category.modules.map((module) => (
              <Card key={module.name} hover>
                <CardBody>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
                    <h3 style={{ margin: 0, fontSize: '16px' }}>{module.name}</h3>
                    <Badge variant={module.status === 'Aktif' ? 'success' : 'warning'}>{module.status}</Badge>
                  </div>
                  <p style={{ color: 'var(--fg-secondary)', fontSize: '13px', marginBottom: '12px', minHeight: '40px' }}>
                    {module.desc}
                  </p>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontSize: '12px', color: 'var(--neutral)' }}>{module.features} fitur</span>
                    <Link
                      to={module.href}
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '6px',
                        color: 'var(--airforce-blue)',
                        fontWeight: 600,
                        fontSize: '14px',
                      }}
                    >
                      Buka
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M5 12h14 M12 5l7 7-7 7" />
                      </svg>
                    </Link>
                  </div>
                </CardBody>
              </Card>
            ))}
          </div>
        </div>
      ))}

      {/* Empty State */}
      {filteredCategories.length === 0 && (
        <div
          style={{
            textAlign: 'center',
            padding: '60px 20px',
            background: 'var(--surface)',
            borderRadius: 'var(--radius-xl)',
            border: '1px solid var(--line)',
          }}
        >
          <svg
            width="48"
            height="48"
            viewBox="0 0 24 24"
            fill="none"
            stroke="var(--neutral)"
            strokeWidth="2"
            style={{ marginBottom: '16px' }}
          >
            <circle cx="11" cy="11" r="8" />
            <path d="M21 21l-4.35-4.35" />
          </svg>
          <h3 style={{ marginBottom: '8px' }}>Tidak ada modul ditemukan</h3>
          <p style={{ color: 'var(--neutral)' }}>Coba ubah kata kunci pencarian Anda.</p>
        </div>
      )}
    </section>
  );
}
