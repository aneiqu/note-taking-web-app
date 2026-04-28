import { getNotesByParams } from "@/app/actions/notes";
import NotesListPane from "@/app/components/dashboard/Note/NotesListPane";

export default async function Search({ searchParams }: { searchParams: Promise<{ q: string }> }) {
  const params = await searchParams;

  const filterValue =
    params.q == undefined ? await getNotesByParams("") : await getNotesByParams(params.q);
  return (
    <div className='lg:grid grid-cols-12 col-span-3 h-full dark:bg-neutral-950  '>
      <NotesListPane
        activeNoteId=''
        noteHref='/dashboard/search/n'
        filteredNotes={filterValue}
        sP={params}
        textType='search'
      />
    </div>
  );
}
