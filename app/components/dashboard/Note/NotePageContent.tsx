import data from "@/app/assets/data/data.json";
import NoteDataItems from "@/app/components/dashboard/Note/NoteDataItems";
import { notFound } from "next/navigation";

interface NotePageParams {
  params: Promise<{ note: string }>;
}

export default async function NotePageContent({ params }: NotePageParams) {
  const { note } = await params;
  const decodedParam = decodeURIComponent(note);

  const currentNote = data.notes.find((n) => n.id === decodedParam);

  if (!currentNote) notFound();

  return (
    <div className='flex flex-col gap-4 col-span-6 lg:py-5 lg:px-6 lg:border-r border-neutral-200 h-full'>
      <div>
        <div className='flex flex-col gap-3 lg:gap-4'>
          <div className='text-preset-1 text-neutral-950'>{currentNote.title}</div>
          <div className='flex flex-col gap-1'>
            <NoteDataItems tags={currentNote.tags} date={currentNote.lastEdited} />
          </div>
        </div>
      </div>
      <hr className='text-neutral-200' />
      <textarea
        className='whitespace-pre-wrap text-preset-5 resize-none h-full'
        defaultValue={currentNote.content}
      ></textarea>
      <hr className='text-neutral-200 hidden lg:block' />
      <div className='text-preset-4 hidden lg:flex gap-4 '>
        <button className='py-3 px-4 bg-blue-500 text-white rounded-md'>Save Note</button>
        <button className='py-3 px-4 bg-neutral-100 text-neutral-600 rounded-md'>Cancel</button>
      </div>
    </div>
  );
}
