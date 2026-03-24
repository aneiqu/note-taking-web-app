import data from "@/app/assets/data/data.json";
import NoteDataItems from "@/app/components/dashboard/Note/NoteDataItems";
import { notFound } from "next/navigation";

interface NotePageParams {
  params: Promise<{ note: string; tag: string }>;
}

export default async function NotePageContent({ params }: NotePageParams) {
  const { note: noteId, tag: noteTag } = await params;
  console.log(noteTag ? "yes" : "no");
  const currentNote = data.notes.find((n) => n.id === decodeURIComponent(noteId));
  // &&
  //     n.tags.some((tag) => tag.toLowerCase() === decodeURIComponent(noteTag).toLowerCase()),
  if (!currentNote) notFound();

  return (
    <div className='flex flex-col gap-4 col-span-6 lg:py-5 lg:px-6 lg:border-r border-neutral-200 dark:border-neutral-800 h-full dark:bg-black'>
      <div>
        <div className='flex flex-col gap-3 lg:gap-4'>
          <div className='text-preset-1 text-neutral-950 dark:text-white'>{currentNote.title}</div>
          <div className='flex flex-col gap-1'>
            <NoteDataItems tags={currentNote.tags} date={currentNote.lastEdited} />
          </div>
        </div>
      </div>
      <hr className='text-neutral-200 dark:text-neutral-800' />
      <textarea
        className='whitespace-pre-wrap text-preset-5 dark:text-neutral-100 resize-none h-full'
        defaultValue={currentNote.content}
      ></textarea>
      <hr className='text-neutral-200 dark:text-neutral-800 hidden lg:block' />
      <div className='text-preset-4 hidden lg:flex gap-4 '>
        <button className='py-3 px-4 bg-blue-500 text-white rounded-md'>Save Note</button>
        <button className='py-3 px-4 bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400 rounded-md'>
          Cancel
        </button>
      </div>
    </div>
  );
}
