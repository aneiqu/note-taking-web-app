import NotesListPane from "@/app/components/dashboard/Note/NotesListPane";
import ReturnButton from "@/app/components/dashboard/Note/ReturnButton";
import { getActiveNotesByTag } from "@/utils/getNotes";

interface TagPageProps {
  params: Promise<{
    tag: string;
  }>;
}

export default async function Tag({ params }: TagPageProps) {
  const { tag: tagSlug } = await params;
  return (
    <div className='lg:grid grid-cols-12 col-span-3 h-full dark:bg-neutral-950 '>
      <>
        <ReturnButton
          noteHref='/dashboard/tag'
          classes='-mb-1 px-4 pt-5 text-preset-5'
          title='All Tags'
        />
        <NotesListPane
          filteredNotes={await getActiveNotesByTag(tagSlug)}
          activeNoteId=''
          noteHref={`/dashboard/tag/${tagSlug}/n`}
          tagSlug={tagSlug}
          textType='tag'
        />
      </>
    </div>
  );
}
