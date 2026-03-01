const modules = [
  { name: 'Master Pasien (MPI)', category: 'Administrasi', status: 'Aktif' },
  { name: 'Registrasi & Admit', category: 'Administrasi', status: 'Aktif' },
  { name: 'EMR & CPOE', category: 'Klinis', status: 'Aktif' },
  { name: 'Laboratorium', category: 'Penunjang', status: 'Aktif' },
  { name: 'Radiologi', category: 'Penunjang', status: 'Aktif' },
  { name: 'Farmasi', category: 'Penunjang', status: 'Dalam peningkatan' },
  { name: 'Billing & Klaim', category: 'Keuangan', status: 'Aktif' },
  { name: 'Logistik & Gudang', category: 'Operasional', status: 'Aktif' }
];

export function SimrsModulesPage() {
  return (
    <section>
      <div className="page-header-card">
        <h1>Modul SIMRS</h1>
        <p>Daftar modul utama SIMRS untuk mendukung layanan Puskesau secara end-to-end.</p>
      </div>

      <div className="modules-table-wrap">
        <table className="modules-table">
          <thead>
            <tr>
              <th>Nama Modul</th>
              <th>Kategori</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {modules.map((module) => (
              <tr key={module.name}>
                <td>{module.name}</td>
                <td>{module.category}</td>
                <td>
                  <span className={`status-pill${module.status === 'Aktif' ? ' is-active' : ''}`}>{module.status}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
