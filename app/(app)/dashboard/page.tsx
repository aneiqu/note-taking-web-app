import NotesListPane from "@/app/components/dashboard/Note/NotesListPane";
import { getActiveNotes } from "@/utils/getNotes";

export default async function Home() {
  return (
    <div className='lg:grid lg:grid-cols-12 h-full dark:bg-black '>
      <NotesListPane
        filteredNotes={await getActiveNotes()}
        activeNoteId=''
        noteHref='/dashboard/n'
      />
      <div className='hidden lg:block col-span-6'>
        <p></p>
      </div>
      <div className='hidden lg:block col-span-3'></div>
    </div>
  );
}
