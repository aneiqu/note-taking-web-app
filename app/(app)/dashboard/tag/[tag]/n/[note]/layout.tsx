import NotePageLayout from "@/app/components/dashboard/Note/NotePageLayout";
import { filterTags } from "@/utils/filterTags";

interface LayoutProps {
  children: React.ReactNode;
  params: Promise<{ note: string; tag: string }>;
}

export default async function Layout({ children, params }: LayoutProps) {
  const { tag } = await params;
  return (
    <NotePageLayout
      filteredNotes={filterTags(tag)}
      params={params}
      noteHref={`/dashboard/tag/${encodeURIComponent(tag)}/n`}
    >
      {children}
    </NotePageLayout>
  );
}
