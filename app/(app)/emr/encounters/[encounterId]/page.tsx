export default async function EncounterPage({ params }: { params: Promise<{ encounterId: string }> }) {
  const { encounterId } = await params;
  return (
    <section>
      <h1>EMR Encounter {encounterId}</h1>
      <p>SOAP quick entry, CPOE, med rec, dan tren vital.</p>
    </section>
  );
}
