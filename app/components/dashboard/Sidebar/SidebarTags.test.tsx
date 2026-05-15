import { SidebarTags } from "./SidebarTagItems";

interface NoteTypes {
  id: string;
  title: string;
  tags: string[];
  content: string;
  lastEdited: string;
  isArchived: boolean;
}

describe("SidebarTags", () => {
  it("should return a list of unique tags from active notes", () => {
    const notes: NoteTypes[] = [
      {
        id: "1",
        title: "Note 1",
        tags: ["tag1", "tag2"],
        content: "Content 1",
        lastEdited: "2023-01-01",
        isArchived: false,
      },
      {
        id: "2",
        title: "Note 2",
        tags: ["tag2", "tag3"],
        content: "Content 2",
        lastEdited: "2023-01-02",
        isArchived: false,
      },
    ];

    const tags = SidebarTags(notes);

    expect(tags).toStrictEqual(["tag1", "tag2", "tag3"]);
  });

  it("should return an empty array if there are no tags in active notes", () => {
    const notes: NoteTypes[] = [
      {
        id: "1",
        title: "Note 1",
        tags: [],
        content: "Content 1",
        lastEdited: "2023-01-01",
        isArchived: false,
      },
    ];
    expect(SidebarTags(notes)).toStrictEqual([]);
  });

  it("should return an empty array if there are no active notes", () => {
    const notes: NoteTypes[] = [
      {
        id: "1",
        title: "Note 1",
        tags: ["tag1"],
        content: "Content 1",
        lastEdited: "2023-01-01",
        isArchived: true,
      },
    ];
    expect(SidebarTags(notes)).toStrictEqual([]);
  });

  it("should return proper formatted tags when there are duplicates with different cases", () => {
    const notes: NoteTypes[] = [
      {
        id: "1",
        title: "Note 1",
        tags: ["Tag1", "tag1", "TAG1"],
        content: "Content 1",
        lastEdited: "2023-01-01",
        isArchived: false,
      },
    ];
    expect(SidebarTags(notes)).toStrictEqual(["tag1"]);
  });

  it("should return sorted tags", () => {
    const notes: NoteTypes[] = [
      {
        id: "1",
        title: "Note 1",
        tags: ["banana", "apple", "cherry"],
        content: "Content 1",
        lastEdited: "2023-01-01",
        isArchived: false,
      },
    ];
    expect(SidebarTags(notes)).toStrictEqual(["apple", "banana", "cherry"]);
  });

  it("should return when there are notes with special characters in tags", () => {
    const notes: NoteTypes[] = [
      {
        id: "1",
        title: "Note 1",
        tags: ["tag with spaces", "tag-with-dash", "tag_with_underscore"],
        content: "Content 1",
        lastEdited: "2023-01-01",
        isArchived: false,
      },
    ];
    expect(SidebarTags(notes)).toStrictEqual([
      "tag with spaces",
      "tag_with_underscore",
      "tag-with-dash",
    ]);
  });
});
