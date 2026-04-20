import NotePageContent from "@/app/components/dashboard/Note/NotePageContent";
import NotePageLayout from "@/app/components/dashboard/Note/NotePageLayout";
import { getNotesByContent } from "@/utils/getNotes";

interface NotePageParams {
  params: Promise<{ note: string }>;
  searchParams: Promise<{ q?: string }>;
}

export default async function Note({ params, searchParams }: NotePageParams) {
  const resolvedSearchParams = await searchParams;
  const searchQuery = resolvedSearchParams.q ?? "";
  const filteredNotes = await getNotesByContent(searchQuery);
  const cancelHref = searchQuery
    ? `/dashboard/search?q=${encodeURIComponent(searchQuery)}`
    : "/dashboard/search";

  return (
    <NotePageLayout
      filteredNotes={filteredNotes}
      params={params}
      noteHref='/dashboard/search/n'
      cancelHref={cancelHref}
      searchParams={resolvedSearchParams}
    >
      <NotePageContent params={params} cancelHref={cancelHref} />
    </NotePageLayout>
  );
}
