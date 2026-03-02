import React, { useState } from 'react';
import { Card, CardBody, CardHeader } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge, StatusBadge } from '@/components/ui/badge';
import { Tabs, TabPanel } from '@/components/ui/tabs';
import { Avatar } from '@/components/ui/avatar';
import { Progress } from '@/components/ui/progress';

const invoices = [
  { id: 'INV001', patientName: 'Ahmad Wijaya', patientId: 'P001', date: '2024-01-15', amount: 1250000, paid: 0, status: 'unpaid', paymentType: 'BPJS' },
  { id: 'INV002', patientName: 'Siti Rahayu', patientId: 'P002', date: '2024-01-15', amount: 850000, paid: 850000, status: 'paid', paymentType: 'Mandiri' },
  { id: 'INV003', patientName: 'Budi Santoso', patientId: 'P003', date: '2024-01-14', amount: 2100000, paid: 1500000, status: 'partial', paymentType: 'TNI' },
  { id: 'INV004', patientName: 'Dewi Lestari', patientId: 'P004', date: '2024-01-14', amount: 500000, paid: 0, status: 'unpaid', paymentType: 'BPJS' },
  { id: 'INV005', patientName: 'Rina Kusuma', patientId: 'P005', date: '2024-01-13', amount: 350000, paid: 350000, status: 'paid', paymentType: 'Mandiri' },
];

const chargeItems = [
  { category: 'Pemeriksaan', items: [{ name: 'Konsultasi Dokter', price: 150000 }, { name: 'Pemeriksaan Fisik', price: 75000 }] },
  { category: 'Laboratorium', items: [{ name: 'Darah Lengkap', price: 85000 }, { name: 'Kimia Darah', price: 250000 }] },
  { category: 'Farmasi', items: [{ name: 'Amoxicillin 500mg (15 tab)', price: 45000 }, { name: 'Paracetamol 500mg (15 tab)', price: 25000 }] },
  { category: 'Tindakan', items: [{ name: 'Injeksi IM', price: 50000 }] },
];

const statistics = [
  { label: 'Total Tagihan Hari Ini', value: 'Rp 4.850.000' },
  { label: 'Sudah Dibayar', value: 'Rp 2.700.000' },
  { label: 'Belum Dibayar', value: 'Rp 2.150.000' },
  { label: 'Piutang BPJS', value: 'Rp 1.750.000' },
];

const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(amount);
};

