import NotesListPane from "@/app/ui/dashboard/Note/NotesListPane";

export default function Home() {
  return (
    <div className='lg:grid lg:grid-cols-12 h-full'>
      <NotesListPane activeNoteId='' />
      <div className='hidden lg:block col-span-6'>
        <p></p>
      </div>
      <div className='hidden lg:block col-span-3'></div>
    </div>
  );
}
