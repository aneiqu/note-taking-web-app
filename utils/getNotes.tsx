import { promises as fs } from "fs";

import path from "path";

interface Note {
  id: string;
  title: string;
  tags: string[];
  content: string;
  lastEdited: string;
  isArchived: boolean;
}

interface NotesData {
  notes: Note[];
}
const filePath = path.join(process.cwd(), "app", "assets", "data", "data.json");

async function readNotesData(): Promise<NotesData> {
  if ((await fs.readFile(filePath, "utf8")).length <= 1) {
    const data = {
      notes: [],
    };
    return data;
  }
  return JSON.parse(await fs.readFile(filePath, "utf8")) as NotesData;
}

function normalizeTag(tag: string) {
  return decodeURIComponent(tag).trim().toLowerCase();
}

export async function getAllNotes() {
  const data = await readNotesData();
  return data.notes;
}

export async function getActiveNotes() {
  const data = await readNotesData();
  return data.notes.filter((note) => !note.isArchived);
}

export async function getArchivedNotes() {
  const data = await readNotesData();
  return data.notes.filter((note) => note.isArchived);
}

export async function getNotesByTag(noteTag: string) {
  const data = await readNotesData();
  const normalizedTag = normalizeTag(noteTag);

  return data.notes.filter((note) => note.tags.some((tag) => normalizeTag(tag) === normalizedTag));
}

export async function getActiveNotesByTag(noteTag: string) {
  return (await getNotesByTag(noteTag)).filter((note) => !note.isArchived);
}

export async function getArchivedNotesByTag(noteTag: string) {
  return (await getNotesByTag(noteTag)).filter((note) => note.isArchived);
}

export async function getNoteById(noteId: string) {
  const data = await readNotesData();
  const normalizedId = decodeURIComponent(noteId);

  return data.notes.find((note) => note.id === normalizedId);
}

export async function getAllActiveTags() {
  const data = await readNotesData();
  return Array.from(
    new Set(
      data.notes
        .filter((note) => note.isArchived !== true)
        .flatMap((note) => note.tags.map((tag) => tag.toLowerCase())),
    ),
  ).sort((a, b) => a.localeCompare(b));
}

export async function getNotesByContent(value: string) {
  const data = await readNotesData();

  const keys = ["title", "tags", "content"] as const;

  const filteredNotes = data.notes.filter((note: Note) => {
    const foundValue: boolean[] = [];
    keys.forEach((key) => {
      if (typeof note[key] === "string") {
        foundValue.push(note[key].toLowerCase().includes(value.toLowerCase()));
      } else {
        foundValue.push(
          note[key].map((el) => el.toLowerCase().trim()).includes(value.toLowerCase()),
        );
      }
    });
    return foundValue.some((el) => el === true);
  });
  return filteredNotes;
}
