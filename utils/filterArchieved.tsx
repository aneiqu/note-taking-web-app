import data from "@/app/assets/data/data.json";

export function filterArchieved() {
  return data.notes.filter((note) => !note.isArchived);
}
