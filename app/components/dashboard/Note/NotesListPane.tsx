import DashboardItem from "@/app/components/dashboard/DashboardItem";
import PageHeader from "../PageHeader";
import SpecificationText from "../Sidebar/SidebarSpecificationText";

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
  tagSlug?: string;
  textType?: "tag" | "search" | "archived";
}

export default async function NotesListPane({
  activeNoteId,
  noteHref,
  filteredNotes,
  tagSlug,
  textType,
}: PaneProps) {
  const tagText = tagSlug ? decodeURIComponent(tagSlug) : null;
  return (
    <div className='flex flex-col w-screen lg:w-full lg:h-full py-5 px-4 gap-4 col-span-3 lg:pl-8 lg:pr-4 lg:pt-5 lg:border-r border-neutral-200 dark:border-neutral-800 dark:bg-neutral-950 overflow-hidden '>
      <PageHeader classes='lg:hidden' />
      <button className='hidden lg:block rounded-lg text-preset-4 bg-blue-500 py-3 w-full text-white'>
        + Create New Note
      </button>
      {textType === "archived" ? (
        <SpecificationText tagText='' textType={textType} />
      ) : textType && tagText ? (
        <SpecificationText tagText={tagText} textType={textType} />
      ) : null}
      <div className='flex flex-col gap-1 h-full overflow-y-scroll scrollbar-thin'>
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
