import DashboardItem from "@/app/components/dashboard/DashboardItem";
import Link from "next/link";
import PageHeader from "../PageHeader";
import SearchComponent from "../SearchComponent";
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
  sP?: { q: string };
}

export default async function NotesListPane({
  activeNoteId,
  noteHref,
  filteredNotes,
  tagSlug,
  textType,
  sP,
}: PaneProps) {
  const tagText = tagSlug ? decodeURIComponent(tagSlug) : null;
  return (
    <div className='flex flex-col w-screen lg:w-full lg:h-full py-5 px-4 gap-4 col-span-3 lg:pl-8 lg:pr-4 lg:pt-5 lg:border-r border-neutral-200 dark:border-neutral-800 dark:bg-neutral-950 overflow-hidden rounded-t-xl lg:rounded-t-0'>
      <PageHeader classes='lg:hidden' />
      <div className='w-full lg:hidden'>
        <SearchComponent />
      </div>

      <Link
        href={"/dashboard/create-new-note"}
        className='hidden lg:block rounded-lg text-preset-4 bg-blue-500 py-3 w-full text-white text-center hover:bg-blue-700 duration-75'
      >
        + Create New Note
      </Link>
      {textType === "archived" ? (
        <SpecificationText tagText='' textType={textType} />
      ) : textType === "search" ? (
        <SpecificationText tagText={sP?.q ? sP.q : ""} textType={textType} />
      ) : textType && tagText ? (
        <SpecificationText tagText={tagText} textType={textType} />
      ) : null}
      <div className='flex flex-col gap-1 h-full overflow-y-scroll scrollbar-thin'>
        {filteredNotes.length === 0 && !textType ? (
          <div className='p-2 text-preset-5 text-neutral-950 bg-neutral-100 border border-neutral-200 rounded-lg dark:text-white dark dark:bg-neutral-800 dark:border-neutral-700'>
            You don&rsquo;t have any notes yet. Start a new note to capture your thoughts and ideas.
          </div>
        ) : (
          filteredNotes.map((note) => (
            <DashboardItem
              note={note}
              key={note.id}
              activeNoteId={activeNoteId}
              noteHref={`${noteHref}/${encodeURIComponent(note.id)}`}
              sP={sP}
            />
          ))
        )}
      </div>
    </div>
  );
}
