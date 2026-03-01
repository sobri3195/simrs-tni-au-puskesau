export default async function PatientDetail({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return (
    <section>
      <h1>Detail Pasien {id}</h1>
      <p>Ringkasan klinis sticky + status triase + afiliasi kedinasan.</p>
    </section>
  );
}
