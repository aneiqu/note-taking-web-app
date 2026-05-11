import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { useRouter, useSearchParams } from "next/navigation";
import SearchComponent from "./SearchComponent";

vi.mock("next/navigation", () => ({
  useRouter: vi.fn(),
  useSearchParams: vi.fn(),
}));

const mockUseRouter = vi.mocked(useRouter);
const mockUseSearchParams = vi.mocked(useSearchParams);
const mockReplace = vi.fn();

describe("Search component", () => {
  beforeEach(() => {
    mockReplace.mockClear();
    mockUseRouter.mockReturnValue({
      replace: mockReplace,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } as any);

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    mockUseSearchParams.mockReturnValue(new URLSearchParams() as any);
  });

  it("renders a search component", () => {
    render(<SearchComponent />);

    expect(screen.getByPlaceholderText(/search by title, content, or tags/i)).toBeInTheDocument();
  });

  it("uses q search param as initial value", () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    mockUseSearchParams.mockReturnValue(new URLSearchParams({ q: "react" }) as any);

    render(<SearchComponent />);

    expect(screen.getByRole("textbox", { name: /search/i })).toHaveValue("react");
  });
  it("replaces router path on Enter keypress", async () => {
    render(<SearchComponent />);

    const user = userEvent.setup();
    const input = screen.getByRole("textbox", { name: /search/i });
    await user.type(input, "react");
    await user.keyboard("{Enter}");
    expect(mockReplace).toHaveBeenCalledWith("/dashboard/search?q=react");
  });

  it("does not navigate before Enter is pressed", async () => {
    render(<SearchComponent />);

    const user = userEvent.setup();
    const input = screen.getByRole("textbox", { name: /search/i });

    await user.type(input, "react");

    expect(mockReplace).not.toHaveBeenCalled();
  });
});
