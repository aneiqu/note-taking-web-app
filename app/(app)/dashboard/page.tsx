import { getActiveNotes } from "@/app/actions/notes";
import NotesListPane from "@/app/components/dashboard/Note/NotesListPane";

export default async function Home() {
  return (
    <div className='lg:grid lg:grid-cols-12 h-full dark:bg-neutral-950 rounded-t-xl lg:rounded-t-0 '>
      <NotesListPane
        filteredNotes={await getActiveNotes()}
        activeNoteId=''
        noteHref='/dashboard/n'
      />
    </div>
  );
}
