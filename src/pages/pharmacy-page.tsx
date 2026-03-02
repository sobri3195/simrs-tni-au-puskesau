import React, { useState } from 'react';
import { Card, CardBody, CardHeader } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge, StatusBadge } from '@/components/ui/badge';
import { Tabs, TabPanel } from '@/components/ui/tabs';
import { Avatar } from '@/components/ui/avatar';
import { Stepper } from '@/components/ui/stepper';
import { Alert } from '@/components/ui/alert';

const prescriptions = [
  { id: 'RX001', patientName: 'Ahmad Wijaya', patientId: 'P001', doctor: 'dr. Andi', items: 3, status: 'pending', priority: 'urgent', time: '08:30' },
  { id: 'RX002', patientName: 'Siti Rahayu', patientId: 'P002', doctor: 'dr. Citra', items: 2, status: 'verifying', priority: 'normal', time: '08:45' },
  { id: 'RX003', patientName: 'Budi Santoso', patientId: 'P003', doctor: 'dr. Dewi', items: 5, status: 'dispensing', priority: 'normal', time: '09:00' },
  { id: 'RX004', patientName: 'Dewi Lestari', patientId: 'P004', doctor: 'dr. Andi', items: 2, status: 'completed', priority: 'normal', time: '09:15' },
  { id: 'RX005', patientName: 'Rina Kusuma', patientId: 'P005', doctor: 'dr. Citra', items: 1, status: 'pending', priority: 'normal', time: '09:30' },
];

const drugInteractions = [
  { severity: 'major', drug1: 'Warfarin', drug2: 'Aspirin', description: 'Increased risk of bleeding' },
  { severity: 'moderate', drug1: 'Metformin', drug2: 'Cimetidine', description: 'Increased metformin levels' },
];

const lowStockDrugs = [
  { name: 'Amoxicillin 500mg', stock: 50, min: 100, unit: 'tablet' },
  { name: 'Paracetamol 500mg', stock: 80, min: 200, unit: 'tablet' },
  { name: 'Omeprazole 20mg', stock: 30, min: 100, unit: 'kapsul' },
  { name: 'Cefadroxil 500mg', stock: 25, min: 50, unit: 'kapsul' },
];

const dispensingSteps = [
  { id: 'verify', label: 'Verifikasi Resep', description: 'Periksa kelengkapan dan keabsahan' },
  { id: 'check', label: 'Cek Interaksi', description: 'Periksa interaksi obat' },
  { id: 'prepare', label: 'Siapkan Obat', description: 'Pick dan pack obat' },
  { id: 'dispense', label: 'Serahkan', description: 'Serahkan ke pasien' },
];

