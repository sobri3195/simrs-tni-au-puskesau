import { Link } from 'react-router-dom';

const patients = [
  { id: 'P001', name: 'Andi Wijaya', triage: 'P2', clinic: 'Penyakit Dalam' },
  { id: 'P002', name: 'Rina Sari', triage: 'P1', clinic: 'IGD' },
  { id: 'P003', name: 'Dewi Lestari', triage: 'P3', clinic: 'Poli Gigi' }
];

export function PatientsPage() {
  return (
    <section>
      <div className="page-header-card">
        <h1>MPI Search Pasien</h1>
        <p>Cari pasien berdasarkan NIK, MRN, atau nama, lalu lanjutkan proses registrasi/layanan.</p>
      </div>

      <div className="search-panel">
        <input className="search-input" placeholder="Cari NIK/MRN/Nama" aria-label="Cari pasien" />
      </div>

      <div className="modules-table-wrap">
        <table className="modules-table">
          <thead>
            <tr>
              <th>ID Pasien</th>
              <th>Nama</th>
              <th>Unit</th>
              <th>Triage</th>
            </tr>
          </thead>
          <tbody>
            {patients.map((patient) => (
              <tr key={patient.id}>
                <td>{patient.id}</td>
                <td>
                  <Link className="table-link" to={`/patients/${patient.id}`}>
                    {patient.name}
                  </Link>
                </td>
                <td>{patient.clinic}</td>
                <td>
                  <span className="status-pill">{patient.triage}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
