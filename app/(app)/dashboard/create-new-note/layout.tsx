import NotesListPane from "@/app/components/dashboard/Note/NotesListPane";
import { getActiveNotes } from "@/utils/getNotes";

interface LayoutProps {
  children: React.ReactNode;
}

export default async function Layout({ children }: LayoutProps) {
  return (
    <div className='lg:grid lg:grid-cols-12 h-full pb-20 lg:pb-0 dark:bg-neutral-950'>
      <div className='hidden lg:block col-span-3 overflow-hidden'>
        <NotesListPane
          activeNoteId={""}
          noteHref={"/dashboard/n"}
          filteredNotes={await getActiveNotes()}
          tagSlug={""}
          textType={undefined}
        />
      </div>
      <div className='h-full lg:col-span-5'>{children}</div>
    </div>
  );
}
