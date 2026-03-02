import React, { useState } from 'react';
import { Card, CardBody, CardHeader } from '@/components/ui/card';
import { Input, Textarea } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { TriageBadge, Badge, StatusBadge } from '@/components/ui/badge';
import { Tabs, TabPanel } from '@/components/ui/tabs';
import { Avatar } from '@/components/ui/avatar';
import { Alert } from '@/components/ui/alert';

const edPatients = [
  { id: 'ED001', name: 'Ahmad Wijaya', age: 45, complaint: 'Nyeri dada, sesak napas', triage: 'P1' as const, arrivalTime: '08:15', status: 'Dalam penanganan', doctor: 'dr. Andi' },
  { id: 'ED002', name: 'Siti Rahayu', age: 32, complaint: 'Demam tinggi (>39°C)', triage: 'P2' as const, arrivalTime: '08:30', status: 'Menunggu dokter', doctor: '-' },
  { id: 'ED003', name: 'Budi Santoso', age: 28, complaint: 'Luka robek di lengan', triage: 'P3' as const, arrivalTime: '08:45', status: 'Menunggu', doctor: '-' },
  { id: 'ED004', name: 'Dewi Lestari', age: 55, complaint: 'Sesak napas berat', triage: 'P1' as const, arrivalTime: '08:50', status: 'Dalam penanganan', doctor: 'dr. Budi' },
  { id: 'ED005', name: 'Rina Kusuma', age: 8, complaint: 'Muntah-muntah, diare', triage: 'P2' as const, arrivalTime: '09:00', status: 'Menunggu lab', doctor: 'dr. Citra' },
  { id: 'ED006', name: 'Hendra P.', age: 38, complaint: 'Nyeri perut kanan bawah', triage: 'P2' as const, arrivalTime: '09:15', status: 'Menunggu', doctor: '-' },
];

const vitalSigns = [
  { label: 'Tekanan Darah', value: '120/80 mmHg', normal: true },
  { label: 'Suhu', value: '36.5°C', normal: true },
  { label: 'Nadi', value: '76x/menit', normal: true },
  { label: 'Respirasi', value: '16x/menit', normal: true },
  { label: 'SpO2', value: '98%', normal: true },
  { label: 'GCS', value: '15', normal: true },
];

const triageCategories = [
  { level: 'P1', label: 'Kritis', color: 'var(--danger)', desc: 'Penanganan segera', time: '< 10 menit' },
  { level: 'P2', label: 'Urgent', color: 'var(--warning)', desc: 'Penanganan cepat', time: '< 30 menit' },
  { level: 'P3', label: 'Normal', color: 'var(--success)', desc: 'Penanganan standar', time: '< 60 menit' },
  { level: 'P0', label: 'Meninggal', color: 'var(--triage-p0)', desc: 'DOA', time: '-' },
];

