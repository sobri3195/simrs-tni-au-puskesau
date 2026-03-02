import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardBody, CardHeader } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge, TriageBadge, StatusBadge } from '@/components/ui/badge';
import { Table, TableHeader } from '@/components/ui/table';
import { Tabs, TabPanel } from '@/components/ui/tabs';
import { Avatar } from '@/components/ui/avatar';
import { Select } from '@/components/ui/select';

const mockPatients = [
  { id: 'P001', name: 'Ahmad Wijaya', nik: '3201234567890001', age: 45, gender: 'L', phone: '081234567890', address: 'Jakarta Selatan', militaryStatus: 'Aktif', unit: 'Skadron 1', triage: 'P1', lastVisit: '2024-01-15', status: 'active' },
  { id: 'P002', name: 'Siti Rahayu', nik: '3201234567890002', age: 32, gender: 'P', phone: '081234567891', address: 'Jakarta Barat', militaryStatus: 'Keluarga', unit: 'Skadron 2', triage: 'P2', lastVisit: '2024-01-14', status: 'active' },
  { id: 'P003', name: 'Budi Santoso', nik: '3201234567890003', age: 28, gender: 'L', phone: '081234567892', address: 'Jakarta Timur', militaryStatus: 'Purnawirawan', unit: 'Lanud Halim', triage: 'P3', lastVisit: '2024-01-13', status: 'active' },
  { id: 'P004', name: 'Dewi Lestari', nik: '3201234567890004', age: 55, gender: 'P', phone: '081234567893', address: 'Bekasi', militaryStatus: 'Keluarga', unit: 'Skadron 1', triage: null, lastVisit: '2024-01-10', status: 'active' },
  { id: 'P005', name: 'Rina Kusuma', nik: '3201234567890005', age: 8, gender: 'P', phone: '081234567894', address: 'Tangerang', militaryStatus: 'Anak', unit: 'Skadron 3', triage: null, lastVisit: '2024-01-08', status: 'inactive' },
  { id: 'P006', name: 'Hendra Pratama', nik: '3201234567890006', age: 38, gender: 'L', phone: '081234567895', address: 'Depok', militaryStatus: 'Aktif', unit: 'Skadron 2', triage: 'P2', lastVisit: '2024-01-12', status: 'active' },
];

