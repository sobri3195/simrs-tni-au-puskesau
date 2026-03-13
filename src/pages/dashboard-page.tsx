import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardBody, MetricCard } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabPanel } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';

const commandMetrics = [
  { title: 'Total Pasien Aktif', value: '12.430', trend: '+4.2%', trendDirection: 'up' as const, iconColor: 'blue' as const },
  { title: 'Logistik Nasional Tersedia', value: '86%', trend: '-2%', trendDirection: 'down' as const, iconColor: 'amber' as const },
  { title: 'Rata-rata BOR Nasional', value: '74%', trend: '+3%', trendDirection: 'up' as const, iconColor: 'green' as const },
  { title: 'Distribusi Berjalan', value: '48', trend: '+6', trendDirection: 'up' as const, iconColor: 'red' as const },
];

const faskesMetrics = [
  { title: 'Pasien Hari Ini', value: '167', trend: '+9%', trendDirection: 'up' as const, iconColor: 'blue' as const },
  { title: 'Rata-rata Waktu Tunggu', value: '28m', trend: '-6m', trendDirection: 'down' as const, iconColor: 'green' as const },
  { title: 'Item Stok Kritis', value: '11', trend: '+2', trendDirection: 'up' as const, iconColor: 'amber' as const },
  { title: 'Resep Menunggu Racik', value: '14', trend: '+3', trendDirection: 'up' as const, iconColor: 'red' as const },
];

const readinessRows = [
  { rs: 'RSAU dr. Esnawan Antariksa', bor: 82, igd: 'Padat', operasi: 2, ambulans: 4 },
  { rs: 'RSAU dr. M. Salamun', bor: 76, igd: 'Normal', operasi: 3, ambulans: 5 },
  { rs: 'RSAU dr. S. Hardjolukito', bor: 69, igd: 'Normal', operasi: 1, ambulans: 3 },
  { rs: 'RSAU dr. Efram Harsana', bor: 88, igd: 'Sangat Padat', operasi: 0, ambulans: 2 },
];

const sdmComposition = [
  { role: 'Dokter', value: 28 },
  { role: 'Perawat', value: 44 },
  { role: 'Farmasi', value: 12 },
  { role: 'Analis Lab', value: 9 },
  { role: 'Tenaga Lain', value: 7 },
];

const logisticsTrend = [
  { month: 'Jan', value: 79 },
  { month: 'Feb', value: 82 },
  { month: 'Mar', value: 76 },
  { month: 'Apr', value: 88 },
  { month: 'Mei', value: 91 },
  { month: 'Jun', value: 86 },
];

const criticalAlerts = [
  { title: 'Kebutuhan Darah O-', source: 'RSAU dr. Efram Harsana', severity: 'danger', detail: 'Permintaan 6 kantong dalam < 2 jam' },
  { title: 'Kapasitas ICU penuh', source: 'RSAU dr. Esnawan Antariksa', severity: 'warning', detail: 'BOR ICU 100%, tunggu 3 pasien IGD' },
  { title: 'Ventilator perlu kalibrasi', source: 'RSAU dr. M. Salamun', severity: 'info', detail: '2 unit due kalibrasi hari ini' },
];

const quickModules = [
  { title: 'Pendaftaran', href: '/registrations/new' },
  { title: 'IGD', href: '/clinical/emergency' },
  { title: 'Rawat Inap', href: '/clinical/inpatient' },
  { title: 'Farmasi', href: '/pharmacy' },
  { title: 'Laboratorium', href: '/lab' },
  { title: 'Bank Darah', href: '/blood-bank' },
];

const faskesTasks = [
  { task: '7 resep menunggu disiapkan > 20 menit', priority: 'Tinggi' },
  { task: '3 pasien IGD menunggu triase ulang', priority: 'Tinggi' },
  { task: '2 alat CSSD selesai sterilisasi, butuh verifikasi', priority: 'Sedang' },
  { task: '4 hasil lab siap validasi DPJP', priority: 'Sedang' },
];

