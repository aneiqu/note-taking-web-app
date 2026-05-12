import { render, screen } from "@testing-library/react";
import { usePathname, useSearchParams } from "next/navigation";
import PageHeader from "./PageHeader";

describe("PageHeader component", () => {
  const headers = [
    ["/dashboard", "All Notes"],
    ["/dashboard/archived", "Archived Notes"],
    ["/dashboard/settings", "Settings"],
  ];
  const tagHeaders = [
    ["/dashboard/tag/react", "Notes Tagged: React"],
    ["/dashboard/tag/user%20experience", "Notes Tagged: User experience"],
  ];
  const searchHeaders = [
    ["/dashboard/search", null, "Search"],
    ["/dashboard/search", "react", "Showing results for: react"],
  ] as const;

  vi.mock("next/navigation", () => ({
    usePathname: vi.fn(),
    useSearchParams: vi.fn(),
  }));

  const mockUsePathname = vi.mocked(usePathname);
  const mockUseSearchParams = vi.mocked(useSearchParams);
  beforeEach(() => {
    mockUsePathname.mockReturnValue("/");
  });
  it.each(headers)("renders headers", (input, expected) => {
    mockUsePathname.mockReturnValue(input);

    render(<PageHeader />);
    expect(screen.getByText(expected)).toBeInTheDocument();
  });
  it.each(tagHeaders)("renders tags headers", (input, expected) => {
    mockUsePathname.mockReturnValue(input);
    const { container } = render(<PageHeader />);
    expect(container.textContent).toMatch(expected);
  });
  it.each(searchHeaders)("renders search headers", (pathname, query, expected) => {
    mockUsePathname.mockReturnValue(pathname);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    mockUseSearchParams.mockReturnValue(new URLSearchParams(query ? { q: query } : {}) as any);

    const { container } = render(<PageHeader />);

    expect(container.textContent).toContain(expected);
  });
});
