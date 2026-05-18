import { prisma } from "@/lib/prisma";
import { cookies } from "next/headers";
import { validateSession } from "./auth";
import {
  createNote,
  deleteNote,
  formatNote,
  getArchivedNotes,
  getNoteById,
  getNotes,
  getNotesByParams,
  getUserId,
  normalizeTagName,
  updateNote,
} from "./notes";

vi.mock("next/headers", () => ({
  cookies: vi.fn(),
}));

vi.mock("./auth", () => ({
  validateSession: vi.fn(),
}));

vi.mock("@/lib/prisma", () => ({
  prisma: {
    note: {
      findMany: vi.fn(),
      create: vi.fn(),
      update: vi.fn(),
      delete: vi.fn(),
    },
  },
}));

const mockFindMany = vi.mocked(prisma.note.findMany);
const mockCreateNote = vi.mocked(prisma.note.create);
const mockUpdateNote = vi.mocked(prisma.note.update);
const mockdeleteNote = vi.mocked(prisma.note.delete);

const mockCookies = vi.mocked(cookies);
const mockValidate = vi.mocked(validateSession);

describe("Notes actions", () => {
  beforeEach(() => {
    mockCookies.mockReturnValue({
      get: vi.fn().mockReturnValue({ value: "test-session" }),
    } as any);
  });

  it("returns user ID", async () => {
    mockValidate.mockResolvedValue("user-1");

    const userId = await getUserId();

    expect(mockValidate).toHaveBeenCalledWith("test-session");
    expect(userId).toEqual("user-1");
  });

  it("returns undefined if no session token is found", async () => {
    mockCookies.mockReturnValue({
      get: vi.fn().mockReturnValue(undefined),
    } as any);

    const userId = await getUserId();

    expect(userId).toBeUndefined();
  });

  it("normalizes tag names correctly", () => {
    expect(normalizeTagName("  React JS  ")).toEqual("reactjs");
    expect(normalizeTagName("User Experience")).toEqual("userexperience");
    expect(normalizeTagName("Next%20JS")).toEqual("nextjs");
  });

  it("formats notes correctly", async () => {
    const note = {
      id: "note-1",
      title: "Test Note",
      content: "This is a test note.",
      isArchived: false,
      updatedAt: new Date("2024-01-01T00:00:00Z"),
      tags: [{ tag: { name: "react" } }, { tag: { name: "javascript" } }],
    };

    const formatted = {
      id: "note-1",
      title: "Test Note",
      content: "This is a test note.",
      isArchived: false,
      lastEdited: "2024-01-01T00:00:00.000Z",
      tags: ["react", "javascript"],
    };

    expect(formatNote(note)).toEqual(formatted);
  });

  it("calls getNotes with correct where clause", async () => {
    const where = { userId: "user-1", isArchived: false };
    mockFindMany.mockResolvedValue([]);
    await getNotes(where);

    expect(mockFindMany).toHaveBeenCalledWith({
      where,
      select: {
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
      },
      orderBy: {
        updatedAt: "desc",
      },
    });
  });

  it("doesnt return notes if user is not authenticated", async () => {
    mockValidate.mockResolvedValue(undefined);

    const notes = await getNotes({ userId: "user-1" });

    expect(notes).toEqual([]);
  });

  it("doesnt create note if user is not authenticated", async () => {
    mockValidate.mockResolvedValue(undefined);

    await createNote({ title: "Test", content: "Test content", tagInput: "test" });

    expect(mockCreateNote).not.toHaveBeenCalled();
  });

  it("doesnt update note if user is not authenticated", async () => {
    mockValidate.mockResolvedValue(undefined);

    await updateNote({
      noteId: "note-1",
      title: "Updated",
      content: "Updated content",
      tagInput: "updated",
    });

    expect(mockUpdateNote).not.toHaveBeenCalled();
  });

  it("deduplicates tags correctly", async () => {
    mockValidate.mockResolvedValue("user-1");

    const noteData = {
      title: "Test Note",
      content: "This is a test note.",
      tagInput: "react, javascript, react,  javascript, REACT",
    };
    await createNote(noteData);
    expect(mockCreateNote).toHaveBeenCalledWith({
      data: {
        title: "Test Note",
        content: "This is a test note.",
        userId: "user-1",
        tags: {
          create: [
            {
              tag: {
                connectOrCreate: {
                  where: {
                    userId_normalizedName: {
                      userId: "user-1",
                      normalizedName: "react",
                    },
                  },
                  create: {
                    userId: "user-1",
                    name: "react",
                    normalizedName: "react",
                  },
                },
              },
            },
            {
              tag: {
                connectOrCreate: {
                  where: {
                    userId_normalizedName: {
                      userId: "user-1",
                      normalizedName: "javascript",
                    },
                  },
                  create: {
                    userId: "user-1",
                    name: "javascript",
                    normalizedName: "javascript",
                  },
                },
              },
            },
          ],
        },
      },
    });
  });

  it("creates a note with correct data", async () => {
    mockValidate.mockResolvedValue("user-1");

    const noteData = {
      title: "Test Note",
      content: "This is a test note.",
      tagInput: "react, javascript",
    };
    await createNote(noteData);
    expect(mockCreateNote).toHaveBeenCalledWith({
      data: {
        title: "Test Note",
        content: "This is a test note.",
        userId: "user-1",
        tags: {
          create: [
            {
              tag: {
                connectOrCreate: {
                  where: {
                    userId_normalizedName: {
                      userId: "user-1",
                      normalizedName: "react",
                    },
                  },
                  create: {
                    userId: "user-1",
                    name: "react",
                    normalizedName: "react",
                  },
                },
              },
            },
            {
              tag: {
                connectOrCreate: {
                  where: {
                    userId_normalizedName: {
                      userId: "user-1",
                      normalizedName: "javascript",
                    },
                  },
                  create: {
                    userId: "user-1",
                    name: "javascript",
                    normalizedName: "javascript",
                  },
                },
              },
            },
          ],
        },
      },
    });
  });

  it("returns archived notes", async () => {
    mockValidate.mockResolvedValue("user-1");
    await getArchivedNotes();

    expect(mockFindMany).toHaveBeenCalledWith({
      where: {
        userId: "user-1",
        isArchived: true,
      },
      select: {
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
      },
      orderBy: {
        updatedAt: "desc",
      },
    });
  });
  it("gets notes by id", async () => {
    mockValidate.mockResolvedValue("user-1");
    await getNoteById("note1");

    expect(mockFindMany).toHaveBeenCalledWith({
      where: {
        userId: "user-1",
        id: "note1",
      },
      select: {
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
      },
      orderBy: {
        updatedAt: "desc",
      },
    });
  });
  it("gets notes by params", async () => {
    mockValidate.mockResolvedValue("user-1");
    await getNotesByParams("search");

    const searchText = "search";
    const userId = "user-1";

    expect(mockFindMany).toHaveBeenCalledWith({
      where: {
        userId: "user-1",
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
      },
      select: {
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
      },
      orderBy: {
        updatedAt: "desc",
      },
    });
  });
  it("deletes note", async () => {
    mockValidate.mockResolvedValue("user-1");

    await deleteNote("note-1");

    expect(mockdeleteNote).toHaveBeenCalledWith({
      where: {
        id: "note-1",
        userId: "user-1",
      },
    });
  });
});
