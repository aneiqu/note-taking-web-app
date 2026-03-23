import ArchiveIcon from "@/app/assets/icons/icon-archive.svg";
import TrashIcon from "@/app/assets/icons/icon-delete.svg";
import NotesListPane from "@/app/components/dashboard/Note/NotesListPane";
import ReturnButton from "@/app/components/dashboard/Note/ReturnButton";

interface LayoutProps {
  children: React.ReactNode;
  params: {
    note: string;
  };
  noteHref: string;
  filteredNotes: {
    id: string;
    title: string;
    tags: string[];
    content: string;
    lastEdited: string;
    isArchived: boolean;
  }[];
}

export default async function NotePageLayout({
  children,
  params,
  noteHref,
  filteredNotes,
}: LayoutProps) {
  const { note: noteId } = await params;
  return (
    <div className='flex flex-col gap-3 py-5 w-screen px-4 overflow-hidden pb-16 md:pb-20 lg:w-full lg:grid lg:grid-cols-12 lg:p-0 lg:gap-0 h-full'>
      <div className='col-span-3 hidden lg:block overflow-hidden'>
        <NotesListPane activeNoteId={noteId} noteHref={noteHref} filteredNotes={filteredNotes} />
      </div>
      <div className='flex items-center lg:items-baseline justify-between text-preset-5 col-span-3 shrink-0 lg:order-3'>
        <ReturnButton noteHref={noteHref} />

        <div className='flex gap-4 **:stroke-neutral-600 text-preset-4 text-neutral-950 lg:flex-col lg:w-full lg:py-8 lg:pl-5 lg:pr-8'>
          <div className='lg:border lg:border-neutral-300 lg:rounded-lg lg:flex lg:px-4 lg:py-3 gap-2 items-center'>
            <ArchiveIcon className='lg:**:stroke-neutral-950' />
            <p className='hidden lg:block'>Archive Note</p>
          </div>
          <div className='lg:border lg:border-neutral-300 lg:rounded-lg lg:flex lg:px-4 lg:py-3 gap-2 items-center'>
            <TrashIcon className='lg:**:stroke-neutral-950' />
            <p className='hidden lg:block'>Delete Note</p>
          </div>
          <button className='text-neutral-600 lg:hidden'>Cancel</button>
          <button className='text-blue-500 lg:hidden'>Save Note</button>
        </div>
      </div>
      <hr className='text-neutral-200 lg:hidden' />
      {children}
    </div>
  );
}
