import NotesListPane from "@/app/components/dashboard/Note/NotesListPane";
import { getAllNotes } from "@/utils/getNotes";

export default async function Search() {
  return (
    <div className='lg:grid grid-cols-12 col-span-3 h-full dark:bg-neutral-950  '>
      <NotesListPane
        activeNoteId=''
        noteHref='/dashboard/search/n'
        filteredNotes={await getAllNotes()}
      />
    </div>
  );
}
