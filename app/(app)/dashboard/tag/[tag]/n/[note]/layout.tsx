import NotePageLayout from "@/app/components/dashboard/Note/NotePageLayout";
import { getActiveNotesByTag } from "@/utils/getNotes";

interface LayoutProps {
  children: React.ReactNode;
  params: Promise<{ note: string; tag: string }>;
}

export default async function Layout({ children, params }: LayoutProps) {
  const { tag: tagSlug } = await params;
  return (
    <NotePageLayout
      filteredNotes={await getActiveNotesByTag(tagSlug)}
      params={params}
      noteHref={`/dashboard/tag/${tagSlug}/n`}
    >
      {children}
    </NotePageLayout>
  );
}
