import AuthForm from "@/app/components/auth/AuthForm";
import { AuthFormTextInput } from "@/app/components/auth/AuthFormInput";
import AuthHeader from "@/app/components/auth/AuthHeader";

export default function ForgotPassword() {
  async function formAction() {}

  // -----------------------

  // Not available in demo

  // -----------------------

  return (
    <>
      <AuthHeader
        title='Forgotten your password?'
        description="Enter your email below, and we'll send you a link to reset it."
      />
      <AuthForm buttonText='Send Reset Link' formAction={formAction}>
        <AuthFormTextInput
          label='Email Address'
          placeholder='email@example.com'
          id='emailInput'
          type='email'
        />
      </AuthForm>
    </>
  );
}
