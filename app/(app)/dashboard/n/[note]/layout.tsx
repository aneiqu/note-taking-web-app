import NotePageLayout from "@/app/components/dashboard/Note/NotePageLayout";
import { getActiveNotes } from "@/utils/getNotes";

interface LayoutProps {
  children: React.ReactNode;
  params: Promise<{ note: string }>;
}

export default async function Layout({ children, params }: LayoutProps) {
  return (
    <NotePageLayout filteredNotes={getActiveNotes()} params={params} noteHref='/dashboard/n'>
      {children}
    </NotePageLayout>
  );
}
