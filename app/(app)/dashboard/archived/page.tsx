import NotesListPane from "@/app/components/dashboard/Note/NotesListPane";
import { getArchivedNotes } from "@/utils/getNotes";

export default async function Archived() {
  return (
    <div className='lg:grid grid-cols-12 col-span-3 h-full dark:bg-black'>
      <NotesListPane
        filteredNotes={await getArchivedNotes()}
        activeNoteId=''
        noteHref='/dashboard/archived/n'
      />
    </div>
  );
}
