import { formatDate } from "@/utils/formatDate";
import Link from "next/link";

interface NoteProps {
  note: {
    content: string;
    isArchived: boolean;
    lastEdited: string;
    tags: string[];
    title: string;
    id: string;
  };
  activeNoteId: string;
  noteHref: string;
}

export default function DashboardItem({ note, activeNoteId, noteHref }: NoteProps) {
  const isActive = note.id === activeNoteId;

  const tagsFormatted = note.tags.map((tag) => (
    <p
      key={tag}
      className='text-preset-6 px-1.5 py-0.5 bg-neutral-200 dark:bg-neutral-600 rounded-sm'
    >
      {tag}
    </p>
  ));
  return (
    <>
      <Link
        href={{
          pathname: noteHref,
        }}
        className='nth-last-2:pb-14 md:nth-last-2:pb-18.5 lg:pb-0! dark:text-white'
      >
        <div
          className={`flex flex-col p-2 gap-3 rounded-md ${isActive ? "bg-neutral-100 dark:bg-neutral-800" : ""}`}
        >
          <h3 className='text-preset-3'>{note.title}</h3>
          <div className='flex gap-1 flex-wrap '>{tagsFormatted}</div>
          <p className='text-neutral-700 dark:text-neutral-300 text-preset-6'>
            {formatDate(note.lastEdited)}
          </p>
        </div>
      </Link>
      <hr
        className={`text-neutral-200 dark:text-neutral-800 last:hidden ${isActive ? "hidden" : ""}`}
      />
    </>
  );
}
