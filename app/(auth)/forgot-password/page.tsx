import AuthForm from "@/app/ui/auth/AuthForm";
import { AuthFormTextInput } from "@/app/ui/auth/AuthFormInput";
import AuthHeader from "@/app/ui/auth/AuthHeader";

export default function ForgotPassword() {
  return (
    <>
      <AuthHeader
        title='Forgotten your password?'
        description='Enter your email below, and we’ll send you a link to reset it.'
      />
      <AuthForm buttonText='Send Reset Link'>
        <AuthFormTextInput label='Email Address' placeholder='email@example.com' />
      </AuthForm>
    </>
  );
}
