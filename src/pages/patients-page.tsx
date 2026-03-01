import { Link } from 'react-router-dom';

const patients = [
  { id: 'P001', name: 'Andi Wijaya', triage: 'P2' },
  { id: 'P002', name: 'Rina Sari', triage: 'P1' }
];

export function PatientsPage() {
  return (
    <section>
      <h1>MPI Search Pasien</h1>
      <input placeholder="Cari NIK/MRN/Nama" aria-label="Cari pasien" style={{ width: 320 }} />
      <ul>
        {patients.map((p) => (
          <li key={p.id}>
            <Link to={`/patients/${p.id}`}>{p.name}</Link> - {p.triage}
          </li>
        ))}
      </ul>
    </section>
  );
}
