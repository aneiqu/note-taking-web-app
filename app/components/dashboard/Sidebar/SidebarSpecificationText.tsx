import { getActiveNotesByTag, getArchivedNotes, getNotesByParams } from "@/app/actions/notes";

interface SpecificationTypes {
  tagText: string;
  textType: "tag" | "search" | "archived";
}

export function getSpecificationMessage({
  textType,
  tagText,
  count,
}: {
  textType: "tag" | "search" | "archived";
  tagText: string;
  count: number;
}) {
  const formattedTag = tagText ? tagText[0].toUpperCase() + tagText.slice(1) : "";

  if (count === 0) {
    return "You don’t have any notes yet. Start a new note to capture your thoughts and ideas.";
  }

  if (textType === "tag") {
    return `All notes with the tag ”${formattedTag}” are shown here.`;
  }

  if (textType === "search") {
    return `All notes matching ”${formattedTag}” are displayed below.`;
  }

  return "All your archived notes are stored here. You can restore or delete them anytime.";
}

export default async function SpecificationText({ tagText, textType }: SpecificationTypes) {
  const notes =
    textType === "tag"
      ? await getActiveNotesByTag(tagText)
      : textType === "archived"
        ? await getArchivedNotes()
        : await getNotesByParams(tagText.toLowerCase());

  return (
    <div className='text-preset-5'>
      <p className='text-neutral-700 dark:text-neutral-300'>
        {getSpecificationMessage({
          textType,
          tagText,
          count: notes.length,
        })}
      </p>
    </div>
  );
}
