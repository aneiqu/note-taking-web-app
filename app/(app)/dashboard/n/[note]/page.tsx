import data from "@/app/assets/data/data.json";
import NoteDataItems from "@/app/ui/dashboard/Note/NoteDataItems";
import { notFound } from "next/navigation";

interface NotePageParams {
  params: Promise<{ note: string }>;
}

export default async function Note({ params }: NotePageParams) {
  const { note } = await params;
  const decodedParam = decodeURIComponent(note);

  const currentNote = data.notes.find((n) => n.id === decodedParam);

  if (!currentNote) notFound();

  return (
    <>
      <div>
        <div className='flex flex-col gap-3'>
          <div className='text-preset-1 text-neutral-950'>{currentNote.title}</div>
          <div className='flex flex-col gap-1'>
            <NoteDataItems tags={currentNote.tags} date={currentNote.lastEdited} />
          </div>
        </div>
      </div>
      <hr className='text-neutral-200' />
      <textarea
        className='whitespace-pre-wrap text-preset-5 h-full resize-none'
        defaultValue={currentNote.content}
      ></textarea>
    </>
  );
}
