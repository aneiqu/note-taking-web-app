import data from "@/app/assets/data/data.json";
import NotesListPane from "@/app/components/dashboard/Note/NotesListPane";

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
      <NotesListPane
        filteredNotes={filteredNotes}
        activeNoteId=''
        noteHref={`/dashboard/tag/${encodeURIComponent(tag)}/n`}
      />
    </div>
  );
}
