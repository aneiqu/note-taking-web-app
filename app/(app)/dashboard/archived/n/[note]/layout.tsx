import NotePageLayout from "@/app/components/dashboard/Note/NotePageLayout";
import { getActiveNotes, getArchivedNotes } from "@/utils/getNotes";

interface LayoutProps {
  children: React.ReactNode;
  params: Promise<{ note: string }>;
}

export default async function Layout({ children, params }: LayoutProps) {
  return (
    <NotePageLayout
      filteredNotes={await getArchivedNotes()}
      params={params}
      noteHref='/dashboard/archived/n'
    >
      {children}
    </NotePageLayout>
  );
}
