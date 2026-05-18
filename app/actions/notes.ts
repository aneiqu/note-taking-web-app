import type { Prisma } from "@/generated/prisma/client";
import { prisma } from "@/lib/prisma";
import { cookies } from "next/headers";
import { validateSession } from "./auth";

interface NoteTypes {
  title: string;
  content: string;
  tagInput: string;
}

interface UpdateTypes {
  title: string;
  content: string;
  tagInput: string;
  noteId: string;
}

const noteSelect = {
  id: true,
  title: true,
  content: true,
  isArchived: true,
  updatedAt: true,
  tags: {
    select: {
      tag: {
        select: {
          name: true,
        },
      },
    },
  },
};

export async function getUserId() {
  const cookieStore = await cookies();
  const sessionToken = cookieStore.get("session")?.value;

  if (!sessionToken) return;
  return await validateSession(sessionToken);
}

export function normalizeTagName(tag: string) {
  return decodeURIComponent(tag).split(" ").join("").toLowerCase().trim();
}

export function formatNote(note: Prisma.NoteGetPayload<{ select: typeof noteSelect }>) {
  return {
    id: note.id,
    title: note.title,
    tags: note.tags.map(({ tag }) => tag.name),
    content: note.content,
    lastEdited: note.updatedAt.toISOString(),
    isArchived: note.isArchived,
  };
}

export async function getNotes(where: Prisma.NoteWhereInput) {
  const notes = await prisma.note.findMany({
    where,
    select: noteSelect,
    orderBy: {
      updatedAt: "desc",
    },
  });

  return notes.map(formatNote);
}

export async function createNote({ title, content, tagInput }: NoteTypes) {
  const userId = await getUserId();
  const tags = [
    ...new Set(
      tagInput
        .split(",")
        .map((tag: string) => tag.trim().toLowerCase())
        .filter(Boolean),
    ),
  ];

  if (!userId) return;

  const note = await prisma.note.create({
    data: {
      title: title,
      content: content,
      userId: userId,
      tags: {
        create: tags.map((name) => ({
          tag: {
            connectOrCreate: {
              where: {
                userId_normalizedName: {
                  userId,
                  normalizedName: name.split(" ").join("").toLowerCase().trim(),
                },
              },
              create: {
                userId,
                name,
                normalizedName: name.split(" ").join("").toLowerCase().trim(),
              },
            },
          },
        })),
      },
    },
  });
  return note;
}

export async function getActiveNotes() {
  const userId = await getUserId();
  if (!userId) return [];

  return getNotes({
    userId,
    isArchived: false,
  });
}

export async function getNoteById(id: string) {
  const userId = await getUserId();
  if (!userId) return [];

  return getNotes({
    userId,
    id: id,
  });
}

export async function getArchivedNotes() {
  const userId = await getUserId();
  if (!userId) return [];

  return getNotes({
    userId,
    isArchived: true,
  });
}

export async function getActiveNotesByTag(tag: string) {
  const userId = await getUserId();
  if (!userId) return [];

  return getNotes({
    userId,
    isArchived: false,
    tags: {
      some: {
        tag: {
          userId,
          normalizedName: normalizeTagName(tag),
        },
      },
    },
  });
}

export async function getNotesByParams(params: string) {
  const userId = await getUserId();
  if (!userId) return [];

  const searchText = params.trim();
  if (!searchText) {
    return getNotes({ userId });
  }

  return getNotes({
    userId,
    OR: [
      {
        title: {
          contains: searchText,
          mode: "insensitive",
        },
      },
      {
        content: {
          contains: searchText,
          mode: "insensitive",
        },
      },
      {
        tags: {
          some: {
            tag: {
              userId,
              name: {
                contains: searchText,
                mode: "insensitive",
              },
            },
          },
        },
      },
      {
        tags: {
          some: {
            tag: {
              userId,
              normalizedName: {
                contains: normalizeTagName(searchText),
              },
            },
          },
        },
      },
    ],
  });
}

export async function updateNote({ noteId, title, content, tagInput }: UpdateTypes) {
  const userId = await getUserId();

  const tags = [
    ...new Set(
      tagInput
        .split(",")
        .map((tag: string) => tag.trim().toLowerCase())
        .filter(Boolean),
    ),
  ];

  if (!userId) return;

  const note = await prisma.note.update({
    where: { id: noteId, userId: userId },
    data: {
      title: title,
      content: content,
      tags: {
        deleteMany: {},
        create: tags.map((name) => ({
          tag: {
            connectOrCreate: {
              where: {
                userId_normalizedName: {
                  userId,
                  normalizedName: name.split(" ").join("").toLowerCase().trim(),
                },
              },
              create: {
                userId,
                name,
                normalizedName: name.split(" ").join("").toLowerCase().trim(),
              },
            },
          },
        })),
      },
    },
  });

  return note;
}

export async function toggleArchived(noteId: string, isArchived: boolean) {
  const userId = await getUserId();
  if (!userId) return;

  return await prisma.note.update({
    where: {
      id: noteId,
      userId,
    },
    data: {
      isArchived,
    },
  });
}

export async function deleteNote(noteId: string) {
  const userId = await getUserId();
  if (!userId) return;

  return await prisma.note.delete({
    where: {
      id: noteId,
      userId,
    },
  });
}
