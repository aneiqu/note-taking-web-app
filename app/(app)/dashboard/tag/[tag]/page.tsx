import data from "@/app/assets/data/data.json";
import NotesListPane from "@/app/components/dashboard/Note/NotesListPane";
import ReturnButton from "@/app/components/dashboard/Note/ReturnButton";

interface TagPageProps {
  params: Promise<{
    tag: string;
  }>;
}

export default async function Tag({ params }: TagPageProps) {
  const { tag } = await params;
  const currentTag = decodeURIComponent(tag).toLowerCase();

  const filteredNotes = data.notes.filter(
    (note) => !note.isArchived && note.tags.some((tag) => tag.toLowerCase() === currentTag),
  );

  return (
    <div className='lg:grid grid-cols-12 col-span-3 h-full'>
      <>
        <ReturnButton noteHref='/dashboard/tag' classes='-mb-1 px-4 pt-5 text-preset-5' />
        <NotesListPane
          filteredNotes={filteredNotes}
          activeNoteId=''
          noteHref={`/dashboard/tag/${encodeURIComponent(tag)}/n`}
        />
      </>
    </div>
  );
}
