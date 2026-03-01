export function Topbar() {
  return (
    <header className="topbar">
      <div>
        <strong>Context Unit: IGD Komando</strong>
        <div className="topbar-subtitle">SIMRS Puskesau • Operasional Harian</div>
      </div>
      <div className="topbar-actions">
        <input className="topbar-search" placeholder="Cari menu / pasien cepat..." aria-label="Cari menu" />
        <span className="status-badge">Online & Sinkron</span>
      </div>
    </header>
  );
}
