import React, { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardBody } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

type SimrsModule = {
  name: string;
  desc: string;
  status: 'Aktif' | 'Roadmap';
  href: string;
  features: number;
  highlights: string[];
};

const moduleCategories: { name: string; modules: SimrsModule[] }[] = [
  {
    name: 'Dashboard & Komando',
    modules: [
      {
        name: 'Dasbor Pusat (Komando Terintegrasi)',
        desc: 'Agregasi data lintas faskes untuk kontrol operasional nasional.',
        status: 'Aktif',
        href: '/dashboard/command',
        features: 4,
        highlights: ['Statistik agregat nasional', 'Status kesiapan RS real-time', 'Analitik SDM & logistik 6 bulan', 'Panel notifikasi prioritas tinggi'],
      },
      {
        name: 'Dasbor Faskes (Operasional RS/Klinik)',
        desc: 'Ringkasan operasional lokal per faskes untuk eksekusi harian cepat.',
        status: 'Aktif',
        href: '/dashboard/command',
        features: 3,
        highlights: ['Statistik lokal faskes', 'Akses cepat modul utama', 'Tugas & notifikasi kritis lokal'],
      },
    ],
  },
  {
    name: 'Administrasi Pasien',
    modules: [
      {
        name: 'Database Pasien Terpusat (MPI)',
        desc: 'Pencarian pasien lintas faskes dengan data demografis dasar terstandar.',
        status: 'Aktif',
        href: '/patients',
        features: 2,
        highlights: ['Cari pasien berdasarkan nama/NIK lintas faskes', 'Tampilkan data demografis dasar pasien'],
      },
      {
        name: 'Pendaftaran & Antrean Real-time',
        desc: 'Pendaftaran baru/lama dan manajemen antrean poli secara langsung.',
        status: 'Aktif',
        href: '/registrations/new',
        features: 5,
        highlights: ['Pendaftaran pasien baru/lama via NIK', 'Auto-fill formulir dari database pusat', 'Scan QR KTP untuk percepat input', 'Pasien otomatis masuk antrean poli', 'Status antrean tampil real-time di dashboard'],
      },
    ],
  },
  {
    name: 'Klinis Inti',
    modules: [
      {
        name: 'EHR + Asisten AI (SOAP)',
        desc: 'Rekam medis elektronik dengan pengisian SOAP berbantuan AI klinis.',
        status: 'Aktif',
        href: '/clinical/emr',
        features: 4,
        highlights: ['Formulir SOAP standar', 'Saran AI diagnosis + kode ICD-10 + terapi', 'Isi otomatis per bagian S/O/A/P', 'Bantu penyusunan resep berbasis keluhan utama'],
      },
      {
        name: 'Instalasi Gawat Darurat (IGD)',
        desc: 'Triase digital, perpindahan status pasien, dan rekomendasi AI rawat inap.',
        status: 'Aktif',
        href: '/clinical/emergency',
        features: 4,
        highlights: ['Papan triase kanban digital', 'Drag-and-drop pasien antar kategori', 'Saran tingkat triase berbasis AI', 'Rekomendasi 3 tempat tidur terbaik untuk rawat inap'],
      },
      {
        name: 'Manajemen Rawat Inap',
        desc: 'Peta visual bed dan mutasi pasien inap secara real-time.',
        status: 'Aktif',
        href: '/beds',
        features: 3,
        highlights: ['Peta visual tempat tidur per ruang', 'Daftar/transfer/pulang pasien real-time', 'Status bed: tersedia, terisi, dibersihkan, perbaikan'],
      },
      {
        name: 'Jadwal Operasi',
        desc: 'Perencanaan operasi lintas faskes dengan filter tanggal/rumah sakit.',
        status: 'Aktif',
        href: '/operating-room',
        features: 2,
        highlights: ['Lihat jadwal operasi seluruh faskes', 'Tambah jadwal operasi baru'],
      },
    ],
  },
  {
    name: 'Penunjang Medis',
    modules: [
      {
        name: 'CSSD (Sterilisasi Instrumen)',
        desc: 'Pelacakan siklus sterilisasi instrumen dari cuci sampai siap pakai.',
        status: 'Aktif',
        href: '/maintenance',
        features: 2,
        highlights: ['Lacak tiap set instrumen per tahapan', 'Perbarui status set instrumen real-time'],
      },
      {
        name: 'Bank Darah',
        desc: 'Monitoring stok darah per golongan dan transaksi keluar/masuk.',
        status: 'Aktif',
        href: '/blood-bank',
        features: 2,
        highlights: ['Dashboard stok per golongan darah', 'Donasi & permintaan otomatis update stok'],
      },
      {
        name: 'Laboratorium & Radiologi + AI',
        desc: 'Order management, input hasil, dan analisis awal radiologi berbasis AI.',
        status: 'Aktif',
        href: '/lab',
        features: 3,
        highlights: ['Status order: baru, hasil siap, divalidasi', 'Form dinamis input hasil lab', 'AI analisis awal gambar radiologi (summary + temuan)'],
      },
      {
        name: 'Farmasi & Apotek + AI',
        desc: 'Manajemen inventaris, resep elektronik, interaksi obat, dan kasir farmasi.',
        status: 'Aktif',
        href: '/pharmacy',
        features: 5,
        highlights: ['Inventaris obat terpusat + expiry', 'Estimasi stok habis berbasis histori pemakaian', 'Workflow resep elektronik end-to-end', 'Deteksi interaksi obat berbahaya dengan AI', 'Kasir farmasi untuk resep siap bayar'],
      },
      {
        name: 'Pemeriksaan Kesehatan (Rikkes)',
        desc: 'Alur pemeriksaan personel menyeluruh hingga spesialis termasuk odontogram.',
        status: 'Roadmap',
        href: '/clinical/outpatient',
        features: 3,
        highlights: ['Alur pemeriksaan dari data dasar ke spesialis', 'Odontogram interaktif', 'Sidebar progres pengisian formulir'],
      },
    ],
  },
  {
    name: 'Operasional & Enterprise',
    modules: [
      {
        name: 'Manajemen SDM & Penjadwalan',
        desc: 'Database pegawai dan penjadwalan shift berbantuan AI dengan editor drag-drop.',
        status: 'Aktif',
        href: '/hr',
        features: 3,
        highlights: ['Database pegawai lintas profesi', 'Draft jadwal mingguan otomatis dari bahasa natural', 'Editor shift drag-and-drop'],
      },
      {
        name: 'Manajemen Aset & Kalibrasi',
        desc: 'Pelacakan aset medis/nonmedis beserta jadwal kalibrasi/pemeliharaan.',
        status: 'Aktif',
        href: '/asset-management',
        features: 1,
        highlights: ['Kelola lokasi, status operasional, dan jadwal maintenance'],
      },
      {
        name: 'Logistik Medis & Umum',
        desc: 'Monitoring pengadaan supplier dan distribusi antar faskes (medis/nonmedis).',
        status: 'Aktif',
        href: '/logistics',
        features: 2,
        highlights: ['Dashboard terpusat pesanan pengadaan & distribusi', 'Pemisahan logistik medis vs gudang umum'],
      },
      {
        name: 'Laporan Insiden',
        desc: 'Pelaporan insiden medis/teknis dengan pelacakan status tindak lanjut.',
        status: 'Aktif',
        href: '/incident-report',
        features: 2,
        highlights: ['Form laporan insiden', 'Dashboard status: terbuka, ditangani, selesai'],
      },
      {
        name: 'Laporan & Analitik AI',
        desc: 'AI Health Data Analyst untuk tanya-jawab analitik kesehatan dalam bahasa natural.',
        status: 'Aktif',
        href: '/reports',
        features: 1,
        highlights: ['Analisis pertanyaan natural, contoh: perbandingan BOR antar RSAU'],
      },
      {
        name: 'Bridging & Integrasi',
        desc: 'Monitoring konektivitas sistem eksternal seperti BPJS VClaim dan SATUSEHAT.',
        status: 'Aktif',
        href: '/settings',
        features: 1,
        highlights: ['Dashboard kesehatan koneksi integrasi eksternal'],
      },
      {
        name: 'Broadcast Pesan Pusat',
        desc: 'Pengumuman ke seluruh faskes dengan pelacakan keterbacaan.',
        status: 'Aktif',
        href: '/notifications',
        features: 1,
        highlights: ['Kirim broadcast dan pantau read status tiap faskes'],
      },
      {
        name: 'Pengaturan & Kustomisasi',
        desc: 'Whitelabel branding serta manajemen akun/peran pengguna.',
        status: 'Aktif',
        href: '/settings',
        features: 2,
        highlights: ['Ubah logo/skema warna secara real-time', 'Manajemen pengguna dan role admin'],
      },
    ],
  },
];

