import { render, screen } from "@testing-library/react";
import { usePathname } from "next/navigation";
import { SVGProps } from "react";
import { IconContainer, NavIcons } from "./NavIcons";

const TestIcon = (props: SVGProps<SVGSVGElement>) => <svg data-testid='nav-icon' {...props} />;

const mockUsePathname = vi.mocked(usePathname);

vi.mock("next/navigation", () => ({
  usePathname: vi.fn(),
}));

describe("IconContainer component", () => {
  it("renders correct container with data", () => {
    render(<IconContainer Icon={TestIcon} isActive={false} label='Home' variant='fill' />);
    expect(screen.getByText(/home/i)).toBeInTheDocument();
    expect(screen.getByTestId("nav-icon")).toBeInTheDocument();
    expect(screen.getByTestId("nav-icon")).not.toHaveClass("**:fill-blue-500!");
  });

  it("changes appearance when it's active", () => {
    render(<IconContainer Icon={TestIcon} isActive={true} label='Home' variant='fill' />);
    expect(screen.getByText(/home/i)).toBeInTheDocument();
    expect(screen.getByTestId("nav-icon")).toHaveClass("**:fill-blue-500!");
    expect(screen.getByText(/home/i)).toHaveClass("text-blue-500");
  });
});

describe("NavIcons component", () => {
  beforeEach(() => {
    mockUsePathname.mockReturnValue("/");
  });
  it("renders navigation links with correct hrefs", () => {
    render(<NavIcons />);

    expect(screen.getByRole("link", { name: /home/i })).toHaveAttribute("href", "/dashboard");

    expect(screen.getByRole("link", { name: /search/i })).toHaveAttribute(
      "href",
      "/dashboard/search",
    );

    expect(screen.getByRole("link", { name: /archived/i })).toHaveAttribute(
      "href",
      "/dashboard/archived",
    );

    expect(screen.getByRole("link", { name: /tags/i })).toHaveAttribute("href", "/dashboard/tag");

    expect(screen.getByRole("link", { name: /settings/i })).toHaveAttribute(
      "href",
      "/dashboard/settings",
    );
  });
});
