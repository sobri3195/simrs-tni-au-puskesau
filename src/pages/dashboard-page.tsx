import { Link } from 'react-router-dom';

const metrics = [
  { label: 'Kunjungan Hari Ini', value: '128', trend: '+14%' },
  { label: 'Antrian Aktif', value: '36', trend: '-5%' },
  { label: 'Bed Occupancy', value: '78%', trend: '+3%' }
];

const quickModules = [
  { title: 'Pendaftaran Cepat', desc: 'Buat kunjungan pasien baru dalam 1 alur.', href: '/registrations/new' },
  { title: 'EMR Rawat Jalan', desc: 'Catatan medis, resep, dan order terintegrasi.', href: '/emr/encounters/demo' },
  { title: 'Modul SIMRS', desc: 'Lihat seluruh modul administratif dan klinis.', href: '/simrs/modules' }
];

export function DashboardPage() {
  return (
    <section className="dashboard">
      <div className="hero-card">
        <p className="hero-kicker">Pusat Komando Digital Puskesau</p>
        <h1>SIMRS TNI AU • Ringkasan Operasional</h1>
        <p className="hero-desc">Pantau layanan klinis dan administratif dari satu dashboard yang lebih cepat, bersih, dan mudah dinavigasi.</p>
      </div>

      <div className="metrics-grid">
        {metrics.map((metric) => (
          <article key={metric.label} className="metric-card">
            <p>{metric.label}</p>
            <strong>{metric.value}</strong>
            <span>{metric.trend} dibanding kemarin</span>
          </article>
        ))}
      </div>

      <section>
        <h2 className="section-title">Akses Modul Cepat</h2>
        <div className="module-grid">
          {quickModules.map((module) => (
            <article key={module.title} className="module-card">
              <h3>{module.title}</h3>
              <p>{module.desc}</p>
              <Link to={module.href}>Buka modul →</Link>
            </article>
          ))}
        </div>
      </section>
    </section>
  );
}
