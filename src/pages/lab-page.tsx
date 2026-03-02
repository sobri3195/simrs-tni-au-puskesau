import React, { useState } from 'react';
import { Card, CardBody, CardHeader } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge, StatusBadge, TriageBadge } from '@/components/ui/badge';
import { Tabs, TabPanel } from '@/components/ui/tabs';
import { Avatar } from '@/components/ui/avatar';
import { Progress } from '@/components/ui/progress';
import { Table, TableHeader } from '@/components/ui/table';

const labOrders = [
  { id: 'LAB001', patientName: 'Ahmad Wijaya', patientId: 'P001', orderDate: '2024-01-15 08:30', tests: ['Darah Lengkap', 'Kimia Darah'], status: 'pending', priority: 'urgent' },
  { id: 'LAB002', patientName: 'Siti Rahayu', patientId: 'P002', orderDate: '2024-01-15 08:45', tests: ['Urine Lengkap'], status: 'in-progress', priority: 'normal' },
  { id: 'LAB003', patientName: 'Budi Santoso', patientId: 'P003', orderDate: '2024-01-15 09:00', tests: ['Faeces', 'Darah Lengkap'], status: 'completed', priority: 'normal' },
  { id: 'LAB004', patientName: 'Dewi Lestari', patientId: 'P004', orderDate: '2024-01-15 09:15', tests: ['Troponin', 'D-Dimer', 'BNP'], status: 'pending', priority: 'critical' },
  { id: 'LAB005', patientName: 'Rina Kusuma', patientId: 'P005', orderDate: '2024-01-15 09:30', tests: ['Elektrolit', 'GDS'], status: 'validated', priority: 'normal' },
];

const testResults = [
  { test: 'Hemoglobin', value: '13.5', unit: 'g/dL', refRange: '12.0 - 16.0', flag: 'normal' },
  { test: 'Leukosit', value: '8.2', unit: 'x10³/µL', refRange: '4.0 - 11.0', flag: 'normal' },
  { test: 'Trombosit', value: '95', unit: 'x10³/µL', refRange: '150 - 400', flag: 'low' },
  { test: 'Hematokrit', value: '40', unit: '%', refRange: '36 - 48', flag: 'normal' },
  { test: 'Eritrosit', value: '4.5', unit: 'x10⁶/µL', refRange: '4.0 - 5.5', flag: 'normal' },
  { test: 'MCV', value: '89', unit: 'fL', refRange: '80 - 100', flag: 'normal' },
];

const statistics = [
  { label: 'Total Order Hari Ini', value: 48 },
  { label: 'Pending', value: 12 },
  { label: 'In Progress', value: 8 },
  { label: 'Selesai', value: 28 },
  { label: 'Critical Value', value: 3 },
];

