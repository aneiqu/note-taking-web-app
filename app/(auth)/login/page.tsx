import { validateLogin } from "@/app/actions/auth";
import AuthForm from "@/app/components/auth/AuthForm";
import { AuthFormPasswordInput, AuthFormTextInput } from "@/app/components/auth/AuthFormInput";
import AuthHeader from "@/app/components/auth/AuthHeader";
import AuthLoginGoogle from "@/app/components/auth/AuthLoginGoogle";
import { cookies } from "next/headers";
import Link from "next/link";
import { redirect } from "next/navigation";
import z from "zod";

export default function Login() {
  async function formAction(formData: FormData) {
    "use server";

    const User = z.object({
      email: z.email(),
      password: z.string(),
    });
    const rawData = {
      email: formData.get("emailInput"),
      passowrd: formData.get("passwordInput"),
    };

    try {
      const parsedData = User.parse({
        email: rawData.email,
        password: rawData.passowrd,
      });
      const result = await validateLogin(parsedData);

      if (result.ok) {
        const cookieStore = await cookies();
        cookieStore.set("session", result.token, {
          httpOnly: true,
          sameSite: "lax",
          path: "/",
          maxAge: 60 * 60,
        });
      } else {
        const cookieStore = await cookies();
        cookieStore.set(
          "flash",
          JSON.stringify({
            type: "error",
            message: result.error,
          }),
          {
            httpOnly: false,
            maxAge: 10,
          },
        );
        return;
      }
    } catch {
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
      return;
    }
    redirect("/dashboard");
  }
  return (
    <>
      <AuthHeader title='Welcome to Note' description='Please log in to continue' />
      <AuthForm buttonText='Login' formAction={formAction}>
        <AuthFormTextInput
          label='Email Address'
          placeholder='email@example.com'
          id='emailInput'
          type='email'
        />
        <AuthFormPasswordInput showForgetLink={false} id='passwordInput' label='Password' />
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