export function PatientsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('all');
  const [selectedPatient, setSelectedPatient] = useState<typeof mockPatients[0] | null>(null);

  const filteredPatients = mockPatients.filter((patient) => {
    const matchesSearch = patient.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         patient.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         patient.nik.includes(searchQuery);
    if (activeTab === 'all') return matchesSearch;
    if (activeTab === 'active') return matchesSearch && patient.status === 'active';
    if (activeTab === 'critical') return matchesSearch && patient.triage === 'P1';
    return matchesSearch;
  });

  const columns = [
    {
      key: 'id',
      header: 'ID Pasien',
      render: (patient: typeof mockPatients[0]) => (
        <Link
          to={`/patients/${patient.id}`}
          style={{ color: 'var(--airforce-blue)', fontWeight: 600 }}
        >
          {patient.id}
        </Link>
      ),
    },
    {
      key: 'name',
      header: 'Nama Pasien',
      render: (patient: typeof mockPatients[0]) => (
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <Avatar name={patient.name} size="sm" />
          <div>
            <div style={{ fontWeight: 500 }}>{patient.name}</div>
            <div style={{ fontSize: '12px', color: 'var(--neutral)' }}>
              {patient.age} tahun • {patient.gender === 'L' ? 'Laki-laki' : 'Perempuan'}
            </div>
          </div>
        </div>
      ),
    },
    {
      key: 'militaryStatus',
      header: 'Status Militer',
      render: (patient: typeof mockPatients[0]) => (
        <Badge
          variant={
            patient.militaryStatus === 'Aktif' ? 'success' :
            patient.militaryStatus === 'Purnawirawan' ? 'info' :
            patient.militaryStatus === 'Keluarga' ? 'warning' : 'neutral'
          }
        >
          {patient.militaryStatus}
        </Badge>
      ),
    },
    {
      key: 'unit',
      header: 'Unit',
      render: (patient: typeof mockPatients[0]) => (
        <span>{patient.unit}</span>
      ),
    },
    {
      key: 'triage',
      header: 'Triage',
      render: (patient: typeof mockPatients[0]) => (
        patient.triage ? <TriageBadge level={patient.triage as 'P1' | 'P2' | 'P3' | 'P0'} /> : <span style={{ color: 'var(--neutral)' }}>-</span>
      ),
    },
    {
      key: 'lastVisit',
      header: 'Kunjungan Terakhir',
      render: (patient: typeof mockPatients[0]) => (
        <span style={{ fontSize: '13px', color: 'var(--fg-secondary)' }}>
          {new Date(patient.lastVisit).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })}
        </span>
      ),
    },
    {
      key: 'status',
      header: 'Status',
      render: (patient: typeof mockPatients[0]) => (
        <StatusBadge status={patient.status as 'active' | 'inactive'} />
      ),
    },
    {
      key: 'actions',
      header: 'Aksi',
      render: (patient: typeof mockPatients[0]) => (
        <div style={{ display: 'flex', gap: '8px' }}>
          <Button size="sm" variant="ghost">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
              <circle cx="12" cy="12" r="3" />
            </svg>
          </Button>
          <Button size="sm" variant="ghost">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
              <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
            </svg>
          </Button>
        </div>
      ),
    },
  ];

  return (
    <section style={{ maxWidth: '1400px', margin: '0 auto' }}>
      {/* Page Header */}
      <div className="page-header-card" style={{ marginBottom: '24px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <div>
            <h1 style={{ marginBottom: '8px' }}>MPI Search Pasien</h1>
            <p style={{ margin: 0, color: 'var(--fg-secondary)' }}>
              Cari pasien berdasarkan NIK, MRN, atau nama, lalu lanjutkan proses registrasi/layanan.
            </p>
          </div>
          <Button
            icon={
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="12" y1="5" x2="12" y2="19" />
                <line x1="5" y1="12" x2="19" y2="12" />
              </svg>
            }
          >
            Tambah Pasien
          </Button>
        </div>
      </div>

      {/* Search and Filters */}
      <Card style={{ marginBottom: '20px' }}>
        <CardBody>
          <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
            <div style={{ flex: '1', minWidth: '300px' }}>
              <Input
                placeholder="Cari berdasarkan NIK, MRN, atau nama..."
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
            <Select
              options={[
                { value: 'all', label: 'Semua Status Militer' },
                { value: 'Aktif', label: 'Aktif' },
                { value: 'Purnawirawan', label: 'Purnawirawan' },
                { value: 'Keluarga', label: 'Keluarga' },
                { value: 'Anak', label: 'Anak' },
              ]}
              placeholder="Status Militer"
            />
            <Select
              options={[
                { value: 'all', label: 'Semua Unit' },
                { value: 'Skadron 1', label: 'Skadron 1' },
                { value: 'Skadron 2', label: 'Skadron 2' },
                { value: 'Skadron 3', label: 'Skadron 3' },
                { value: 'Lanud Halim', label: 'Lanud Halim' },
              ]}
              placeholder="Unit"
            />
          </div>
        </CardBody>
      </Card>

      {/* Tabs */}
      <Tabs
        tabs={[
          { id: 'all', label: 'Semua', count: mockPatients.length },
          { id: 'active', label: 'Aktif', count: mockPatients.filter(p => p.status === 'active').length },
          { id: 'critical', label: 'Kritis', count: mockPatients.filter(p => p.triage === 'P1').length },
        ]}
        activeTab={activeTab}
        onChange={setActiveTab}
      />

      {/* Patient Table */}
      <Table
        columns={columns}
        data={filteredPatients}
        keyExtractor={(patient) => patient.id}
        onRowClick={(patient) => setSelectedPatient(patient)}
        emptyMessage="Tidak ada pasien yang ditemukan"
        emptyAction={
          <Button variant="primary" style={{ marginTop: '16px' }}>
            Tambah Pasien Baru
          </Button>
        }
      />

      {/* Stats Summary */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '16px',
          marginTop: '24px',
        }}
      >
        <Card>
          <CardBody>
            <div style={{ fontSize: '13px', color: 'var(--neutral)', marginBottom: '4px' }}>Total Pasien</div>
            <div style={{ fontSize: '28px', fontWeight: 700, color: 'var(--fg)' }}>{mockPatients.length}</div>
          </CardBody>
        </Card>
        <Card>
          <CardBody>
            <div style={{ fontSize: '13px', color: 'var(--neutral)', marginBottom: '4px' }}>Pasien Aktif</div>
            <div style={{ fontSize: '28px', fontWeight: 700, color: 'var(--success)' }}>
              {mockPatients.filter(p => p.status === 'active').length}
            </div>
          </CardBody>
        </Card>
        <Card>
          <CardBody>
            <div style={{ fontSize: '13px', color: 'var(--neutral)', marginBottom: '4px' }}>Kunjungan Bulan Ini</div>
            <div style={{ fontSize: '28px', fontWeight: 700, color: 'var(--info)' }}>248</div>
          </CardBody>
        </Card>
        <Card>
          <CardBody>
            <div style={{ fontSize: '13px', color: 'var(--neutral)', marginBottom: '4px' }}>Pasien Baru</div>
            <div style={{ fontSize: '28px', fontWeight: 700, color: 'var(--warning)' }}>12</div>
          </CardBody>
        </Card>
      </div>
    </section>
  );
}
