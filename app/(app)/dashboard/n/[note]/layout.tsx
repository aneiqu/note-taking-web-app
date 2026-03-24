import NotePageLayout from "@/app/components/dashboard/Note/NotePageLayout";
import { filterArchieved } from "@/utils/filterArchieved";

interface LayoutProps {
  children: React.ReactNode;
  params: Promise<{ note: string }>;
}

export default async function Layout({ children, params }: LayoutProps) {
  return (
    <NotePageLayout filteredNotes={filterArchieved()} params={params} noteHref='/dashboard/n'>
      {children}
    </NotePageLayout>
  );
}