export function BillingPage() {
  const [activeTab, setActiveTab] = useState('invoices');
  const [selectedInvoice, setSelectedInvoice] = useState<string | null>(null);

  const getStatusBadge = (status: string) => {
    const statusMap: Record<string, { variant: 'warning' | 'success' | 'info' | 'danger'; label: string }> = {
      unpaid: { variant: 'danger', label: 'Belum Bayar' },
      paid: { variant: 'success', label: 'Lunas' },
      partial: { variant: 'warning', label: 'Sebagian' },
    };
    const { variant, label } = statusMap[status] || { variant: 'info', label: status };
    return <Badge variant={variant}>{label}</Badge>;
  };

  return (
    <section style={{ maxWidth: '1400px', margin: '0 auto' }}>
      {/* Page Header */}
      <div className="page-header-card" style={{ marginBottom: '24px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <div>
            <h1 style={{ marginBottom: '8px' }}>Billing & Kasir</h1>
            <p style={{ margin: 0, color: 'var(--fg-secondary)' }}>
              Kelola tagihan, pembayaran, dan laporan keuangan.
            </p>
          </div>
          <div style={{ display: 'flex', gap: '12px' }}>
            <Button variant="secondary">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ marginRight: '8px' }}>
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                <polyline points="14 2 14 8 20 8" />
              </svg>
              Laporan
            </Button>
            <Button>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ marginRight: '8px' }}>
                <line x1="12" y1="5" x2="12" y2="19" />
                <line x1="5" y1="12" x2="19" y2="12" />
              </svg>
              Tagihan Baru
            </Button>
          </div>
        </div>
      </div>

      {/* Statistics */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '16px',
          marginBottom: '24px',
        }}
      >
        {statistics.map((stat, index) => (
          <Card key={index}>
            <CardBody>
              <div style={{ fontSize: '13px', color: 'var(--neutral)', marginBottom: '4px' }}>{stat.label}</div>
              <div style={{ fontSize: '24px', fontWeight: 700, color: index === 2 ? 'var(--danger)' : 'var(--fg)' }}>
                {stat.value}
              </div>
            </CardBody>
          </Card>
        ))}
      </div>

      {/* Tabs */}
      <Tabs
        tabs={[
          { id: 'invoices', label: 'Daftar Tagihan', count: invoices.length },
          { id: 'payment', label: 'Pembayaran' },
          { id: 'claims', label: 'Klaim' },
        ]}
        activeTab={activeTab}
        onChange={setActiveTab}
      />

      <TabPanel activeTab={activeTab} tabId="invoices">
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 380px', gap: '16px' }}>
          <Card>
            <CardHeader>
              <h3 style={{ margin: 0 }}>Daftar Tagihan</h3>
            </CardHeader>
            <CardBody style={{ padding: 0 }}>
              <table className="table" style={{ width: '100%' }}>
                <thead>
                  <tr>
                    <th style={{ padding: '12px 16px', borderBottom: '1px solid var(--line)' }}>No. Invoice</th>
                    <th style={{ padding: '12px 16px', borderBottom: '1px solid var(--line)' }}>Pasien</th>
                    <th style={{ padding: '12px 16px', borderBottom: '1px solid var(--line)' }}>Tanggal</th>
                    <th style={{ padding: '12px 16px', borderBottom: '1px solid var(--line)' }}>Total</th>
                    <th style={{ padding: '12px 16px', borderBottom: '1px solid var(--line)' }}>Status</th>
                    <th style={{ padding: '12px 16px', borderBottom: '1px solid var(--line)' }}>Tipe</th>
                  </tr>
                </thead>
                <tbody>
                  {invoices.map((inv) => (
                    <tr
                      key={inv.id}
                      onClick={() => setSelectedInvoice(inv.id)}
                      style={{
                        cursor: 'pointer',
                        background: selectedInvoice === inv.id ? 'var(--surface-secondary)' : 'transparent',
                      }}
                    >
                      <td style={{ padding: '12px 16px' }}>
                        <span style={{ fontWeight: 600, color: 'var(--airforce-blue)' }}>{inv.id}</span>
                      </td>
                      <td style={{ padding: '12px 16px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                          <Avatar name={inv.patientName} size="sm" />
                          <div>
                            <div style={{ fontWeight: 500 }}>{inv.patientName}</div>
                            <div style={{ fontSize: '12px', color: 'var(--neutral)' }}>{inv.patientId}</div>
                          </div>
                        </div>
                      </td>
                      <td style={{ padding: '12px 16px' }}>{inv.date}</td>
                      <td style={{ padding: '12px 16px', fontWeight: 600 }}>{formatCurrency(inv.amount)}</td>
                      <td style={{ padding: '12px 16px' }}>{getStatusBadge(inv.status)}</td>
                      <td style={{ padding: '12px 16px' }}>
                        <Badge variant="neutral">{inv.paymentType}</Badge>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </CardBody>
          </Card>

          <Card>
            <CardHeader>
              <h3 style={{ margin: 0 }}>Detail Tagihan</h3>
            </CardHeader>
            <CardBody>
              {selectedInvoice ? (
                <>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px' }}>
                    <Avatar name="Ahmad Wijaya" />
                    <div>
                      <div style={{ fontWeight: 600 }}>Ahmad Wijaya</div>
                      <div style={{ fontSize: '13px', color: 'var(--neutral)' }}>P001 • BPJS</div>
                    </div>
                  </div>

                  <div style={{ marginBottom: '20px' }}>
                    <h4 style={{ fontSize: '14px', marginBottom: '12px' }}>Rincian Biaya</h4>
                    {chargeItems.map((category, idx) => (
                      <div key={idx} style={{ marginBottom: '12px' }}>
                        <div style={{ fontSize: '12px', fontWeight: 600, color: 'var(--neutral)', marginBottom: '6px' }}>
                          {category.category}
                        </div>
                        {category.items.map((item, i) => (
                          <div key={i} style={{ display: 'flex', justifyContent: 'space-between', padding: '6px 0', fontSize: '13px' }}>
                            <span>{item.name}</span>
                            <span>{formatCurrency(item.price)}</span>
                          </div>
                        ))}
                      </div>
                    ))}
                  </div>

                  <div style={{ borderTop: '1px solid var(--line)', paddingTop: '12px', marginBottom: '20px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 600, fontSize: '16px' }}>
                      <span>Total</span>
                      <span>{formatCurrency(1250000)}</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', color: 'var(--success)', marginTop: '4px' }}>
                      <span>Dibayar</span>
                      <span>{formatCurrency(0)}</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', color: 'var(--danger)', marginTop: '4px' }}>
                      <span>Sisa</span>
                      <span>{formatCurrency(1250000)}</span>
                    </div>
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    <Button>Proses Pembayaran</Button>
                    <Button variant="secondary">Cetak Invoice</Button>
                  </div>
                </>
              ) : (
                <div style={{ textAlign: 'center', padding: '40px 20px', color: 'var(--neutral)' }}>
                  Pilih invoice untuk melihat detail
                </div>
              )}
            </CardBody>
          </Card>
        </div>
      </TabPanel>

      <TabPanel activeTab={activeTab} tabId="payment">
        <Card>
          <CardHeader>
            <h3 style={{ margin: 0 }}>Proses Pembayaran</h3>
          </CardHeader>
          <CardBody>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
              <div>
                <h4 style={{ marginBottom: '16px' }}>Informasi Pasien</h4>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px' }}>
                  <Avatar name="Budi Santoso" size="lg" />
                  <div>
                    <div style={{ fontWeight: 600, fontSize: '16px' }}>Budi Santoso</div>
                    <div style={{ fontSize: '13px', color: 'var(--neutral)' }}>P003 • Asuransi TNI</div>
                  </div>
                </div>

                <div style={{ marginBottom: '20px' }}>
                  <div style={{ fontSize: '12px', color: 'var(--neutral)', marginBottom: '8px' }}>Progress Pembayaran</div>
                  <Progress value={1500000} max={2100000} showLabel />
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                  <div style={{ padding: '12px', background: 'var(--surface-secondary)', borderRadius: 'var(--radius)' }}>
                    <div style={{ fontSize: '12px', color: 'var(--neutral)' }}>Total Tagihan</div>
                    <div style={{ fontWeight: 600, fontSize: '18px' }}>{formatCurrency(2100000)}</div>
                  </div>
                  <div style={{ padding: '12px', background: 'var(--success-light)', borderRadius: 'var(--radius)' }}>
                    <div style={{ fontSize: '12px', color: 'var(--success)' }}>Sudah Dibayar</div>
                    <div style={{ fontWeight: 600, fontSize: '18px', color: 'var(--success)' }}>{formatCurrency(1500000)}</div>
                  </div>
                  <div style={{ padding: '12px', background: 'var(--danger-light)', borderRadius: 'var(--radius)', gridColumn: '1 / -1' }}>
                    <div style={{ fontSize: '12px', color: 'var(--danger)' }}>Sisa Tagihan</div>
                    <div style={{ fontWeight: 600, fontSize: '18px', color: 'var(--danger)' }}>{formatCurrency(600000)}</div>
                  </div>
                </div>
              </div>

              <div>
                <h4 style={{ marginBottom: '16px' }}>Metode Pembayaran</h4>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '20px' }}>
                  {['Tunai', 'Kartu Debit', 'Kartu Kredit', 'Transfer Bank'].map((method) => (
                    <label
                      key={method}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '10px',
                        padding: '12px 16px',
                        border: '1px solid var(--line)',
                        borderRadius: 'var(--radius)',
                        cursor: 'pointer',
                      }}
                    >
                      <input type="radio" name="payment" style={{ width: '16px', height: '16px' }} />
                      <span>{method}</span>
                    </label>
                  ))}
                </div>

                <Input label="Jumlah Bayar" placeholder="Masukkan nominal" type="number" />

                <div style={{ marginTop: '24px', display: 'flex', gap: '12px' }}>
                  <Button variant="secondary" style={{ flex: 1 }}>
                    Cetak Kwitansi
                  </Button>
                  <Button style={{ flex: 1 }}>
                    Bayar
                  </Button>
                </div>
              </div>
            </div>
          </CardBody>
        </Card>
      </TabPanel>

      <TabPanel activeTab={activeTab} tabId="claims">
        <Card>
          <CardHeader>
            <h3 style={{ margin: 0 }}>Daftar Klaim</h3>
          </CardHeader>
          <CardBody>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {[
                { id: 'CLM001', payer: 'BPJS', patient: 'Ahmad Wijaya', amount: 1250000, status: 'pending' },
                { id: 'CLM002', payer: 'BPJS', patient: 'Dewi Lestari', amount: 500000, status: 'submitted' },
                { id: 'CLM003', payer: 'Asuransi TNI', patient: 'Budi Santoso', amount: 2100000, status: 'approved' },
                { id: 'CLM004', payer: 'BPJS', patient: 'Siti Rahayu', amount: 850000, status: 'rejected' },
              ].map((claim) => (
                <div
                  key={claim.id}
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
                    <div style={{ fontWeight: 600 }}>{claim.id}</div>
                    <div style={{ fontSize: '13px', color: 'var(--neutral)' }}>
                      {claim.patient} • {claim.payer}
                    </div>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <div style={{ fontWeight: 600 }}>{formatCurrency(claim.amount)}</div>
                    <Badge variant={claim.status === 'approved' ? 'success' : claim.status === 'rejected' ? 'danger' : 'warning'}>
                      {claim.status}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardBody>
        </Card>
      </TabPanel>
    </section>
  );
}
