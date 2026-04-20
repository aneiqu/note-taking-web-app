import { deleteNote, toggleArchived } from "@/app/actions/notes";
import ArchiveIcon from "@/app/assets/icons/icon-archive.svg";
import TrashIcon from "@/app/assets/icons/icon-delete.svg";
import RestoreIcon from "@/app/assets/icons/icon-restore.svg";
import NotesListPane from "@/app/components/dashboard/Note/NotesListPane";
import ReturnButton from "@/app/components/dashboard/Note/ReturnButton";
import { getArchivedNotes } from "@/utils/getNotes";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import Link from "next/link";
import { redirect, RedirectType } from "next/navigation";
import NoteModal from "./NoteModal";

interface LayoutProps {
  children: React.ReactNode;
  params: Promise<{ note: string; tag?: string }>;
  noteHref: string;
  cancelHref?: string;
  filteredNotes: {
    id: string;
    title: string;
    tags: string[];
    content: string;
    lastEdited: string;
    isArchived: boolean;
  }[];
  searchParams?: { q?: string };
}

export default async function NotePageLayout({
  children,
  params,
  noteHref,
  cancelHref,
  filteredNotes,
  searchParams,
}: LayoutProps) {
  const { note: noteId, tag: tagSlug } = await params;
  const resolvedCancelHref =
    cancelHref ??
    noteHref
      .split("/")
      .filter((el) => el !== "n")
      .join("/");

  const specificationTypes = ["search", "archived", "tag"] as const;
  const textType = specificationTypes.find((type) => noteHref.includes(type));

  const isArchived = (await getArchivedNotes()).some((note) => note.id === noteId);

  async function updateArchived() {
    "use server";

    await toggleArchived(noteId, !isArchived).then(async () => {
      if (tagSlug) {
        revalidatePath("/dashboard");
        revalidatePath(`/dashboard/tag/${tagSlug}`);
        revalidatePath(`/dashboard/tag/${tagSlug}/n/${noteId}`);
        revalidatePath("/dashboard/archived");
      } else {
        revalidatePath("/dashboard");
        revalidatePath(`/dashboard/n/${noteId}`);
        revalidatePath("/dashboard/archived");
      }

      const cookieStore = await cookies();

      cookieStore.set(
        "flash",
        JSON.stringify({
          type: "success",
          message: isArchived ? "Note restored" : "Note archived",
        }),
        {
          httpOnly: false,
          maxAge: 1,
        },
      );

      if (isArchived) {
        redirect(`/dashboard/n/${noteId}`, RedirectType.replace);
      } else {
        if (tagSlug) {
          redirect(`/dashboard/tag/${tagSlug}`);
        } else if (searchParams) {
          redirect(`/dashboard/search?q=${searchParams.q}`);
        } else {
          redirect("/dashboard");
        }
      }
    });
  }

  async function removeNote() {
    "use server";
    await deleteNote(noteId).then(async () => {
      if (tagSlug) {
        revalidatePath("/dashboard");
        revalidatePath(`/dashboard/tag/${tagSlug}`);
        revalidatePath(`/dashboard/tag/${tagSlug}/n/${noteId}`);
        revalidatePath("/dashboard/archived");
      } else {
        revalidatePath("/dashboard");
        revalidatePath(`/dashboard/n/${noteId}`);
        revalidatePath("/dashboard/archived");
      }

      const cookieStore = await cookies();
      cookieStore.set(
        "flash",
        JSON.stringify({
          type: "success",
          message: "Note deleted",
        }),
        {
          httpOnly: false,
          maxAge: 10,
        },
      );

      if (tagSlug) {
        redirect(`/dashboard/tag/${tagSlug}`);
      } else if (searchParams) {
        redirect(`/dashboard/search?q=${searchParams.q}`);
      } else {
        redirect(`/dashboard`);
      }
    });
  }

  return (
    <div className='flex flex-col gap-3 py-5 w-screen px-4 overflow-hidden pb-16 md:pb-20 lg:w-full lg:grid lg:grid-cols-12 lg:p-0 lg:gap-0 h-full'>
      <div className='col-span-3 hidden lg:block overflow-hidden'>
        <NotesListPane
          activeNoteId={noteId}
          noteHref={noteHref}
          filteredNotes={filteredNotes}
          textType={textType}
          tagSlug={tagSlug}
          sP={searchParams?.q ? { q: searchParams.q } : undefined}
        />
      </div>
      <div className='flex items-center lg:items-baseline justify-between text-preset-5 col-span-3 shrink-0 lg:order-3 lg:dark:bg-neutral-950'>
        <ReturnButton noteHref={noteHref} href={resolvedCancelHref} />

        <div className='flex gap-4 **:stroke-neutral-600 text-preset-4 text-neutral-950 lg:flex-col lg:w-full lg:py-8 lg:pl-5 lg:pr-8 items-center'>
          <div className='lg:w-full'>
            <NoteModal
              formId='note-form'
              formAction={updateArchived}
              title={isArchived ? "Restore Note" : "Archive Note"}
              description={
                isArchived
                  ? "Are you sure you want to restore this note?"
                  : "Are you sure you want to archive this note? You can find it in the Archived Notes section and restore it anytime."
              }
              icon={
                isArchived ? (
                  <RestoreIcon
                    className={`lg:**:stroke-neutral-950 **:fill-neutral-950 dark:**:stroke-neutral-300 dark:**:fill-neutral-300 group-hover:**:stroke-neutral-600`}
                  />
                ) : (
                  <ArchiveIcon
                    className={`lg:**:stroke-neutral-950 dark:**:stroke-neutral-300 group-hover:**:stroke-neutral-600`}
                  />
                )
              }
              toastTitle={isArchived ? "Note restored to active notes." : "Note archived."}
            />
          </div>
          <div className='lg:w-full'>
            <NoteModal
              formId='note-form'
              formAction={removeNote}
              title='Delete Note'
              description='Are you sure you want to permanently delete this note? This action cannot be undone.'
              icon={
                <TrashIcon className='lg:**:stroke-neutral-950 dark:**:stroke-neutral-300 group-hover:**:stroke-neutral-600' />
              }
              toastTitle='Note permanently deleted.'
            />
          </div>
          <Link
            href={resolvedCancelHref}
            className='text-neutral-600 dark:text-neutral-300 lg:hidden '
          >
            Cancel
          </Link>
          <button type='submit' form='note-form' className='text-blue-500  lg:hidden '>
            Save Note
          </button>
        </div>
      </div>
      <hr className='text-neutral-200 dark:text-neutral-800 lg:hidden' />
      {children}
    </div>
  );
}
