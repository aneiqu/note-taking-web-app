import { authUser } from "@/app/actions/auth";
import AuthForm from "@/app/components/auth/AuthForm";
import { AuthFormPasswordInput, AuthFormTextInput } from "@/app/components/auth/AuthFormInput";
import AuthHeader from "@/app/components/auth/AuthHeader";
import AuthLoginGoogle from "@/app/components/auth/AuthLoginGoogle";
import { cookies } from "next/headers";
import Link from "next/link";
import { redirect } from "next/navigation";

export default function Login() {
  async function formAction(formData: FormData) {
    "use server";
    const email = formData.get("emailInput");
    const password = formData.get("password-input");
    if (email == null || password == null) return;
    const logged = await authUser({
      email: email,
      password: password,
    });
    if (logged) {
      redirect("/dashboard");
    } else {
      const cookieStore = await cookies();
      cookieStore.set(
        "flash",
        JSON.stringify({
          type: "error",
          message: "Invalid credentials",
        }),
        {
          httpOnly: false,
          maxAge: 10,
        },
      );
    }
  }
  return (
    <>
      <AuthHeader title='Welcome to Note' description='Please log in to continue' />
      <AuthForm buttonText='Login' formAction={formAction}>
        <AuthFormTextInput label='Email Address' placeholder='email@example.com' id='emailInput' />
        <AuthFormPasswordInput showForgetLink={true} id='password-input' label='Password input' />
      </AuthForm>
      <hr className='text-neutral-300 w-full dark:border-neutral-600' />
      <p className='text-preset-5 text-neutral-600 dark:text-neutral-300 mt-2'>Or log in with:</p>
      <AuthLoginGoogle />
      <hr className='text-neutral-300 w-full dark:border-neutral-600' />
      <p className='text-preset-5 text-neutral-600 dark:text-neutral-300'>
        No account yet?{" "}
        <Link href='/signup' className='text-neutral-950 dark:text-white'>
          Sign Up
        </Link>
      </p>
    </>
  );
}
