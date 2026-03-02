import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardBody, MetricCard } from '@/components/ui/card';
import { Badge, TriageBadge, StatusBadge } from '@/components/ui/badge';
import { Tabs, TabPanel } from '@/components/ui/tabs';
import { Progress, CircularProgress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';

const metrics = [
  { title: 'Kunjungan Hari Ini', value: '128', trend: '+14%', trendDirection: 'up' as const, iconColor: 'blue' as const },
  { title: 'Antrian Aktif', value: '36', trend: '-5%', trendDirection: 'down' as const, iconColor: 'amber' as const },
  { title: 'Bed Occupancy', value: '78%', trend: '+3%', trendDirection: 'up' as const, iconColor: 'green' as const },
  { title: 'Pending Orders', value: '23', trend: '+8', trendDirection: 'up' as const, iconColor: 'red' as const },
];

const quickModules = [
  {
    title: 'Pendaftaran Cepat',
    desc: 'Buat kunjungan pasien baru dalam 1 alur terintegrasi.',
    href: '/registrations/new',
    icon: 'M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z M14 2v6h6 M12 18v-6 M9 15h6',
  },
  {
    title: 'EMR Rawat Jalan',
    desc: 'Catatan medis, resep, dan order terintegrasi untuk rawat jalan.',
    href: '/clinical/emr',
    icon: 'M9 12h6 M9 16h6 M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2 M16 3.13a4 4 0 0 1 0 7.75 M21 21v-2a4 4 0 0 0-3-3.87',
  },
  {
    title: 'IGD & Triase',
    desc: 'Manajemen pasien darurat dan penilaian triase cepat.',
    href: '/clinical/emergency',
    icon: 'M22 12h-4l-3 9L9 3l-3 9H2',
  },
  {
    title: 'Laboratorium',
    desc: 'Order dan hasil pemeriksaan laboratorium real-time.',
    href: '/lab',
    icon: 'M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z',
  },
];

const edQueue = [
  { id: 'P001', name: 'Ahmad Wijaya', age: 45, complaint: 'Nyeri dada', triage: 'P1' as const, status: 'Dalam penanganan' },
  { id: 'P002', name: 'Siti Rahayu', age: 32, complaint: 'Demam tinggi', triage: 'P2' as const, status: 'Menunggu' },
  { id: 'P003', name: 'Budi Santoso', age: 28, complaint: 'Luka robek', triage: 'P3' as const, status: 'Menunggu' },
  { id: 'P004', name: 'Dewi Lestari', age: 55, complaint: 'Sesak napas', triage: 'P1' as const, status: 'Dalam penanganan' },
  { id: 'P005', name: 'Rina Kusuma', age: 8, complaint: 'Muntah-muntah', triage: 'P2' as const, status: 'Menunggu' },
];

const recentActivities = [
  { id: 1, type: 'admission', message: 'Pasien P001 di-admit ke ruang ICU', time: '5 menit lalu' },
  { id: 2, type: 'lab', message: 'Hasil lab P002 tersedia', time: '15 menit lalu' },
  { id: 3, type: 'pharmacy', message: 'Resep P003 selesai diproses', time: '30 menit lalu' },
  { id: 4, type: 'discharge', message: 'Pasien P006 pulang', time: '1 jam lalu' },
];

const alerts = [
  { id: 1, title: 'Stock obat kritis', message: '5 item obat mencapai batas minimum', severity: 'warning' },
  { id: 2, title: 'Pending claim', message: '12 klaim menunggu verifikasi', severity: 'info' },
  { id: 3, title: 'Bed penuh ICU', message: 'Tingkat okupansi ICU 100%', severity: 'danger' },
];

export function DashboardPage() {
  const [activeTab, setActiveTab] = useState('overview');

  return (
    <section style={{ maxWidth: '1400px', margin: '0 auto' }}>
      {/* Hero Card */}
      <div
        className="hero-card"
        style={{
          background: 'linear-gradient(135deg, var(--airforce-blue) 0%, var(--airforce-dark) 100%)',
          color: 'white',
          padding: '32px',
          borderRadius: 'var(--radius-xl)',
          marginBottom: '24px',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <div
          style={{
            position: 'absolute',
            top: 0,
            right: 0,
            width: '400px',
            height: '100%',
            background: 'radial-gradient(circle at top right, rgba(255, 255, 255, 0.1), transparent 60%)',
          }}
        />
        <p
          style={{
            fontSize: '11px',
            textTransform: 'uppercase',
            letterSpacing: '0.1em',
            color: 'rgba(255, 255, 255, 0.7)',
            fontWeight: 600,
            marginBottom: '8px',
          }}
        >
          Pusat Komando Digital Puskesau
        </p>
        <h1 style={{ color: 'white', marginBottom: '8px', fontSize: '28px' }}>
          SIMRS TNI AU • Ringkasan Operasional
        </h1>
        <p style={{ color: 'rgba(255, 255, 255, 0.8)', maxWidth: '600px', margin: 0 }}>
          Pantau layanan klinis dan administratif dari satu dashboard yang lebih cepat, bersih, dan mudah dinavigasi.
        </p>
        <div style={{ display: 'flex', gap: '12px', marginTop: '20px' }}>
          <Button
            variant="secondary"
            onClick={() => window.print()}
            icon={
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M6 9V2h12v7 M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2 M6 14h12v8H6z" />
              </svg>
            }
          >
            Cetak Laporan
          </Button>
          <Button
            variant="ghost"
            style={{ background: 'rgba(255, 255, 255, 0.1)', color: 'white' }}
            icon={
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4 M7 10l5 5 5-5 M12 15V3" />
              </svg>
            }
          >
            Export Data
          </Button>
        </div>
      </div>

      {/* Metrics Grid */}
      <div
        className="metrics-grid"
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '16px',
          marginBottom: '24px',
        }}
      >
        {metrics.map((metric, index) => (
          <MetricCard
            key={index}
            title={metric.title}
            value={metric.value}
            trend={metric.trend}
            trendDirection={metric.trendDirection}
            iconColor={metric.iconColor}
            icon={
              index === 0 ? (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                  <circle cx="9" cy="7" r="4" />
                  <path d="M23 21v-2a4 4 0 0 0-3-3.87 M16 3.13a4 4 0 0 1 0 7.75" />
                </svg>
              ) : index === 1 ? (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="10" />
                  <polyline points="12 6 12 12 16 14" />
                </svg>
              ) : index === 2 ? (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                  <polyline points="9 22 9 12 15 12 15 22" />
                </svg>
              ) : (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                  <polyline points="14 2 14 8 20 8" />
                  <line x1="16" y1="13" x2="8" y2="13" />
                  <line x1="16" y1="17" x2="8" y2="17" />
                </svg>
              )
            }
          />
        ))}
      </div>

      {/* Tabs */}
      <Tabs
        tabs={[
          { id: 'overview', label: 'Ringkasan' },
          { id: 'ed-queue', label: 'Antrian IGD', count: 5 },
          { id: 'bed-status', label: 'Status Bed' },
          { id: 'alerts', label: 'Alert', count: 3 },
        ]}
        activeTab={activeTab}
        onChange={setActiveTab}
      />

      {/* Tab Panels */}
      <TabPanel activeTab={activeTab} tabId="overview">
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '16px',
          }}
        >
          {/* Quick Modules */}
          <div style={{ gridColumn: '1 / -1' }}>
            <h2 style={{ marginBottom: '16px', fontSize: '18px' }}>Akses Modul Cepat</h2>
            <div
              className="module-grid"
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
                gap: '16px',
              }}
            >
              {quickModules.map((module, index) => (
                <Card key={index} hover onClick={() => window.location.href = module.href}>
                  <CardBody>
                    <div
                      style={{
                        width: '48px',
                        height: '48px',
                        borderRadius: 'var(--radius)',
                        background: 'linear-gradient(135deg, var(--airforce-blue), var(--airforce-light))',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginBottom: '16px',
                        color: 'white',
                      }}
                    >
                      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d={module.icon} />
                      </svg>
                    </div>
                    <h3 style={{ marginBottom: '8px', fontSize: '16px' }}>{module.title}</h3>
                    <p style={{ fontSize: '13px', color: 'var(--fg-secondary)', minHeight: '40px' }}>
                      {module.desc}
                    </p>
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '6px',
                        marginTop: '12px',
                        color: 'var(--airforce-blue)',
                        fontWeight: 600,
                        fontSize: '14px',
                      }}
                    >
                      Buka modul
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M5 12h14 M12 5l7 7-7 7" />
                      </svg>
                    </div>
                  </CardBody>
                </Card>
              ))}
            </div>
          </div>

          {/* Recent Activity */}
          <Card>
            <CardBody>
              <h3 style={{ marginBottom: '16px', fontSize: '16px' }}>Aktivitas Terbaru</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {recentActivities.map((activity) => (
                  <div
                    key={activity.id}
                    style={{
                      display: 'flex',
                      alignItems: 'flex-start',
                      gap: '12px',
                      padding: '12px',
                      borderRadius: 'var(--radius)',
                      background: 'var(--surface-secondary)',
                    }}
                  >
                    <div
                      style={{
                        width: '32px',
                        height: '32px',
                        borderRadius: '50%',
                        background: activity.type === 'admission' ? 'var(--info-light)' : 
                                    activity.type === 'lab' ? 'var(--success-light)' :
                                    activity.type === 'pharmacy' ? 'var(--warning-light)' : 'var(--neutral-light)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: activity.type === 'admission' ? 'var(--info)' : 
                               activity.type === 'lab' ? 'var(--success)' :
                               activity.type === 'pharmacy' ? 'var(--warning)' : 'var(--neutral)',
                        flexShrink: 0,
                      }}
                    >
                      {activity.type === 'admission' && '🏥'}
                      {activity.type === 'lab' && '🧪'}
                      {activity.type === 'pharmacy' && '💊'}
                      {activity.type === 'discharge' && '🏠'}
                    </div>
                    <div style={{ flex: 1 }}>
                      <p style={{ margin: '0 0 2px', fontSize: '14px', color: 'var(--fg)' }}>
                        {activity.message}
                      </p>
                      <span style={{ fontSize: '12px', color: 'var(--neutral)' }}>{activity.time}</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardBody>
          </Card>

          {/* Alerts */}
          <Card>
            <CardBody>
              <h3 style={{ marginBottom: '16px', fontSize: '16px' }}>Peringatan Sistem</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {alerts.map((alert) => (
                  <div
                    key={alert.id}
                    style={{
                      padding: '14px',
                      borderRadius: 'var(--radius)',
                      background: alert.severity === 'danger' ? 'var(--danger-light)' :
                                  alert.severity === 'warning' ? 'var(--warning-light)' : 'var(--info-light)',
                      borderLeft: `4px solid ${alert.severity === 'danger' ? 'var(--danger)' :
                                              alert.severity === 'warning' ? 'var(--warning)' : 'var(--info)'}`,
                    }}
                  >
                    <div style={{ fontWeight: 600, fontSize: '14px', marginBottom: '4px', 
                      color: alert.severity === 'danger' ? 'var(--danger)' :
                             alert.severity === 'warning' ? '#92400e' : 'var(--info)' }}>
                      {alert.title}
                    </div>
                    <p style={{ margin: 0, fontSize: '13px', color: 'var(--fg-secondary)' }}>
                      {alert.message}
                    </p>
                  </div>
                ))}
              </div>
            </CardBody>
          </Card>
        </div>
      </TabPanel>

      <TabPanel activeTab={activeTab} tabId="ed-queue">
        <Card>
          <CardBody>
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '20px',
              }}
            >
              <h3 style={{ margin: 0 }}>Antrian IGD</h3>
              <div style={{ display: 'flex', gap: '8px' }}>
                <Badge variant="danger">P1: 2</Badge>
                <Badge variant="warning">P2: 2</Badge>
                <Badge variant="success">P3: 1</Badge>
              </div>
            </div>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
                gap: '16px',
              }}
            >
              {edQueue.map((patient) => (
                <div
                  key={patient.id}
                  style={{
                    padding: '16px',
                    borderRadius: 'var(--radius-lg)',
                    border: '1px solid var(--line)',
                    background: patient.triage === 'P1' ? 'rgba(220, 38, 38, 0.04)' : 'white',
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
                    <div>
                      <h4 style={{ margin: '0 0 4px', fontSize: '15px' }}>{patient.name}</h4>
                      <p style={{ margin: 0, fontSize: '12px', color: 'var(--neutral)' }}>
                        {patient.id} • {patient.age} tahun
                      </p>
                    </div>
                    <TriageBadge level={patient.triage} />
                  </div>
                  <p style={{ margin: '0 0 12px', fontSize: '13px', color: 'var(--fg-secondary)' }}>
                    <strong>Keluhan:</strong> {patient.complaint}
                  </p>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Badge variant={patient.status === 'Dalam penanganan' ? 'success' : 'neutral'}>
                      {patient.status}
                    </Badge>
                    <Button size="sm" variant="ghost">
                      Lihat Detail
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardBody>
        </Card>
      </TabPanel>

      <TabPanel activeTab={activeTab} tabId="bed-status">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '16px' }}>
          {[
            { ward: 'ICU', total: 10, occupied: 10, critical: true },
            { ward: 'Rawat Inap A', total: 30, occupied: 24 },
            { ward: 'Rawat Inap B', total: 25, occupied: 18 },
            { ward: 'IGD', total: 15, occupied: 8 },
            { ward: 'Isolasi', total: 8, occupied: 3 },
            { ward: 'NICU', total: 6, occupied: 5 },
          ].map((ward, index) => (
            <Card key={index}>
              <CardBody>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
                  <div>
                    <h3 style={{ margin: '0 0 4px', fontSize: '15px' }}>{ward.ward}</h3>
                    <p style={{ margin: 0, fontSize: '13px', color: 'var(--neutral)' }}>
                      {ward.occupied} / {ward.total} bed terisi
                    </p>
                  </div>
                  {ward.critical && <Badge variant="danger">Penuh</Badge>}
                </div>
                <Progress
                  value={ward.occupied}
                  max={ward.total}
                  variant={ward.occupied / ward.total > 0.9 ? 'danger' : ward.occupied / ward.total > 0.7 ? 'warning' : 'primary'}
                  showLabel
                />
              </CardBody>
            </Card>
          ))}
        </div>
      </TabPanel>

      <TabPanel activeTab={activeTab} tabId="alerts">
        <Card>
          <CardBody>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {alerts.map((alert) => (
                <div
                  key={alert.id}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '16px',
                    borderRadius: 'var(--radius)',
                    border: '1px solid var(--line)',
                    background: alert.severity === 'danger' ? 'var(--danger-light)' :
                                alert.severity === 'warning' ? 'var(--warning-light)' : 'var(--info-light)',
                  }}
                >
                  <div>
                    <h4 style={{ margin: '0 0 4px', fontSize: '15px' }}>{alert.title}</h4>
                    <p style={{ margin: 0, fontSize: '13px', color: 'var(--fg-secondary)' }}>{alert.message}</p>
                  </div>
                  <div style={{ display: 'flex', gap: '8px' }}>
                    <Button size="sm" variant="secondary">Detail</Button>
                    <Button size="sm" variant="ghost">Abaikan</Button>
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
