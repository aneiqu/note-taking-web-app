import AuthForm from "@/app/ui/auth/AuthForm";
import { AuthFormPasswordInput, AuthFormTextInput } from "@/app/ui/auth/AuthFormInput";
import AuthHeader from "@/app/ui/auth/AuthHeader";
import AuthLoginGoogle from "@/app/ui/auth/AuthLoginGoogle";
import Link from "next/link";

export default function Login() {
  return (
    <>
      <AuthHeader title='Welcome to Note' description='Please log in to continue' />
      <AuthForm buttonText='Login'>
        <AuthFormTextInput label='Email Address' placeholder='email@example.com' />
        <AuthFormPasswordInput />
      </AuthForm>
      <hr className='text-neutral-300 w-full dark:border-neutral-600' />
      <p className='text-preset-5 text-neutral-600 dark:text-neutral-300 mb-4 mt-6'>
        Or log in with:
      </p>
      <AuthLoginGoogle />
      <hr className='text-neutral-300 w-full my-4 dark:border-neutral-600' />
      <p className='text-preset-5 text-neutral-600 dark:text-neutral-300'>
        No account yet?{" "}
        <Link href='/signup' className='text-neutral-950 dark:text-white'>
          Sign Up
        </Link>
      </p>
    </>
  );
}
