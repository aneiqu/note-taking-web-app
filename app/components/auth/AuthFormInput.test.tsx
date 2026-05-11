import { render, screen } from "@testing-library/react";
import { AuthFormPasswordInput, AuthFormTextInput } from "./AuthFormInput";

describe("AuthFormInput components", () => {
  it("renders accessible text and password inputs", () => {
    render(
      <div>
        <AuthFormTextInput type='text' id='test-input' label='Test text input' placeholder='' />
        <AuthFormPasswordInput
          id='test-password-input'
          label='Test password input'
          showForgetLink={false}
        />
      </div>,
    );
    expect(screen.getByLabelText(/test text input/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/test password input/i)).toBeInTheDocument();
    expect(screen.queryByRole("link", { name: /forgot/i })).not.toBeInTheDocument();
  });
  it("renders the forgot password link when enabled", () => {
    render(
      <AuthFormPasswordInput
        id='test-password-input'
        label='Test password input'
        showForgetLink={true}
      />,
    );
    expect(screen.queryByRole("link", { name: /forgot/i })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /forgot/i })).toHaveAttribute(
      "href",
      "./forgot-password",
    );
  });
});
