import { render, screen } from "@testing-library/react";
import { usePathname } from "next/navigation";
import SidebarItem from "./SidebarItem ";

describe("SidebarItem", () => {
  vi.mock("next/navigation", () => ({
    usePathname: vi.fn(),
  }));

  const usePathnameMock = vi.mocked(usePathname);

  beforeEach(() => {
    usePathnameMock.mockReturnValue("/dashboard");
  });

  it("should render the label and icon", () => {
    render(<SidebarItem icon='home' label='Home' activePath='' variant='fill' />);
    expect(screen.getByText(/home/i)).toBeInTheDocument();
    expect(screen.getByLabelText("Home")).toBeInTheDocument();
  });

  it("should apply active styles to only the single icon when active", () => {
    render(<SidebarItem icon='home' label='Home' activePath='' variant='fill' />);

    expect(screen.getByLabelText("Home")).toHaveClass("fill-blue-500");
  });

  it("should not apply active styles when not active", () => {
    render(<SidebarItem icon='home' label='Home' activePath='/tag' variant='fill' />);
    expect(screen.getByLabelText("Home")).not.toHaveClass("fill-blue-500");
  });

  it("should render the ChevronRightIcon when active", () => {
    usePathnameMock.mockReturnValue("/dashboard/archived");

    render(<SidebarItem icon='archive' label='Archive' activePath='/archived' variant='fill' />);
    expect(screen.getByLabelText("Chevron Right")).toBeInTheDocument();
  });

  it("should not render the ChevronRightIcon when not active", () => {
    render(<SidebarItem icon='home' label='Home' activePath='tag' variant='fill' />);
    expect(screen.queryByLabelText("Chevron Right")).not.toBeInTheDocument();
  });
});
