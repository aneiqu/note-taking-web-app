import { getActiveNotes } from "@/app/actions/notes";
import NotePageLayout from "@/app/components/dashboard/Note/NotePageLayout";

interface LayoutProps {
  children: React.ReactNode;
  params: Promise<{ note: string }>;
}

export default async function Layout({ children, params }: LayoutProps) {
  return (
    <NotePageLayout filteredNotes={await getActiveNotes()} params={params} noteHref='/dashboard/n'>
      {children}
    </NotePageLayout>
  );
}
