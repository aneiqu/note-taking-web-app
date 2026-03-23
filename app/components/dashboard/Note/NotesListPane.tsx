import DashboardItem from "@/app/components/dashboard/DashboardItem";
import PageHeader from "../PageHeader";
import ReturnButton from "./ReturnButton";

interface PaneProps {
  activeNoteId: string;
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

export default function NotesListPane({ activeNoteId, noteHref, filteredNotes }: PaneProps) {
  const returnHref = noteHref.split("/").slice(0, 3).join("/");

  return (
    <div className='flex flex-col w-screen lg:w-full lg:h-full py-5 px-4 gap-4 col-span-3 lg:pl-8 lg:pr-4 lg:pt-5 lg:border-r border-neutral-200'>
      <ReturnButton noteHref={returnHref} classes='text-preset-5' />
      <PageHeader classes='lg:hidden' />
      <button className='hidden lg:block rounded-lg text-preset-4 bg-blue-500 py-3 w-full text-white'>
        + Create New Note
      </button>
      <div className='flex flex-col gap-1 h-full overflow-y-scroll'>
        {filteredNotes.map((note) => (
          <DashboardItem
            note={note}
            key={note.id}
            activeNoteId={activeNoteId}
            noteHref={`${noteHref}/${encodeURIComponent(note.id)}`}
          />
        ))}
      </div>
    </div>
  );
}
