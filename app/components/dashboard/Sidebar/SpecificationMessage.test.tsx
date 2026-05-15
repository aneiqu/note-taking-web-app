import { getSpecificationMessage } from "./SidebarSpecificationText";

describe("Sidebar specification message", () => {
  it("should return the correct specification message when there are no active notes", () => {
    const message = getSpecificationMessage({
      textType: "tag",
      tagText: "test",
      count: 0,
    });
    expect(message).toStrictEqual(
      "You don’t have any notes yet. Start a new note to capture your thoughts and ideas.",
    );
  });
  it("should return the correct specification message for tag text type", () => {
    const message = getSpecificationMessage({
      textType: "tag",
      tagText: "test",
      count: 5,
    });
    expect(message).toStrictEqual(`All notes with the tag ”Test” are shown here.`);
  });

  it("should return the correct specification message for search text type", () => {
    const message = getSpecificationMessage({
      textType: "search",
      tagText: "test search",
      count: 5,
    });
    expect(message).toStrictEqual(`All notes matching ”Test search” are displayed below.`);
  });

  it("should return the correct specification message for archived text type", () => {
    const message = getSpecificationMessage({
      textType: "archived",
      tagText: "",

      count: 5,
    });
    expect(message).toStrictEqual(
      "All your archived notes are stored here. You can restore or delete them anytime.",
    );
  });
});
