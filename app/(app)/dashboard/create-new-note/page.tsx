import { addNote } from "@/app/actions/notes";
import ClockIcon from "@/app/assets/icons/icon-clock.svg";
import TagIcon from "@/app/assets/icons/icon-tag.svg";
import ReturnButton from "@/app/components/dashboard/Note/ReturnButton";
import Form from "next/form";
import Link from "next/link";

export default async function CreateNewNote() {
  async function createNote(formData: FormData) {
    "use server";

    const title = formData.get("noteTitle");
    const tags = formData.get("noteTags");
    const content = formData.get("noteContent");

    if (typeof title !== "string") {
      throw new Error("Invalid note title");
    }

    if (typeof tags !== "string") {
      throw new Error("Invalid note tags");
    }

    if (typeof content !== "string") {
      throw new Error("Invalid note content");
    }

    addNote({
      id: `${Math.random()}`,
      title: title,
      tags: tags.split(",").map((tag) => tag.trim()),
      content: content,
      lastEdited: `${new Date().toISOString()}`,
      isArchived: false,
    });
  }

  return (
    <Form
      action={createNote}
      className='flex flex-col w-screen lg:w-full pt-5 px-4 lg:px-6 lg:pt-1 gap-3 lg:gap-4 h-full lg:border-r lg:border-neutral-200 lg:pb-5'
    >
      <div className='flex justify-between'>
        <ReturnButton noteHref='/dashboard' />
        <div className='flex lg:hidden gap-4 text-preset-5 items-center'>
          <Link href={"/dashboard"} className='text-neutral-600 dark:text-neutral-300 lg:hidden '>
            Cancel
          </Link>
          <button type='submit' form='note-form' className='text-blue-500  lg:hidden '>
            Save Note
          </button>
        </div>
      </div>
      <hr className='text-neutral-200 w-full lg:hidden' />
      <div>
        <input
          name='noteTitle'
          placeholder='Enter a title…'
          type='text'
          className='text-preset-2 text-neutral-950 placeholder:text-neutral-950 outline-none w-full md:text-preset-1'
          aria-label='Note title'
          required={true}
        />
      </div>
      <div className='flex text-preset-6 md:text-preset-5 items-center -mb-1 lg:-mb-2'>
        <div className='flex items-center gap-1.5 min-w-28.75'>
          <TagIcon />
          <p className='text-neutral-700 dark:text-neutral-300'>Tags</p>
        </div>
        <input
          name='noteTags'
          aria-label='Note tags'
          placeholder='Add tags separated by commas (e.g. Work, Planning)'
          className='placeholder:text-neutral-400 w-full outline-none'
          required={true}
        />
      </div>
      <div className='flex text-preset-6 md:text-preset-5 items-center'>
        <div className='flex items-center gap-1.5 min-w-28.75'>
          <ClockIcon />
          <p className='text-neutral-700 dark:text-neutral-300'>Last edited</p>
        </div>
        <p className='text-neutral-400'>Not yet saved</p>
      </div>
      <hr className='text-neutral-200 w-full' />
      <textarea
        aria-label='Note content'
        name='noteContent'
        className='whitespace-pre-wrap text-preset-6 md:text-preset-5 dark:text-neutral-100 resize-none h-full outline-none'
        placeholder='Start typing your note here…'
        required={true}
      ></textarea>
      <hr className='text-neutral-200 hidden lg:block' />
      <div className='hidden lg:flex'>
        <button
          className='py-3 px-4 bg-blue-500 hover:bg-blue-700 focus:outline-offset-2 focus:ring-2 focus:ring-neutral-400 text-white rounded-md cursor-pointer duration-200'
          type='submit'
        >
          Save Note
        </button>
        <Link
          href={"/dashboard"}
          className='py-3 px-4 bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400 rounded-md cursor-pointer hover:bg-white focus:ring-2 focus:ring-neutral-400 hover:ring-2 hover:ring-neutral-300 focus:ring-offset-3 focus:outline duration-200'
          draggable='false'
        >
          Cancel
        </Link>
      </div>
    </Form>
  );
}
