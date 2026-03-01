export default async function LabResultPage({ params }: { params: Promise<{ resultId: string }> }) {
  const { resultId } = await params;
  return <h1>Lab Result {resultId}</h1>;
}
