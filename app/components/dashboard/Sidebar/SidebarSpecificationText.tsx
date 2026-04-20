import { getArchivedNotes, getNotesByContent, getNotesByTag } from "@/utils/getNotes";

interface SpecificationTypes {
  tagText: string;
  textType: "tag" | "search" | "archived";
}

export default async function SpecificationText({ tagText, textType }: SpecificationTypes) {
  const formattedTag = tagText ? `${tagText[0].toUpperCase() + tagText.slice(1)}` : "";

  const emptyState =
    "You don’t have any notes yet. Start a new note to capture your thoughts and ideas.";
  const text = {
    tag: (
      <p className='text-neutral-700 dark:text-neutral-300'>
        {await getNotesByTag(tagText).then((notes) =>
          notes.length === 0
            ? emptyState
            : `All notes with the tag ”${formattedTag}” are shown here.`,
        )}
      </p>
    ),
    archived: (
      <p className='text-neutral-700 dark:text-neutral-300'>
        {await getArchivedNotes().then((notes) =>
          notes.length === 0
            ? emptyState
            : "All your archived notes are stored here. You can restore or delete them anytime.",
        )}
      </p>
    ),
    search: (
      <p className='text-neutral-700 dark:text-neutral-300'>
        {await getNotesByContent(formattedTag.toLowerCase()).then((notes) =>
          notes.length === 0
            ? emptyState
            : `All notes matching ”${formattedTag}” are displayed below.`,
        )}
      </p>
    ),
  };

  return <div className='text-preset-5'>{text[textType]}</div>;
}
