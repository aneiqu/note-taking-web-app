import data from "@/app/assets/data/data.json";

export type Note = (typeof data.notes)[number];

function normalizeTag(tag: string) {
  return decodeURIComponent(tag).trim().toLowerCase();
}

export function getAllNotes() {
  return data.notes;
}

export function getActiveNotes() {
  return data.notes.filter((note) => !note.isArchived);
}

export function getArchivedNotes() {
  return data.notes.filter((note) => note.isArchived);
}

export function getNotesByTag(noteTag: string) {
  const normalizedTag = normalizeTag(noteTag);

  return data.notes.filter((note) => note.tags.some((tag) => normalizeTag(tag) === normalizedTag));
}

export function getActiveNotesByTag(noteTag: string) {
  return getNotesByTag(noteTag).filter((note) => !note.isArchived);
}

export function getArchivedNotesByTag(noteTag: string) {
  return getNotesByTag(noteTag).filter((note) => note.isArchived);
}

export function getNoteById(noteId: string) {
  const normalizedId = decodeURIComponent(noteId);

  return data.notes.find((note) => note.id === normalizedId);
}

export function getAllTags() {
  return Array.from(new Set(data.notes.flatMap((note) => note.tags))).sort((a, b) =>
    a.localeCompare(b),
  );
}