export function SimrsModulesPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedStatus, setSelectedStatus] = useState<'Semua' | SimrsModule['status']>('Semua');

  const filteredCategories = useMemo(
    () =>
      moduleCategories
        .filter((category) => !selectedCategory || category.name === selectedCategory)
        .map((category) => ({
          ...category,
          modules: category.modules.filter((module) => {
            const term = searchQuery.toLowerCase();
            const statusMatch = selectedStatus === 'Semua' || module.status === selectedStatus;
            return (
              statusMatch &&
              (
                module.name.toLowerCase().includes(term) ||
                module.desc.toLowerCase().includes(term) ||
                module.highlights.some((item) => item.toLowerCase().includes(term))
              )
            );
          }),
        }))
        .filter((category) => category.modules.length > 0),
    [searchQuery, selectedCategory, selectedStatus]
  );

  const totalModules = moduleCategories.reduce((sum, c) => sum + c.modules.length, 0);
  const activeModules = moduleCategories.reduce((sum, c) => sum + c.modules.filter((m) => m.status === 'Aktif').length, 0);
  const roadmapModules = totalModules - activeModules;
  const totalFeatures = moduleCategories.reduce((sum, c) => sum + c.modules.reduce((mSum, m) => mSum + m.features, 0), 0);
  const activeProgress = Math.round((activeModules / totalModules) * 100);
  const filteredModuleCount = filteredCategories.reduce((sum, category) => sum + category.modules.length, 0);

  const resetFilters = () => {
    setSearchQuery('');
    setSelectedCategory(null);
    setSelectedStatus('Semua');
  };

  return (
    <section style={{ maxWidth: '1400px', margin: '0 auto' }}>
      <div style={{ marginBottom: '24px' }}>
        <h1 style={{ marginBottom: '8px' }}>Katalog Modul & Fitur SIMRS TNI AU</h1>
        <p style={{ color: 'var(--fg-secondary)', margin: 0 }}>Daftar modul sudah diperluas mengikuti kebutuhan dashboard, layanan klinis, penunjang, dan enterprise.</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '16px', marginBottom: '24px' }}>
        <Card><CardBody style={{ textAlign: 'center' }}><div style={{ fontSize: '26px', fontWeight: 700, color: 'var(--airforce-blue)' }}>{totalModules}</div><div style={{ fontSize: '12px', color: 'var(--neutral)' }}>Total Modul</div></CardBody></Card>
        <Card><CardBody style={{ textAlign: 'center' }}><div style={{ fontSize: '26px', fontWeight: 700, color: 'var(--success)' }}>{activeModules}</div><div style={{ fontSize: '12px', color: 'var(--neutral)' }}>Modul Aktif ({activeProgress}%)</div></CardBody></Card>
        <Card><CardBody style={{ textAlign: 'center' }}><div style={{ fontSize: '26px', fontWeight: 700 }}>{totalFeatures}+</div><div style={{ fontSize: '12px', color: 'var(--neutral)' }}>Total Fitur</div></CardBody></Card>
        <Card><CardBody style={{ textAlign: 'center' }}><div style={{ fontSize: '26px', fontWeight: 700, color: 'var(--warning)' }}>{roadmapModules}</div><div style={{ fontSize: '12px', color: 'var(--neutral)' }}>Modul Roadmap</div></CardBody></Card>
      </div>

      <Card style={{ marginBottom: '24px' }}>
        <CardBody>
          <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
            <div style={{ flex: 1, minWidth: 260 }}>
              <Input placeholder="Cari modul / fitur..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
            </div>
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
              <Button variant={selectedStatus === 'Semua' ? 'primary' : 'secondary'} size="sm" onClick={() => setSelectedStatus('Semua')}>Semua Status</Button>
              <Button variant={selectedStatus === 'Aktif' ? 'primary' : 'secondary'} size="sm" onClick={() => setSelectedStatus('Aktif')}>Aktif</Button>
              <Button variant={selectedStatus === 'Roadmap' ? 'primary' : 'secondary'} size="sm" onClick={() => setSelectedStatus('Roadmap')}>Roadmap</Button>
            </div>
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
              <Button variant={selectedCategory === null ? 'primary' : 'secondary'} size="sm" onClick={() => setSelectedCategory(null)}>Semua</Button>
              {moduleCategories.map((cat) => (
                <Button key={cat.name} variant={selectedCategory === cat.name ? 'primary' : 'secondary'} size="sm" onClick={() => setSelectedCategory(cat.name)}>{cat.name}</Button>
              ))}
            </div>
            <Button variant="ghost" size="sm" onClick={resetFilters}>Reset Filter</Button>
          </div>
        </CardBody>
      </Card>

      <div style={{ marginBottom: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
        <p style={{ margin: 0, color: 'var(--fg-secondary)', fontSize: '14px' }}>
          Menampilkan <strong style={{ color: 'var(--fg)' }}>{filteredModuleCount}</strong> modul dari total {totalModules} modul.
        </p>
        <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
          {selectedCategory && <Badge variant="info">Kategori: {selectedCategory}</Badge>}
          {selectedStatus !== 'Semua' && <Badge variant={selectedStatus === 'Aktif' ? 'success' : 'warning'}>Status: {selectedStatus}</Badge>}
        </div>
      </div>

      {filteredCategories.length === 0 && (
        <Card style={{ marginBottom: '20px' }}>
          <CardBody style={{ textAlign: 'center', padding: '30px 24px' }}>
            <h3 style={{ marginTop: 0 }}>Tidak ada modul yang sesuai filter</h3>
            <p style={{ color: 'var(--fg-secondary)', marginBottom: '16px' }}>
              Coba ubah kata kunci pencarian atau reset filter untuk melihat semua modul dan fiturnya.
            </p>
            <Button variant="secondary" onClick={resetFilters}>Tampilkan Semua Modul</Button>
          </CardBody>
        </Card>
      )}

      {filteredCategories.map((category) => (
        <div key={category.name} style={{ marginBottom: '28px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '14px' }}>
            <h2 style={{ margin: 0, fontSize: '18px' }}>{category.name}</h2>
            <Badge variant="neutral">{category.modules.length} modul</Badge>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(330px, 1fr))', gap: '16px' }}>
            {category.modules.map((module) => (
              <Card key={module.name} hover>
                <CardBody>
                  <div style={{ display: 'flex', justifyContent: 'space-between', gap: '10px' }}>
                    <h3 style={{ marginTop: 0, fontSize: '15px' }}>{module.name}</h3>
                    <Badge variant={module.status === 'Aktif' ? 'success' : 'warning'}>{module.status}</Badge>
                  </div>
                  <p style={{ fontSize: '13px', color: 'var(--fg-secondary)', marginTop: 0 }}>{module.desc}</p>
                  <ul style={{ paddingLeft: '18px', marginTop: '8px', marginBottom: '12px', fontSize: '12px', color: 'var(--fg-secondary)' }}>
                    {module.highlights.map((item) => (
                      <li key={item} style={{ marginBottom: '4px' }}>{item}</li>
                    ))}
                  </ul>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontSize: '12px', color: 'var(--neutral)' }}>{module.features} fitur</span>
                    <Link to={module.href} style={{ color: 'var(--airforce-blue)', fontWeight: 600, fontSize: '14px' }}>Buka</Link>
                  </div>
                </CardBody>
              </Card>
            ))}
          </div>
        </div>
      ))}
    </section>
  );
}
