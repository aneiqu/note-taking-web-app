import { getActiveNotes } from "@/app/actions/notes";
import Link from "next/link";
import SidebarItem from "./SidebarItem";

export default async function SidebarTagItems() {
  const activeNotes = await getActiveNotes();

  const tags = Array.from(
    new Set(
      activeNotes
        .filter((note) => note.isArchived !== true)
        .flatMap((note) => note.tags.map((tag) => tag.toLowerCase())),
    ),
  ).sort((a, b) => a.localeCompare(b));

  return (
    <>
      {tags.map((tag) => {
        const tagSlug = encodeURIComponent(tag).toLowerCase();
        return (
          <div key={tag} className='last:[&>hr]:hidden'>
            <Link href={`/dashboard/tag/${tagSlug}`}>
              <SidebarItem icon='tag' label={tag} activePath={`/tag/${tagSlug}`} variant='stroke' />
            </Link>
            <hr className='text-neutral-200 dark:text-neutral-800 lg:hidden' />
          </div>
        );
      })}
    </>
  );
}
