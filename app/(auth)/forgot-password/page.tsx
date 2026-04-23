import AuthForm from "@/app/components/auth/AuthForm";
import { AuthFormTextInput } from "@/app/components/auth/AuthFormInput";
import AuthHeader from "@/app/components/auth/AuthHeader";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default function ForgotPassword() {
  async function formAction() {
    "use server";
    const cookieStore = await cookies();
    cookieStore.set(
      "flash",
      JSON.stringify({
        type: "error",
        message: `This function isn't implemented.
           Use data below to log in: 
           email: qwerty@notes.com
           password: 12345678`,
      }),
      {
        httpOnly: false,
        maxAge: 20,
      },
    );
    redirect("/login");
  }

  return (
    <>
      <AuthHeader
        title='Forgotten your password?'
        description='Enter your email below, and we’ll send you a link to reset it.'
      />
      <AuthForm buttonText='Send Reset Link' formAction={formAction}>
        <AuthFormTextInput label='Email Address' placeholder='email@example.com' id='emailInput' />
      </AuthForm>
    </>
  );
}