export function DashboardPage() {
  const [activeTab, setActiveTab] = useState('command');

  const metrics = activeTab === 'command' ? commandMetrics : faskesMetrics;

  return (
    <section style={{ maxWidth: '1400px', margin: '0 auto' }}>
      <div className="hero-card" style={{ background: 'linear-gradient(135deg, var(--airforce-blue) 0%, var(--airforce-dark) 100%)', color: 'white', padding: '28px', borderRadius: 'var(--radius-xl)', marginBottom: '24px' }}>
        <p style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'rgba(255,255,255,.75)', fontWeight: 700, marginBottom: '8px' }}>Dashboard Komando Terintegrasi</p>
        <h1 style={{ color: 'white', margin: 0, marginBottom: '8px' }}>SIMRS TNI AU • Dasbor Pusat & Operasional Faskes</h1>
        <p style={{ margin: 0, color: 'rgba(255,255,255,.85)', maxWidth: '760px' }}>Pemantauan nasional, kesiapan RS, analitik SDM/logistik, serta kontrol operasional harian faskes dalam satu layar kerja.</p>
        <div style={{ display: 'flex', gap: '10px', marginTop: '16px', flexWrap: 'wrap' }}>
          <Button variant="secondary" onClick={() => window.print()}>Cetak Ringkasan</Button>
          <Link to="/simrs/modules"><Button variant="ghost" style={{ background: 'rgba(255,255,255,0.1)', color: 'white' }}>Lihat Semua Modul</Button></Link>
        </div>
      </div>

      <Tabs
        tabs={[
          { id: 'command', label: 'Dasbor Pusat' },
          { id: 'faskes', label: 'Dasbor Faskes' },
        ]}
        activeTab={activeTab}
        onChange={setActiveTab}
      />

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(210px, 1fr))', gap: '16px', marginBottom: '24px' }}>
        {metrics.map((metric) => (
          <MetricCard key={metric.title} title={metric.title} value={metric.value} trend={metric.trend} trendDirection={metric.trendDirection} iconColor={metric.iconColor} />
        ))}
      </div>

      <TabPanel activeTab={activeTab} tabId="command">
        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '16px' }}>
          <Card>
            <CardBody>
              <h3 style={{ marginTop: 0 }}>Status Kesiapan RS (Real-time)</h3>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px' }}>
                <thead>
                  <tr style={{ textAlign: 'left', borderBottom: '1px solid var(--line)' }}>
                    <th style={{ padding: '8px 6px' }}>Rumah Sakit</th><th style={{ padding: '8px 6px' }}>BOR</th><th style={{ padding: '8px 6px' }}>Status IGD</th><th style={{ padding: '8px 6px' }}>Ruang Operasi</th><th style={{ padding: '8px 6px' }}>Ambulans</th>
                  </tr>
                </thead>
                <tbody>
                  {readinessRows.map((row) => (
                    <tr key={row.rs} style={{ borderBottom: '1px solid var(--line)' }}>
                      <td style={{ padding: '8px 6px' }}>{row.rs}</td>
                      <td style={{ padding: '8px 6px', minWidth: 100 }}><Progress value={row.bor} size="sm" showLabel /></td>
                      <td style={{ padding: '8px 6px' }}><Badge variant={row.igd === 'Sangat Padat' ? 'danger' : row.igd === 'Padat' ? 'warning' : 'success'}>{row.igd}</Badge></td>
                      <td style={{ padding: '8px 6px' }}>{row.operasi} tersedia</td>
                      <td style={{ padding: '8px 6px' }}>{row.ambulans} siaga</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </CardBody>
          </Card>

          <Card>
            <CardBody>
              <h3 style={{ marginTop: 0 }}>Notifikasi & Peringatan Penting</h3>
              <div style={{ display: 'grid', gap: '10px' }}>
                {criticalAlerts.map((alert) => (
                  <div key={alert.title} style={{ padding: '10px', border: '1px solid var(--line)', borderRadius: '10px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', gap: '8px' }}>
                      <strong>{alert.title}</strong>
                      <Badge variant={alert.severity === 'danger' ? 'danger' : alert.severity === 'warning' ? 'warning' : 'info'}>{alert.source}</Badge>
                    </div>
                    <p style={{ marginBottom: 0, color: 'var(--fg-secondary)', fontSize: '12px' }}>{alert.detail}</p>
                  </div>
                ))}
              </div>
            </CardBody>
          </Card>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginTop: '16px' }}>
          <Card>
            <CardBody>
              <h3 style={{ marginTop: 0 }}>Analitik Komposisi SDM Kesehatan</h3>
              {sdmComposition.map((item) => (
                <div key={item.role} style={{ marginBottom: '10px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px' }}><span>{item.role}</span><strong>{item.value}%</strong></div>
                  <Progress value={item.value} size="sm" />
                </div>
              ))}
            </CardBody>
          </Card>
          <Card>
            <CardBody>
              <h3 style={{ marginTop: 0 }}>Tren Ketersediaan Logistik 6 Bulan</h3>
              {logisticsTrend.map((item) => (
                <div key={item.month} style={{ marginBottom: '10px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px' }}><span>{item.month}</span><strong>{item.value}%</strong></div>
                  <Progress value={item.value} size="sm" />
                </div>
              ))}
            </CardBody>
          </Card>
        </div>
      </TabPanel>

      <TabPanel activeTab={activeTab} tabId="faskes">
        <div style={{ display: 'grid', gridTemplateColumns: '1.3fr 1fr', gap: '16px' }}>
          <Card>
            <CardBody>
              <h3 style={{ marginTop: 0 }}>Akses Cepat Modul Operasional</h3>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
                {quickModules.map((module) => (
                  <Link key={module.title} to={module.href}>
                    <Button size="sm" variant="secondary">{module.title}</Button>
                  </Link>
                ))}
              </div>
              <h3 style={{ marginTop: '20px' }}>Tugas & Notifikasi Penting</h3>
              <div style={{ display: 'grid', gap: '10px' }}>
                {faskesTasks.map((item) => (
                  <div key={item.task} style={{ display: 'flex', justifyContent: 'space-between', border: '1px solid var(--line)', borderRadius: '10px', padding: '10px 12px', gap: '12px' }}>
                    <span style={{ fontSize: '13px' }}>{item.task}</span>
                    <Badge variant={item.priority === 'Tinggi' ? 'danger' : 'warning'}>{item.priority}</Badge>
                  </div>
                ))}
              </div>
            </CardBody>
          </Card>
          <Card>
            <CardBody>
              <h3 style={{ marginTop: 0 }}>Status Pelayanan Lokal</h3>
              <div style={{ display: 'grid', gap: '10px' }}>
                <div><div style={{ display: 'flex', justifyContent: 'space-between' }}><span>Antrean Poli Umum</span><strong>18 pasien</strong></div><Progress value={72} size="sm" /></div>
                <div><div style={{ display: 'flex', justifyContent: 'space-between' }}><span>Bed Rawat Inap Terisi</span><strong>81%</strong></div><Progress value={81} size="sm" /></div>
                <div><div style={{ display: 'flex', justifyContent: 'space-between' }}><span>Waktu Tunggu Farmasi</span><strong>24 menit</strong></div><Progress value={60} size="sm" /></div>
                <div><div style={{ display: 'flex', justifyContent: 'space-between' }}><span>Order Lab Belum Divalidasi</span><strong>9 order</strong></div><Progress value={45} size="sm" /></div>
              </div>
            </CardBody>
          </Card>
        </div>
      </TabPanel>
    </section>
  );
}
