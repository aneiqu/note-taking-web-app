import NotePageContent from "@/app/components/dashboard/Note/NotePageContent";

interface NotePageParams {
  params: Promise<{ note: string; tag: string }>;
}

export default async function Note({ params }: NotePageParams) {
  return <NotePageContent params={params} />;
}
