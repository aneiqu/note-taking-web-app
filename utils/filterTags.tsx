import data from "@/app/assets/data/data.json";

export function filterTags(currentTag: string) {
  return data.notes.filter(
    (note) => !note.isArchived && note.tags.some((tag) => tag.toLowerCase() === currentTag),
  );
}