export function LabPage() {
  const [activeTab, setActiveTab] = useState('worklist');
  const [searchQuery, setSearchQuery] = useState('');

  const getStatusBadge = (status: string) => {
    const statusMap: Record<string, { variant: 'warning' | 'info' | 'success' | 'neutral'; label: string }> = {
      pending: { variant: 'warning', label: 'Menunggu' },
      'in-progress': { variant: 'info', label: 'Diproses' },
      completed: { variant: 'success', label: 'Selesai' },
      validated: { variant: 'success', label: 'Tervalidasi' },
    };
    const { variant, label } = statusMap[status] || { variant: 'neutral', label: status };
    return <Badge variant={variant}>{label}</Badge>;
  };

  const getPriorityBadge = (priority: string) => {
    if (priority === 'critical') return <Badge variant="danger">Kritis</Badge>;
    if (priority === 'urgent') return <Badge variant="warning">Urgent</Badge>;
    return null;
  };

  return (
    <section style={{ maxWidth: '1400px', margin: '0 auto' }}>
      {/* Page Header */}
      <div className="page-header-card" style={{ marginBottom: '24px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <div>
            <h1 style={{ marginBottom: '8px' }}>Laboratorium</h1>
            <p style={{ margin: 0, color: 'var(--fg-secondary)' }}>
              Kelola order lab, hasil pemeriksaan, dan validasi.
            </p>
          </div>
          <div style={{ display: 'flex', gap: '12px' }}>
            <Button variant="secondary">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ marginRight: '8px' }}>
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4 M7 10l5 5 5-5 M12 15V3" />
              </svg>
              Export
            </Button>
            <Button>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ marginRight: '8px' }}>
                <line x1="12" y1="5" x2="12" y2="19" />
                <line x1="5" y1="12" x2="19" y2="12" />
              </svg>
              Order Baru
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
        {statistics.map((stat, index) => (
          <Card key={index}>
            <CardBody style={{ textAlign: 'center', padding: '16px' }}>
              <div style={{ fontSize: '28px', fontWeight: 700, color: index === 4 ? 'var(--danger)' : 'var(--fg)' }}>
                {stat.value}
              </div>
              <div style={{ fontSize: '12px', color: 'var(--neutral)' }}>{stat.label}</div>
            </CardBody>
          </Card>
        ))}
      </div>

      {/* Tabs */}
      <Tabs
        tabs={[
          { id: 'worklist', label: 'Worklist Order', count: labOrders.filter(o => o.status === 'pending' || o.status === 'in-progress').length },
          { id: 'results', label: 'Hasil Pemeriksaan' },
          { id: 'validation', label: 'Validasi', count: labOrders.filter(o => o.status === 'completed').length },
          { id: 'critical', label: 'Critical Value', count: 3 },
        ]}
        activeTab={activeTab}
        onChange={setActiveTab}
      />

      <TabPanel activeTab={activeTab} tabId="worklist">
        <Card>
          <TableHeader
            title="Daftar Order Lab"
            search={{ value: searchQuery, onChange: setSearchQuery, placeholder: 'Cari order...' }}
            action={
              <Button size="sm" variant="secondary">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" />
                </svg>
                Filter
              </Button>
            }
          />
          <CardBody style={{ padding: 0 }}>
            <table className="table" style={{ width: '100%' }}>
              <thead>
                <tr>
                  <th style={{ padding: '12px 16px', borderBottom: '1px solid var(--line)' }}>No. Order</th>
                  <th style={{ padding: '12px 16px', borderBottom: '1px solid var(--line)' }}>Pasien</th>
                  <th style={{ padding: '12px 16px', borderBottom: '1px solid var(--line)' }}>Pemeriksaan</th>
                  <th style={{ padding: '12px 16px', borderBottom: '1px solid var(--line)' }}>Prioritas</th>
                  <th style={{ padding: '12px 16px', borderBottom: '1px solid var(--line)' }}>Status</th>
                  <th style={{ padding: '12px 16px', borderBottom: '1px solid var(--line)' }}>Waktu</th>
                  <th style={{ padding: '12px 16px', borderBottom: '1px solid var(--line)' }}>Aksi</th>
                </tr>
              </thead>
              <tbody>
                {labOrders
                  .filter(o => o.status === 'pending' || o.status === 'in-progress')
                  .map((order) => (
                    <tr key={order.id}>
                      <td style={{ padding: '12px 16px' }}>
                        <span style={{ fontWeight: 600, color: 'var(--airforce-blue)' }}>{order.id}</span>
                      </td>
                      <td style={{ padding: '12px 16px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                          <Avatar name={order.patientName} size="sm" />
                          <div>
                            <div style={{ fontWeight: 500 }}>{order.patientName}</div>
                            <div style={{ fontSize: '12px', color: 'var(--neutral)' }}>{order.patientId}</div>
                          </div>
                        </div>
                      </td>
                      <td style={{ padding: '12px 16px' }}>
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px' }}>
                          {order.tests.map((test, i) => (
                            <span
                              key={i}
                              style={{
                                padding: '2px 8px',
                                background: 'var(--bg-secondary)',
                                borderRadius: 'var(--radius-full)',
                                fontSize: '12px',
                              }}
                            >
                              {test}
                            </span>
                          ))}
                        </div>
                      </td>
                      <td style={{ padding: '12px 16px' }}>{getPriorityBadge(order.priority)}</td>
                      <td style={{ padding: '12px 16px' }}>{getStatusBadge(order.status)}</td>
                      <td style={{ padding: '12px 16px' }}>
                        <span style={{ fontSize: '13px', color: 'var(--neutral)' }}>{order.orderDate.split(' ')[1]}</span>
                      </td>
                      <td style={{ padding: '12px 16px' }}>
                        <div style={{ display: 'flex', gap: '8px' }}>
                          <Button size="sm" variant="primary">Proses</Button>
                          <Button size="sm" variant="ghost">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                              <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                              <circle cx="12" cy="12" r="3" />
                            </svg>
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </CardBody>
        </Card>
      </TabPanel>

      <TabPanel activeTab={activeTab} tabId="results">
        <Card>
          <CardHeader>
            <h3 style={{ margin: 0 }}>Hasil Pemeriksaan - LAB003</h3>
          </CardHeader>
          <CardBody>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px' }}>
              <Avatar name="Budi Santoso" size="lg" />
              <div>
                <div style={{ fontWeight: 600, fontSize: '16px' }}>Budi Santoso</div>
                <div style={{ fontSize: '13px', color: 'var(--neutral)' }}>P003 • 28 tahun • Laki-laki</div>
              </div>
              <Badge variant="success">Selesai</Badge>
            </div>

            <h4 style={{ marginBottom: '12px' }}>Darah Lengkap</h4>
            <table className="table" style={{ width: '100%', marginBottom: '24px' }}>
              <thead>
                <tr>
                  <th style={{ padding: '12px 16px', borderBottom: '1px solid var(--line)' }}>Pemeriksaan</th>
                  <th style={{ padding: '12px 16px', borderBottom: '1px solid var(--line)' }}>Hasil</th>
                  <th style={{ padding: '12px 16px', borderBottom: '1px solid var(--line)' }}>Satuan</th>
                  <th style={{ padding: '12px 16px', borderBottom: '1px solid var(--line)' }}>Nilai Normal</th>
                  <th style={{ padding: '12px 16px', borderBottom: '1px solid var(--line)' }}>Keterangan</th>
                </tr>
              </thead>
              <tbody>
                {testResults.map((result, index) => (
                  <tr key={index}>
                    <td style={{ padding: '12px 16px' }}>{result.test}</td>
                    <td style={{ padding: '12px 16px', fontWeight: 600, color: result.flag === 'low' ? 'var(--danger)' : 'var(--fg)' }}>
                      {result.value}
                    </td>
                    <td style={{ padding: '12px 16px' }}>{result.unit}</td>
                    <td style={{ padding: '12px 16px' }}>{result.refRange}</td>
                    <td style={{ padding: '12px 16px' }}>
                      {result.flag === 'low' && <Badge variant="danger">Low</Badge>}
                      {result.flag === 'high' && <Badge variant="danger">High</Badge>}
                      {result.flag === 'normal' && <Badge variant="success">Normal</Badge>}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px' }}>
              <Button variant="secondary">Cetak Hasil</Button>
              <Button>Kirim ke EMR</Button>
            </div>
          </CardBody>
        </Card>
      </TabPanel>

      <TabPanel activeTab={activeTab} tabId="validation">
        <Card>
          <CardHeader>
            <h3 style={{ margin: 0 }}>Antrian Validasi</h3>
          </CardHeader>
          <CardBody>
            <p style={{ color: 'var(--neutral)', marginBottom: '20px' }}>
              {labOrders.filter(o => o.status === 'completed').length} hasil menunggu validasi.
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {labOrders.filter(o => o.status === 'completed').map((order) => (
                <div
                  key={order.id}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '16px',
                    border: '1px solid var(--line)',
                    borderRadius: 'var(--radius)',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <Avatar name={order.patientName} />
                    <div>
                      <div style={{ fontWeight: 600 }}>{order.patientName}</div>
                      <div style={{ fontSize: '13px', color: 'var(--neutral)' }}>
                        {order.tests.join(', ')}
                      </div>
                    </div>
                  </div>
                  <div style={{ display: 'flex', gap: '8px' }}>
                    <Button size="sm" variant="secondary">Review</Button>
                    <Button size="sm">Validasi</Button>
                  </div>
                </div>
              ))}
            </div>
          </CardBody>
        </Card>
      </TabPanel>

      <TabPanel activeTab={activeTab} tabId="critical">
        <Card>
          <CardHeader>
            <h3 style={{ margin: 0, color: 'var(--danger)' }}>⚠️ Critical Value Alert</h3>
          </CardHeader>
          <CardBody>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {[
                { patient: 'Ahmad Wijaya', test: 'Troponin', value: '15.2 ng/mL', normal: '< 0.4', time: '08:45' },
                { patient: 'Dewi Lestari', test: 'Kalium', value: '6.8 mmol/L', normal: '3.5 - 5.0', time: '09:10' },
                { patient: 'Hendra P.', test: 'GDS', value: '450 mg/dL', normal: '< 200', time: '09:25' },
              ].map((item, index) => (
                <div
                  key={index}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '16px',
                    background: 'var(--danger-light)',
                    border: '1px solid var(--danger-border)',
                    borderRadius: 'var(--radius)',
                  }}
                >
                  <div>
                    <div style={{ fontWeight: 600 }}>{item.patient}</div>
                    <div style={{ fontSize: '13px', color: 'var(--danger)' }}>
                      {item.test}: <strong>{item.value}</strong> (Normal: {item.normal})
                    </div>
                    <div style={{ fontSize: '12px', color: 'var(--neutral)' }}>{item.time}</div>
                  </div>
                  <div style={{ display: 'flex', gap: '8px' }}>
                    <Button size="sm" variant="danger">Notify Dokter</Button>
                    <Button size="sm" variant="secondary">Ack</Button>
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
