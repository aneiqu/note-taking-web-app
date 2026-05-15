import { formatDate } from "@/utils/formatDate";
import { render, screen } from "@testing-library/react";
import DashboardItem from "./DashboardItem";

describe("DashboardItem component", () => {
  const note = {
    content: "Test content",
    isArchived: true,
    lastEdited: "2024-10-29T10:15:00Z",
    tags: ["test tag"],
    title: "Test title",
    id: "0",
  };
  it("Renders correctly with provided props", () => {
    render(<DashboardItem activeNoteId='1' note={note} noteHref='/testHref' />);

    expect(screen.getByText(/test title/i)).toBeInTheDocument();
    expect(screen.getByText(/test tag/i)).toBeInTheDocument();
    expect(screen.getByText(formatDate(note.lastEdited))).toBeInTheDocument();
    expect(screen.getByRole("link")).toHaveAttribute("href", "/testHref");
  });

  it("Renders properly when there are no tags", () => {
    const noteWithoutTags = { ...note, tags: [] };
    render(<DashboardItem activeNoteId='1' note={noteWithoutTags} noteHref='/testHref' />);
    expect(screen.queryByText(/test tag/i)).not.toBeInTheDocument();
  });

  it("Renders properly when there are multiple tags", () => {
    const noteWithMultipleTags = { ...note, tags: ["tag1", "tag2"] };
    render(<DashboardItem activeNoteId='1' note={noteWithMultipleTags} noteHref='/testHref' />);
    expect(screen.getByText(/tag1/i)).toBeInTheDocument();
    expect(screen.getByText(/tag2/i)).toBeInTheDocument();
  });

  it("Applies active styles when the note is active and aria-current is set", () => {
    render(<DashboardItem activeNoteId='0' note={note} noteHref='/testHref' />);

    expect(screen.getByText(/test title/i).closest("div")).toHaveClass("bg-neutral-100");
    expect(screen.getByRole("link")).toHaveAttribute("aria-current", "page");
  });

  it("Does not apply active styles when the note is not active", () => {
    render(<DashboardItem activeNoteId='1' note={note} noteHref='/testHref' />);

    expect(screen.getByText(/test title/i).closest("div")).not.toHaveClass("bg-neutral-100");
  });

  it("Renders proper query from sP prop", () => {
    render(
      <DashboardItem activeNoteId='1' note={note} noteHref='/testHref' sP={{ q: "search" }} />,
    );
    expect(screen.getByRole("link")).toHaveAttribute("href", "/testHref?q=search");
  });

  it("Renders properly when sP prop has special characters", () => {
    render(
      <DashboardItem
        activeNoteId='1'
        note={note}
        noteHref='/testHref'
        sP={{ q: "search with spaces" }}
      />,
    );
    expect(screen.getByRole("link")).toHaveAttribute(
      "href",
      "/testHref?q=search%2520with%2520spaces",
    );
  });
});
