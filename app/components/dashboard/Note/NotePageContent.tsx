import NoteDataItems from "@/app/components/dashboard/Note/NoteDataItems";
import { getNoteById } from "@/utils/getNotes";
import { notFound, redirect } from "next/navigation";

import { updateContent } from "@/app/actions/notes";
import { revalidatePath } from "next/cache";
import Form from "next/form";
import { cookies } from "next/headers";
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
    const cookieStore = await cookies();

    function getRequiredString(formData: FormData, key: string): string {
      const value = formData.get(key);
      if (typeof value !== "string") {
        throw new Error(`Invalid content in field: ${key}`);
      }
      return value;
    }

    function normalizeTags(rawTags: string): string[] {
      const seen = new Set<string>();
      return rawTags
        .split(",")
        .map((tag) => tag.trim().replace(/\s+/g, " "))
        .filter((tag) => tag.length > 0)
        .filter((tag) => {
          const normalizedTag = tag.toLowerCase();
          if (seen.has(normalizedTag)) return false;
          seen.add(normalizedTag);
          return true;
        });
    }

    const tags = normalizeTags(getRequiredString(formData, "noteSpecs"));

    const newData = {
      title: getRequiredString(formData, "noteTitle"),
      content: getRequiredString(formData, "noteContent"),
      tags: tags,
    };

    await updateContent(noteId, newData).then(() => {
      if (tagSlug) {
        const isTagSlugPresent = newData.tags.some(
          (tag) => tag.toLowerCase() === decodeURIComponent(tagSlug).toLowerCase(),
        );
        revalidatePath("/dashboard");
        revalidatePath(`/dashboard/tag/${tagSlug}`);
        revalidatePath(`/dashboard/tag/${tagSlug}/n/${noteId}`);
        if (!isTagSlugPresent) {
          redirect(`/dashboard/tag/${encodeURIComponent(newData.tags[0])}/n/${noteId}`);
        }
      } else {
        revalidatePath("/dashboard");
        revalidatePath(`/dashboard/n/${noteId}`);
        revalidatePath(`/dashboard/n/archived/${noteId}`);
        revalidatePath(`/dashboard/tag/${tagSlug}`);
      }
    });

    cookieStore.set(
      "flash",
      JSON.stringify({
        type: "success",
        message: "Note saved successfully!",
      }),
      {
        httpOnly: false,
        maxAge: 1,
      },
    );
  }

  return (
    <Form
      id='note-form'
      action={saveNoteContent}
      className='flex flex-col gap-4 col-span-6 lg:py-5 lg:px-6 lg:border-r border-neutral-200 dark:border-neutral-800 h-full dark:bg-neutral-950'
    >
      <div>
        <div className='flex flex-col gap-3 lg:gap-4'>
          <input
            name='noteTitle'
            aria-label='Note title'
            className='text-preset-1 text-neutral-950 dark:text-white'
            defaultValue={note.title}
            required={true}
            pattern={".*[^,\\s].*"}
            title={"Your title must be a valid text."}
          ></input>
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
          className='py-3 px-4 bg-blue-500 hover:bg-blue-700 focus:outline-offset-2 focus:ring-2 focus:ring-neutral-400 text-white rounded-md cursor-pointer duration-200'
          type='submit'
        >
          Save Note
        </button>
        <Link
          href={cancelHref}
          className='py-3 px-4 bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400 rounded-md cursor-pointer hover:bg-white focus:ring-2 focus:ring-neutral-400 hover:ring-2 hover:ring-neutral-300 focus:ring-offset-3 focus:outline duration-200 dark:hover:bg-neutral-900 dark:hover:ring-transparent'
          draggable='false'
        >
          Cancel
        </Link>
      </div>
    </Form>
  );
}
