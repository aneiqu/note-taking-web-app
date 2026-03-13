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
}

export default function DashboardItem({ note, activeNoteId }: NoteProps) {
  const isActive = note.id === activeNoteId;

  const tagsFormatted = note.tags.map((tag) => (
    <p key={tag} className='text-preset-6 px-1.5 py-0.5 bg-neutral-200 rounded-sm'>
      {tag}
    </p>
  ));
  return (
    <>
      <Link
        href={{
          pathname: `/dashboard/n/${encodeURIComponent(note.id)}`,
          query: { from: "dashboard" },
        }}
        className='nth-last-2:pb-14 md:nth-last-2:pb-18.5 lg:pb-0!'
      >
        <div className={`flex flex-col p-2 gap-3 rounded-md ${isActive ? "bg-neutral-100" : ""}`}>
          <h3 className='text-preset-3'>{note.title}</h3>
          <div className='flex gap-1 flex-wrap'>{tagsFormatted}</div>
          <p className='text-neutral-700'>{formatDate(note.lastEdited)}</p>
        </div>
      </Link>
      <hr className={`text-neutral-200 last:hidden ${isActive ? "hidden" : ""}`} />
    </>
  );
}
