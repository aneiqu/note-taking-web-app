import { render, screen } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import AuthForm from "./AuthForm";
describe("AuthForm component", () => {
  it("uses function passed as prop", async () => {
    const fn = vi.fn();
    render(
      <AuthForm buttonText='Test' formAction={fn}>
        <div>Test</div>
      </AuthForm>,
    );
    const user = userEvent.setup();
    await user.click(screen.getByRole("button", { name: /test/i }));
    expect(fn).toHaveBeenCalled();
  });
});