export function EmergencyPage() {
  const [activeTab, setActiveTab] = useState('queue');
  const [selectedPatient, setSelectedPatient] = useState<typeof edPatients[0] | null>(null);
  const [triageFormOpen, setTriageFormOpen] = useState(false);

  return (
    <section style={{ maxWidth: '1400px', margin: '0 auto' }}>
      {/* Page Header */}
      <div className="page-header-card" style={{ marginBottom: '24px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <div>
            <h1 style={{ marginBottom: '8px' }}>IGD & Triase</h1>
            <p style={{ margin: 0, color: 'var(--fg-secondary)' }}>
              Manajemen pasien darurat dan penilaian triase cepat.
            </p>
          </div>
          <div style={{ display: 'flex', gap: '12px' }}>
            <Button variant="secondary">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ marginRight: '8px' }}>
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                <line x1="16" y1="2" x2="16" y2="6" />
                <line x1="8" y1="2" x2="8" y2="6" />
                <line x1="3" y1="10" x2="21" y2="10" />
              </svg>
              Triage Board
            </Button>
            <Button variant="danger">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ marginRight: '8px' }}>
                <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
              </svg>
              P1 Alert
            </Button>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
          gap: '16px',
          marginBottom: '24px',
        }}
      >
        {triageCategories.map((cat) => (
          <Card key={cat.level}>
            <CardBody style={{ textAlign: 'center', padding: '16px' }}>
              <div
                style={{
                  width: '48px',
                  height: '48px',
                  borderRadius: '50%',
                  background: `${cat.color}20`,
                  color: cat.color,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 12px',
                  fontSize: '18px',
                  fontWeight: 700,
                  border: `2px solid ${cat.color}`,
                }}
              >
                {edPatients.filter(p => p.triage === cat.level).length}
              </div>
              <div style={{ fontWeight: 600, color: cat.color }}>{cat.level}</div>
              <div style={{ fontSize: '12px', color: 'var(--neutral)' }}>{cat.label}</div>
              <div style={{ fontSize: '11px', color: 'var(--neutral)' }}>{cat.time}</div>
            </CardBody>
          </Card>
        ))}
      </div>

      {/* Tabs */}
      <Tabs
        tabs={[
          { id: 'queue', label: 'Antrian Pasien', count: edPatients.length },
          { id: 'triage', label: 'Form Triase' },
          { id: 'resus', label: 'Resusitasi' },
        ]}
        activeTab={activeTab}
        onChange={setActiveTab}
      />

      <TabPanel activeTab={activeTab} tabId="queue">
        <div style={{ display: 'grid', gridTemplateColumns: selectedPatient ? '1fr 400px' : '1fr', gap: '16px' }}>
          {/* Patient List */}
          <Card>
            <CardHeader
              action={
                <div style={{ display: 'flex', gap: '8px' }}>
                  <Badge variant="danger">P1: {edPatients.filter(p => p.triage === 'P1').length}</Badge>
                  <Badge variant="warning">P2: {edPatients.filter(p => p.triage === 'P2').length}</Badge>
                  <Badge variant="success">P3: {edPatients.filter(p => p.triage === 'P3').length}</Badge>
                </div>
              }
            >
              <h3 style={{ margin: 0 }}>Daftar Pasien IGD</h3>
            </CardHeader>
            <CardBody style={{ padding: 0 }}>
              <table className="table" style={{ width: '100%' }}>
                <thead>
                  <tr>
                    <th style={{ padding: '12px 16px', borderBottom: '1px solid var(--line)' }}>Pasien</th>
                    <th style={{ padding: '12px 16px', borderBottom: '1px solid var(--line)' }}>Keluhan</th>
                    <th style={{ padding: '12px 16px', borderBottom: '1px solid var(--line)' }}>Triage</th>
                    <th style={{ padding: '12px 16px', borderBottom: '1px solid var(--line)' }}>Status</th>
                    <th style={{ padding: '12px 16px', borderBottom: '1px solid var(--line)' }}>Waktu</th>
                  </tr>
                </thead>
                <tbody>
                  {edPatients.sort((a, b) => {
                    const order = { P1: 0, P2: 1, P3: 2, P0: 3 };
                    return order[a.triage] - order[b.triage];
                  }).map((patient) => (
                    <tr
                      key={patient.id}
                      onClick={() => setSelectedPatient(patient)}
                      style={{
                        cursor: 'pointer',
                        background: selectedPatient?.id === patient.id ? 'var(--surface-secondary)' : 
                                    patient.triage === 'P1' ? 'rgba(220, 38, 38, 0.04)' : 'transparent',
                      }}
                    >
                      <td style={{ padding: '12px 16px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                          <Avatar name={patient.name} size="sm" />
                          <div>
                            <div style={{ fontWeight: 600 }}>{patient.name}</div>
                            <div style={{ fontSize: '12px', color: 'var(--neutral)' }}>
                              {patient.id} • {patient.age} tahun
                            </div>
                          </div>
                        </div>
                      </td>
                      <td style={{ padding: '12px 16px', maxWidth: '200px' }}>
                        <span style={{ fontSize: '13px', color: 'var(--fg-secondary)' }}>
                          {patient.complaint}
                        </span>
                      </td>
                      <td style={{ padding: '12px 16px' }}>
                        <TriageBadge level={patient.triage} />
                      </td>
                      <td style={{ padding: '12px 16px' }}>
                        <StatusBadge status={patient.status === 'Dalam penanganan' ? 'active' : 'pending'} label={patient.status} />
                      </td>
                      <td style={{ padding: '12px 16px' }}>
                        <span style={{ fontSize: '13px', color: 'var(--neutral)' }}>{patient.arrivalTime}</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </CardBody>
          </Card>

          {/* Patient Detail */}
          {selectedPatient && (
            <Card>
              <CardHeader
                action={
                  <Button size="sm" variant="ghost" onClick={() => setSelectedPatient(null)}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M18 6L6 18M6 6l12 12" />
                    </svg>
                  </Button>
                }
              >
                <h3 style={{ margin: 0 }}>Detail Pasien</h3>
              </CardHeader>
              <CardBody>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px' }}>
                  <Avatar name={selectedPatient.name} size="lg" />
                  <div>
                    <div style={{ fontWeight: 600, fontSize: '16px' }}>{selectedPatient.name}</div>
                    <div style={{ fontSize: '13px', color: 'var(--neutral)' }}>
                      {selectedPatient.id} • {selectedPatient.age} tahun
                    </div>
                    <TriageBadge level={selectedPatient.triage} />
                  </div>
                </div>

                <div style={{ marginBottom: '20px' }}>
                  <div style={{ fontSize: '12px', fontWeight: 600, color: 'var(--neutral)', marginBottom: '8px', textTransform: 'uppercase' }}>
                    Keluhan Utama
                  </div>
                  <div style={{ padding: '12px', background: 'var(--surface-secondary)', borderRadius: 'var(--radius)', fontSize: '14px' }}>
                    {selectedPatient.complaint}
                  </div>
                </div>

                <div style={{ marginBottom: '20px' }}>
                  <div style={{ fontSize: '12px', fontWeight: 600, color: 'var(--neutral)', marginBottom: '8px', textTransform: 'uppercase' }}>
                    Tanda Vital
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '8px' }}>
                    {vitalSigns.map((vital) => (
                      <div
                        key={vital.label}
                        style={{
                          padding: '10px 12px',
                          background: 'var(--surface-secondary)',
                          borderRadius: 'var(--radius)',
                        }}
                      >
                        <div style={{ fontSize: '11px', color: 'var(--neutral)' }}>{vital.label}</div>
                        <div style={{ fontWeight: 600, color: vital.normal ? 'var(--fg)' : 'var(--danger)' }}>
                          {vital.value}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  <Button fullWidth onClick={() => setTriageFormOpen(true)}>
                    Update Triase
                  </Button>
                  <Button fullWidth variant="secondary">
                    Fast Order Lab
                  </Button>
                  <Button fullWidth variant="secondary">
                    Fast Order Radiologi
                  </Button>
                </div>
              </CardBody>
            </Card>
          )}
        </div>
      </TabPanel>

      <TabPanel activeTab={activeTab} tabId="triage">
        <Card>
          <CardHeader>
            <h3 style={{ margin: 0 }}>Form Penilaian Triase (ESI)</h3>
          </CardHeader>
          <CardBody>
            <Alert variant="warning" style={{ marginBottom: '20px' }}>
              Penilaian triase harus dilakukan dalam waktu kurang dari 60 detik untuk pasien kritis.
            </Alert>

            <div style={{ marginBottom: '24px' }}>
              <h4 style={{ marginBottom: '12px' }}>Level Kritis?</h4>
              <div style={{ display: 'flex', gap: '12px' }}>
                <button
                  style={{
                    flex: 1,
                    padding: '16px',
                    border: '2px solid var(--danger)',
                    borderRadius: 'var(--radius)',
                    background: 'var(--danger-light)',
                    cursor: 'pointer',
                  }}
                >
                  <div style={{ fontWeight: 700, color: 'var(--danger)', marginBottom: '4px' }}>YA</div>
                  <div style={{ fontSize: '12px', color: 'var(--danger)' }}>High risk, unresponsive, confusion, intubated, apnea</div>
                </button>
                <button
                  style={{
                    flex: 1,
                    padding: '16px',
                    border: '2px solid var(--line)',
                    borderRadius: 'var(--radius)',
                    background: 'white',
                    cursor: 'pointer',
                  }}
                >
                  <div style={{ fontWeight: 700, marginBottom: '4px' }}>TIDAK</div>
                  <div style={{ fontSize: '12px', color: 'var(--neutral)' }}>Lanjut ke evaluasi berikutnya</div>
                </button>
              </div>
            </div>

            <div style={{ marginBottom: '24px' }}>
              <h4 style={{ marginBottom: '12px' }}>Apakah pasien harus menunggu?</h4>
              <p style={{ fontSize: '13px', color: 'var(--neutral)', marginBottom: '12px' }}>
                Berapa banyak sumber daya yang diperkirakan diperlukan?
              </p>
              <div style={{ display: 'flex', gap: '8px' }}>
                <button style={{ flex: 1, padding: '12px', border: '2px solid var(--warning)', borderRadius: 'var(--radius)', background: 'white', cursor: 'pointer' }}>
                  Tidak ada (P2)
                </button>
                <button style={{ flex: 1, padding: '12px', border: '2px solid var(--line)', borderRadius: 'var(--radius)', background: 'white', cursor: 'pointer' }}>
                  1 sumber daya (P3)
                </button>
                <button style={{ flex: 1, padding: '12px', border: '2px solid var(--line)', borderRadius: 'var(--radius)', background: 'white', cursor: 'pointer' }}>
                  2+ sumber daya (P3)
                </button>
              </div>
            </div>

            <div style={{ marginBottom: '24px' }}>
              <h4 style={{ marginBottom: '12px' }}>Tanda Vital</h4>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px' }}>
                <Input label="Tekanan Darah" placeholder="120/80" />
                <Input label="Suhu (°C)" placeholder="36.5" type="number" />
                <Input label="Nadi (/menit)" placeholder="76" type="number" />
                <Input label="Respirasi (/menit)" placeholder="16" type="number" />
                <Input label="SpO2 (%)" placeholder="98" type="number" />
                <Input label="GCS" placeholder="15" />
              </div>
            </div>

            <Textarea label="Catatan Tambahan" placeholder="Catatan observasi atau riwayat penyakit..." rows={3} />

            <div style={{ marginTop: '24px', display: 'flex', justifyContent: 'flex-end', gap: '12px' }}>
              <Button variant="secondary">Batal</Button>
              <Button>Simpan Triase</Button>
            </div>
          </CardBody>
        </Card>
      </TabPanel>

      <TabPanel activeTab={activeTab} tabId="resus">
        <Alert variant="danger" style={{ marginBottom: '20px' }}>
          <strong>Mode Resusitasi Aktif</strong> — Semua tindakan akan tercatat dengan timestamp otomatis.
        </Alert>
        <Card>
          <CardHeader>
            <h3 style={{ margin: 0 }}>Timeline Resusitasi</h3>
          </CardHeader>
          <CardBody>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {[
                { time: '08:15:32', event: 'Start CPR', actor: 'dr. Andi' },
                { time: '08:16:00', event: 'Epinephrine 1mg IV', actor: 'Perawat Dewi' },
                { time: '08:18:00', event: 'Defibrillation 200J', actor: 'dr. Andi' },
                { time: '08:20:00', event: 'ROSC achieved', actor: 'dr. Andi' },
                { time: '08:22:00', event: 'Intubation', actor: 'dr. Budi' },
              ].map((item, index) => (
                <div
                  key={index}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '16px',
                    padding: '12px 16px',
                    background: 'var(--surface-secondary)',
                    borderRadius: 'var(--radius)',
                  }}
                >
                  <div style={{ fontFamily: 'monospace', fontSize: '14px', fontWeight: 600, color: 'var(--airforce-blue)', minWidth: '80px' }}>
                    {item.time}
                  </div>
                  <div style={{ flex: 1, fontWeight: 500 }}>{item.event}</div>
                  <div style={{ fontSize: '13px', color: 'var(--neutral)' }}>{item.actor}</div>
                </div>
              ))}
            </div>

            <div style={{ marginTop: '24px' }}>
              <Input placeholder="Tambah event baru..." style={{ marginBottom: '12px' }} />
              <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                {['CPR Start', 'Epinephrine', 'Defibrillation', 'Intubation', 'ROSC', 'IV Access'].map((action) => (
                  <Button key={action} size="sm" variant="secondary">{action}</Button>
                ))}
              </div>
            </div>
          </CardBody>
        </Card>
      </TabPanel>
    </section>
  );
}
