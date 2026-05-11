import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import PasswordInput from "./PasswordInput";

describe("PasswordInput", () => {
  it("renders as a required password input with a minimum length", () => {
    render(
      <PasswordInput ariaLabel='Password input' classes='' id='password-input' name='password' />,
    );

    const input = screen.getByLabelText(/password input/i);

    expect(input).toBeInTheDocument();
    expect(input).toHaveAttribute("type", "password");
    expect(input).toBeRequired();
    expect(input).toHaveAttribute("minlength", "8");
  });

  it("toggles password visibility", async () => {
    const user = userEvent.setup();

    render(
      <PasswordInput ariaLabel='Password input' classes='' id='password-input' name='password' />,
    );

    const input = screen.getByLabelText(/password input/i);

    expect(input).toHaveAttribute("type", "password");

    await user.type(input, "test-password");
    expect(input).toHaveValue("test-password");

    await user.click(screen.getByRole("button", { name: /show password/i }));

    expect(input).toHaveAttribute("type", "text");
    expect(screen.getByRole("button", { name: /hide password/i })).toBeInTheDocument();
    expect(input).toHaveValue("test-password");

    await user.click(screen.getByRole("button", { name: /hide password/i }));

    expect(input).toHaveAttribute("type", "password");
    expect(screen.getByRole("button", { name: /show password/i })).toBeInTheDocument();
  });
});
