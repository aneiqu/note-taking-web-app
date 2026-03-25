import { promises as fs } from "fs";
import path from "path";

type Note = {
  id: string;
  title: string;
  tags: string[];
  content: string;
  lastEdited: string;
  isArchived: boolean;
};

type NotesData = {
  notes: Note[];
};

const filePath = path.join(process.cwd(), "app", "assets", "data", "data.json");

export async function updateNote(noteId: string, newContent: string) {
  const fileContents = await fs.readFile(filePath, "utf8");
  const data: NotesData = JSON.parse(fileContents);

  const noteExists = data.notes.some((note) => note.id === noteId);
  if (!noteExists) {
    throw new Error(`Note with id "${noteId}" was not found`);
  }

  const updatedData: NotesData = {
    notes: data.notes.map((note) =>
      note.id === noteId
        ? {
            ...note,
            content: newContent,
            lastEdited: new Date().toISOString(),
          }
        : note,
    ),
  };

  await fs.writeFile(filePath, JSON.stringify(updatedData, null, 2), "utf8");
}
