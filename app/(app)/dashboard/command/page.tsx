import { BreakGlassModal } from '@/components/security/break-glass-modal';

const kpis = [
  { label: 'IGD Waiting', value: 12, status: 'urgent' },
  { label: 'Lab Pending', value: 27, status: 'normal' },
  { label: 'Blocked Orders', value: 3, status: 'blocked' }
];

export default function CommandDashboardPage() {
  return (
    <section>
      <h1>Dashboard Komando</h1>
      <p>Mode command center: cepat, aman, terarah, dan tahan gangguan 24/7.</p>
      <div style={{ display: 'grid', gap: 12, gridTemplateColumns: 'repeat(3, minmax(0, 1fr))', margin: '12px 0' }}>
        {kpis.map((kpi) => (
          <article key={kpi.label} style={{ background: 'white', borderRadius: 8, padding: 12, border: '1px solid #e2e8f0' }}>
            <div style={{ color: '#64748b' }}>{kpi.label}</div>
            <strong style={{ fontSize: 28 }}>{kpi.value}</strong>
            <div>Status: {kpi.status}</div>
          </article>
        ))}
      </div>
      <BreakGlassModal />
    </section>
  );
}
