export default async function StudyPage({ params }: { params: Promise<{ studyId: string }> }) {
  const { studyId } = await params;
  return <h1>Radiology Study {studyId}</h1>;
}
