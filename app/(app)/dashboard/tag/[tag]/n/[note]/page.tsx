import NotePageContent from "@/app/components/dashboard/Note/NotePageContent";

interface NotePageParams {
  params: Promise<{ note: string; tag: string }>;
}

export default async function Note({ params }: NotePageParams) {
  const { tag: tagSlug } = await params;

  return <NotePageContent params={params} cancelHref={`/dashboard/tag/${tagSlug}`} />;
}
