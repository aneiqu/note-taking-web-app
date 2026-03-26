import NoteDataItems from "@/app/components/dashboard/Note/NoteDataItems";
import { getNoteById } from "@/utils/getNotes";
import { notFound } from "next/navigation";

import { updateContent } from "@/app/actions/notes";
import { revalidatePath } from "next/cache";
import Form from "next/form";
import Link from "next/link";

interface NotePageParams {
  params: Promise<{ note: string; tag?: string }>;
  cancelHref: string;
}

export default async function NotePageContent({ params, cancelHref }: NotePageParams) {
  const { note: noteId, tag: tagSlug } = await params;
  const note = await getNoteById(noteId);
  if (!note) notFound();
  if (
    tagSlug &&
    !note.tags.some((tag) => tag.toLowerCase() === decodeURIComponent(tagSlug).toLowerCase())
  ) {
    notFound();
  }

  async function saveNoteContent(formData: FormData) {
    "use server";

    const newContent = formData.get("noteContent");
    if (typeof newContent !== "string") {
      throw new Error("Invalid note content");
    }

    await updateContent(noteId, newContent).then(() => {
      if (tagSlug) {
        revalidatePath("/dashboard");
        revalidatePath(`/dashboard/tag/${tagSlug}`);
        revalidatePath(`/dashboard/tag/${tagSlug}/n/${noteId}`);
      } else {
        revalidatePath("/dashboard");
        revalidatePath(`/dashboard/n/${noteId}`);
      }
    });
  }

  return (
    <Form
      id='note-form'
      action={saveNoteContent}
      className='flex flex-col gap-4 col-span-6 lg:py-5 lg:px-6 lg:border-r border-neutral-200 dark:border-neutral-800 h-full dark:bg-black'
    >
      <div>
        <div className='flex flex-col gap-3 lg:gap-4'>
          <div className='text-preset-1 text-neutral-950 dark:text-white'>{note.title}</div>
          <div className='flex flex-col gap-1'>
            <NoteDataItems tags={note.tags} date={note.lastEdited} />
          </div>
        </div>
      </div>
      <hr className='text-neutral-200 dark:text-neutral-800' />
      <textarea
        key={note.lastEdited}
        name='noteContent'
        className='whitespace-pre-wrap text-preset-5 dark:text-neutral-100 resize-none h-full'
        defaultValue={note.content}
      ></textarea>
      <hr className='text-neutral-200 dark:text-neutral-800 hidden lg:block' />
      <div className='text-preset-4 hidden lg:flex gap-4 '>
        <button
          className='py-3 px-4 bg-blue-500 text-white rounded-md cursor-pointer'
          type='submit'
        >
          Save Note
        </button>
        <Link
          href={cancelHref}
          className='py-3 px-4 bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400 rounded-md cursor-pointer'
        >
          Cancel
        </Link>
      </div>
    </Form>
  );
}
