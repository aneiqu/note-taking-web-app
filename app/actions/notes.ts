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

async function getNotes() {
  const fileContents = await fs.readFile(filePath, "utf8");
  const data: NotesData = JSON.parse(fileContents);
  return data;
}
async function saveNotes(path: string, data: NotesData) {
  await fs.writeFile(path, JSON.stringify(data, null, 2), "utf8");
}

async function updateNote(noteId: string, updater: (note: Note) => Note) {
  const data = await getNotes();

  const noteExists = data.notes.some((note) => note.id === noteId);
  if (!noteExists) {
    throw new Error(`Note with id "${noteId}" was not found`);
  }

  const updatedData: NotesData = {
    notes: data.notes.map((note) =>
      note.id === noteId
        ? {
            ...updater(note),
          }
        : note,
    ),
  };

  await saveNotes(filePath, updatedData);
}

export async function updateContent(noteId: string, newContent: string) {
  await updateNote(noteId, (note) => {
    return {
      ...note,
      content: newContent,
      lastEdited: new Date().toISOString(),
    };
  });
}
export async function toggleArchived(noteId: string, isArchived: boolean) {
  await updateNote(noteId, (note) => {
    return {
      ...note,
      isArchived: isArchived,
      lastEdited: new Date().toISOString(),
    };
  });
}

export async function deleteNote(noteId: string) {
  const data = await getNotes();

  const updatedData: NotesData = {
    notes: data.notes.filter((note) => note.id !== noteId),
  };
  await saveNotes(filePath, updatedData);
}