export function PharmacyPage() {
  const [activeTab, setActiveTab] = useState('queue');
  const [selectedPrescription, setSelectedPrescription] = useState<string | null>(null);
  const [currentStep, setCurrentStep] = useState('verify');

  const getStatusBadge = (status: string) => {
    const statusMap: Record<string, { variant: 'warning' | 'info' | 'success' | 'neutral'; label: string }> = {
      pending: { variant: 'warning', label: 'Menunggu' },
      verifying: { variant: 'info', label: 'Verifikasi' },
      dispensing: { variant: 'info', label: 'Disiapkan' },
      completed: { variant: 'success', label: 'Selesai' },
    };
    const { variant, label } = statusMap[status] || { variant: 'neutral', label: status };
    return <Badge variant={variant}>{label}</Badge>;
  };

  return (
    <section style={{ maxWidth: '1400px', margin: '0 auto' }}>
      {/* Page Header */}
      <div className="page-header-card" style={{ marginBottom: '24px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <div>
            <h1 style={{ marginBottom: '8px' }}>Farmasi</h1>
            <p style={{ margin: 0, color: 'var(--fg-secondary)' }}>
              Kelola resep, dispensing, dan stok obat.
            </p>
          </div>
          <div style={{ display: 'flex', gap: '12px' }}>
            <Button variant="secondary">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ marginRight: '8px' }}>
                <circle cx="11" cy="11" r="8" />
                <path d="M21 21l-4.35-4.35" />
              </svg>
              Cari Obat
            </Button>
            <Button>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ marginRight: '8px' }}>
                <line x1="12" y1="5" x2="12" y2="19" />
                <line x1="5" y1="12" x2="19" y2="12" />
              </svg>
              Resep Manual
            </Button>
          </div>
        </div>
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
            <div style={{ fontSize: '28px', fontWeight: 700 }}>{prescriptions.length}</div>
            <div style={{ fontSize: '12px', color: 'var(--neutral)' }}>Total Resep</div>
          </CardBody>
        </Card>
        <Card>
          <CardBody style={{ textAlign: 'center', padding: '16px' }}>
            <div style={{ fontSize: '28px', fontWeight: 700, color: 'var(--warning)' }}>
              {prescriptions.filter(p => p.status === 'pending').length}
            </div>
            <div style={{ fontSize: '12px', color: 'var(--neutral)' }}>Menunggu</div>
          </CardBody>
        </Card>
        <Card>
          <CardBody style={{ textAlign: 'center', padding: '16px' }}>
            <div style={{ fontSize: '28px', fontWeight: 700, color: 'var(--info)' }}>
              {prescriptions.filter(p => p.status === 'dispensing' || p.status === 'verifying').length}
            </div>
            <div style={{ fontSize: '12px', color: 'var(--neutral)' }}>Diproses</div>
          </CardBody>
        </Card>
        <Card>
          <CardBody style={{ textAlign: 'center', padding: '16px' }}>
            <div style={{ fontSize: '28px', fontWeight: 700, color: 'var(--success)' }}>
              {prescriptions.filter(p => p.status === 'completed').length}
            </div>
            <div style={{ fontSize: '12px', color: 'var(--neutral)' }}>Selesai</div>
          </CardBody>
        </Card>
        <Card>
          <CardBody style={{ textAlign: 'center', padding: '16px' }}>
            <div style={{ fontSize: '28px', fontWeight: 700, color: 'var(--danger)' }}>
              {lowStockDrugs.length}
            </div>
            <div style={{ fontSize: '12px', color: 'var(--neutral)' }}>Stok Rendah</div>
          </CardBody>
        </Card>
      </div>

      {/* Tabs */}
      <Tabs
        tabs={[
          { id: 'queue', label: 'Antrian Resep', count: prescriptions.filter(p => p.status !== 'completed').length },
          { id: 'dispensing', label: 'Dispensing' },
          { id: 'stock', label: 'Stok Obat' },
          { id: 'interactions', label: 'Interaksi Obat' },
        ]}
        activeTab={activeTab}
        onChange={setActiveTab}
      />

      <TabPanel activeTab={activeTab} tabId="queue">
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 350px', gap: '16px' }}>
          <Card>
            <CardHeader>
              <h3 style={{ margin: 0 }}>Daftar Resep</h3>
            </CardHeader>
            <CardBody style={{ padding: 0 }}>
              <table className="table" style={{ width: '100%' }}>
                <thead>
                  <tr>
                    <th style={{ padding: '12px 16px', borderBottom: '1px solid var(--line)' }}>No. Resep</th>
                    <th style={{ padding: '12px 16px', borderBottom: '1px solid var(--line)' }}>Pasien</th>
                    <th style={{ padding: '12px 16px', borderBottom: '1px solid var(--line)' }}>Dokter</th>
                    <th style={{ padding: '12px 16px', borderBottom: '1px solid var(--line)' }}>Item</th>
                    <th style={{ padding: '12px 16px', borderBottom: '1px solid var(--line)' }}>Status</th>
                    <th style={{ padding: '12px 16px', borderBottom: '1px solid var(--line)' }}>Waktu</th>
                  </tr>
                </thead>
                <tbody>
                  {prescriptions.map((rx) => (
                    <tr
                      key={rx.id}
                      onClick={() => setSelectedPrescription(rx.id)}
                      style={{
                        cursor: 'pointer',
                        background: selectedPrescription === rx.id ? 'var(--surface-secondary)' : 
                                    rx.priority === 'urgent' ? 'rgba(220, 38, 38, 0.04)' : 'transparent',
                      }}
                    >
                      <td style={{ padding: '12px 16px' }}>
                        <span style={{ fontWeight: 600, color: 'var(--airforce-blue)' }}>{rx.id}</span>
                        {rx.priority === 'urgent' && <Badge variant="danger" style={{ marginLeft: '8px' }}>!</Badge>}
                      </td>
                      <td style={{ padding: '12px 16px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                          <Avatar name={rx.patientName} size="sm" />
                          <div>
                            <div style={{ fontWeight: 500 }}>{rx.patientName}</div>
                            <div style={{ fontSize: '12px', color: 'var(--neutral)' }}>{rx.patientId}</div>
                          </div>
                        </div>
                      </td>
                      <td style={{ padding: '12px 16px' }}>{rx.doctor}</td>
                      <td style={{ padding: '12px 16px' }}>{rx.items} item</td>
                      <td style={{ padding: '12px 16px' }}>{getStatusBadge(rx.status)}</td>
                      <td style={{ padding: '12px 16px' }}>{rx.time}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </CardBody>
          </Card>

          <Card>
            <CardHeader>
              <h3 style={{ margin: 0 }}>Detail Resep</h3>
            </CardHeader>
            <CardBody>
              {selectedPrescription ? (
                <>
                  <div style={{ marginBottom: '20px' }}>
                    <div style={{ fontSize: '13px', color: 'var(--neutral)', marginBottom: '4px' }}>Nomor Resep</div>
                    <div style={{ fontWeight: 600, fontSize: '16px', color: 'var(--airforce-blue)' }}>
                      {selectedPrescription}
                    </div>
                  </div>

                  <div style={{ marginBottom: '20px' }}>
                    <div style={{ fontSize: '13px', color: 'var(--neutral)', marginBottom: '8px' }}>Daftar Obat</div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                      {[
                        { name: 'Amoxicillin 500mg', dose: '3x1', qty: 15 },
                        { name: 'Paracetamol 500mg', dose: '3x1', qty: 15 },
                        { name: 'Vitamin C 500mg', dose: '1x1', qty: 10 },
                      ].map((drug, i) => (
                        <div
                          key={i}
                          style={{
                            padding: '10px 12px',
                            background: 'var(--surface-secondary)',
                            borderRadius: 'var(--radius)',
                          }}
                        >
                          <div style={{ fontWeight: 500 }}>{drug.name}</div>
                          <div style={{ fontSize: '12px', color: 'var(--neutral)' }}>
                            {drug.dose} • {drug.qty} buah
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    <Button fullWidth>Proses Resep</Button>
                    <Button fullWidth variant="secondary">Cek Interaksi</Button>
                  </div>
                </>
              ) : (
                <div style={{ textAlign: 'center', padding: '40px 20px', color: 'var(--neutral)' }}>
                  Pilih resep untuk melihat detail
                </div>
              )}
            </CardBody>
          </Card>
        </div>
      </TabPanel>

      <TabPanel activeTab={activeTab} tabId="dispensing">
        <Card>
          <CardHeader>
            <h3 style={{ margin: 0 }}>Proses Dispensing - RX001</h3>
          </CardHeader>
          <CardBody>
            <Stepper steps={dispensingSteps} currentStep={currentStep} onStepClick={setCurrentStep} orientation="horizontal" />

            <div style={{ marginTop: '32px' }}>
              {currentStep === 'verify' && (
                <div>
                  <h4 style={{ marginBottom: '16px' }}>Verifikasi Resep</h4>
                  <Alert variant="success" style={{ marginBottom: '20px' }}>
                    Resep valid dan lengkap. Diterbitkan oleh dr. Andi Setiawan, Sp.PD
                  </Alert>
                  <div style={{ display: 'flex', gap: '12px' }}>
                    <Button variant="secondary">Tolak</Button>
                    <Button onClick={() => setCurrentStep('check')}>Lanjutkan</Button>
                  </div>
                </div>
              )}

              {currentStep === 'check' && (
                <div>
                  <h4 style={{ marginBottom: '16px' }}>Pemeriksaan Interaksi Obat</h4>
                  <Alert variant="warning" style={{ marginBottom: '20px' }}>
                    <strong>Peringatan!</strong> Ditemukan 1 interaksi obat potensial.
                  </Alert>
                  <div style={{ marginBottom: '20px', padding: '12px', background: 'var(--warning-light)', borderRadius: 'var(--radius)' }}>
                    <div style={{ fontWeight: 600, color: '#92400e' }}>Moderate Interaction</div>
                    <div style={{ fontSize: '13px' }}>Amoxicillin + Paracetamol: Tidak ada interaksi signifikan</div>
                  </div>
                  <div style={{ display: 'flex', gap: '12px' }}>
                    <Button variant="secondary">Konsultasi Dokter</Button>
                    <Button onClick={() => setCurrentStep('prepare')}>Lanjutkan</Button>
                  </div>
                </div>
              )}

              {currentStep === 'prepare' && (
                <div>
                  <h4 style={{ marginBottom: '16px' }}>Siapkan Obat</h4>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '20px' }}>
                    {[
                      { name: 'Amoxicillin 500mg', scanned: true },
                      { name: 'Paracetamol 500mg', scanned: true },
                      { name: 'Vitamin C 500mg', scanned: false },
                    ].map((drug, i) => (
                      <div
                        key={i}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          padding: '12px 16px',
                          border: `1px solid ${drug.scanned ? 'var(--success-border)' : 'var(--line)'}`,
                          borderRadius: 'var(--radius)',
                          background: drug.scanned ? 'var(--success-light)' : 'white',
                        }}
                      >
                        <span>{drug.name}</span>
                        {drug.scanned ? (
                          <Badge variant="success">✓ Scanned</Badge>
                        ) : (
                          <Button size="sm" variant="secondary">Scan</Button>
                        )}
                      </div>
                    ))}
                  </div>
                  <Button onClick={() => setCurrentStep('dispense')}>Lanjutkan</Button>
                </div>
              )}

              {currentStep === 'dispense' && (
                <div>
                  <h4 style={{ marginBottom: '16px' }}>Serahkan ke Pasien</h4>
                  <div style={{ textAlign: 'center', padding: '40px 20px', marginBottom: '20px' }}>
                    <div
                      style={{
                        width: '80px',
                        height: '80px',
                        borderRadius: '50%',
                        background: 'var(--success-light)',
                        color: 'var(--success)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        margin: '0 auto 16px',
                        fontSize: '32px',
                      }}
                    >
                      ✓
                    </div>
                    <h3 style={{ marginBottom: '8px' }}>Siap Diserahkan</h3>
                    <p style={{ color: 'var(--neutral)' }}>Semua obat telah diverifikasi dan disiapkan</p>
                  </div>
                  <div style={{ display: 'flex', gap: '12px', justifyContent: 'center' }}>
                    <Button variant="secondary">Cetak Label</Button>
                    <Button>Selesaikan</Button>
                  </div>
                </div>
              )}
            </div>
          </CardBody>
        </Card>
      </TabPanel>

      <TabPanel activeTab={activeTab} tabId="stock">
        <Card>
          <CardHeader
            action={
              <Button size="sm">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ marginRight: '8px' }}>
                  <line x1="12" y1="5" x2="12" y2="19" />
                  <line x1="5" y1="12" x2="19" y2="12" />
                </svg>
                Tambah Stok
              </Button>
            }
          >
            <h3 style={{ margin: 0 }}>Stok Obat Rendah</h3>
          </CardHeader>
          <CardBody>
            <Alert variant="warning" style={{ marginBottom: '20px' }}>
              {lowStockDrugs.length} item obat di bawah batas minimum stok.
            </Alert>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {lowStockDrugs.map((drug, index) => (
                <div
                  key={index}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '16px',
                    border: '1px solid var(--line)',
                    borderRadius: 'var(--radius)',
                  }}
                >
                  <div>
                    <div style={{ fontWeight: 600 }}>{drug.name}</div>
                    <div style={{ fontSize: '13px', color: 'var(--neutral)' }}>
                      Stok: {drug.stock} {drug.unit} (Min: {drug.min})
                    </div>
                  </div>
                  <div style={{ width: '120px' }}>
                    <div
                      style={{
                        height: 8,
                        background: 'var(--bg-secondary)',
                        borderRadius: 'var(--radius-full)',
                        overflow: 'hidden',
                      }}
                    >
                      <div
                        style={{
                          width: `${(drug.stock / drug.min) * 100}%`,
                          height: '100%',
                          background: drug.stock < drug.min * 0.3 ? 'var(--danger)' : 'var(--warning)',
                        }}
                      />
                    </div>
                  </div>
                  <Button size="sm" variant="secondary">Order</Button>
                </div>
              ))}
            </div>
          </CardBody>
        </Card>
      </TabPanel>

      <TabPanel activeTab={activeTab} tabId="interactions">
        <Card>
          <CardHeader>
            <h3 style={{ margin: 0 }}>Drug Interaction Checker</h3>
          </CardHeader>
          <CardBody>
            <div style={{ display: 'flex', gap: '12px', marginBottom: '24px' }}>
              <Input placeholder="Masukkan nama obat 1..." style={{ flex: 1 }} />
              <Input placeholder="Masukkan nama obat 2..." style={{ flex: 1 }} />
              <Button>Cek Interaksi</Button>
            </div>

            <h4 style={{ marginBottom: '12px' }}>Hasil Pemeriksaan</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {drugInteractions.map((interaction, index) => (
                <div
                  key={index}
                  style={{
                    padding: '16px',
                    border: `1px solid ${interaction.severity === 'major' ? 'var(--danger-border)' : 'var(--warning-border)'}`,
                    borderRadius: 'var(--radius)',
                    background: interaction.severity === 'major' ? 'var(--danger-light)' : 'var(--warning-light)',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                    <Badge variant={interaction.severity === 'major' ? 'danger' : 'warning'}>
                      {interaction.severity.toUpperCase()}
                    </Badge>
                    <span style={{ fontWeight: 600 }}>{interaction.drug1} + {interaction.drug2}</span>
                  </div>
                  <p style={{ margin: 0, fontSize: '13px', color: 'var(--fg-secondary)' }}>
                    {interaction.description}
                  </p>
                </div>
              ))}
            </div>
          </CardBody>
        </Card>
      </TabPanel>
    </section>
  );
}
