import { createUser } from "@/app/actions/auth";
import InfoIcon from "@/app/assets/icons/icon-info.svg";
import AuthForm from "@/app/components/auth/AuthForm";
import { AuthFormPasswordInput, AuthFormTextInput } from "@/app/components/auth/AuthFormInput";
import AuthHeader from "@/app/components/auth/AuthHeader";
import AuthLoginGoogle from "@/app/components/auth/AuthLoginGoogle";
import { cookies } from "next/headers";
import Link from "next/link";
import { redirect } from "next/navigation";
import z from "zod";

export default function Signup() {
  async function formAction(formData: FormData) {
    "use server";

    const User = z.object({
      email: z.email(),
      password: z.string(),
    });

    const rawData = {
      email: formData.get("emailInput"),
      password: formData.get("passwordInput"),
    };

    try {
      const parsedData = User.parse({
        email: rawData.email,
        password: rawData.password,
      });
      const result = await createUser(parsedData);

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
    } catch (error) {
      console.error(error);
      const cookieStore = await cookies();
      cookieStore.set(
        "flash",
        JSON.stringify({
          type: "error",
          message: "Account with this email already exists",
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
      <AuthHeader
        title='Create Your Account'
        description='Sign up to start organizing your notes and boost your productivity.'
      />
      <AuthForm formAction={formAction} buttonText='Sign up'>
        <AuthFormTextInput
          id='emailInput'
          label='Email Address'
          placeholder='email@example.com'
          type='email'
        />
        <AuthFormPasswordInput showForgetLink={false} id='passwordInput' label='Password' />
        <div className='-mt-2 flex items-center gap-2.5'>
          <InfoIcon className='stroke-neutral-600 dark:stroke-neutral-400' />
          <p className='text-preset-6 text-neutral-600 dark:text-neutral-400'>
            At least 8 characters
          </p>
        </div>
      </AuthForm>
      <hr className='text-neutral-300 w-full dark:border-neutral-600' />
      <p className='text-preset-5 text-neutral-600 dark:text-neutral-300 mt-2'>Or log in with:</p>
      <AuthLoginGoogle />
      <hr className='text-neutral-300 w-full dark:border-neutral-600' />
      <p className='text-preset-5 text-neutral-600 dark:text-neutral-300'>
        Already have an account?
        <Link href='/login' className='text-neutral-950 dark:text-white'>
          &nbsp;Login
        </Link>
      </p>
    </>
  );
}
