import InfoIcon from "@/app/assets/icons/icon-info.svg";
import AuthForm from "@/app/components/auth/AuthForm";
import { AuthFormPasswordInput, AuthFormTextInput } from "@/app/components/auth/AuthFormInput";
import AuthHeader from "@/app/components/auth/AuthHeader";
import AuthLoginGoogle from "@/app/components/auth/AuthLoginGoogle";
import { cookies } from "next/headers";
import Link from "next/link";
import { redirect } from "next/navigation";

export default function Signup() {
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
        title='Create Your Account'
        description='Sign up to start organizing your notes and boost your productivity.'
      />
      <AuthForm formAction={formAction} buttonText='Sign up'>
        <AuthFormTextInput id='' label='Email Address' placeholder='email@example.com' />
        <AuthFormPasswordInput showForgetLink={false} id='password-input' label='Password input' />
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
