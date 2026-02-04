import InfoIcon from "@/app/assets/icons/icon-info.svg";
import AuthForm from "@/app/ui/auth/AuthForm";
import { AuthFormPasswordInput, AuthFormTextInput } from "@/app/ui/auth/AuthFormInput";
import AuthHeader from "@/app/ui/auth/AuthHeader";
import AuthLoginGoogle from "@/app/ui/auth/AuthLoginGoogle";

export default function Signup() {
  return (
    <>
      <AuthHeader
        title='Create Your Account'
        description='Sign up to start organizing your notes and boost your productivity.'
      />
      <AuthForm buttonText='Sign up'>
        <AuthFormTextInput label='Email Address' placeholder='email@example.com' />
        <AuthFormPasswordInput />
        <div className='-mt-2 flex items-center gap-2.5'>
          <InfoIcon className='stroke-neutral-600 dark:stroke-neutral-400' />
          <p className='text-preset-6 text-neutral-600 dark:text-neutral-400'>
            At least 8 characters
          </p>
        </div>
      </AuthForm>
      <hr className='text-neutral-300 w-full dark:border-neutral-600' />
      <p className='text-preset-5 text-neutral-600 dark:text-neutral-300 mb-4 mt-6'>
        Or log in with:
      </p>
      <AuthLoginGoogle />
      <hr className='text-neutral-300 w-full my-4 dark:border-neutral-600' />
      <p className='text-preset-5 text-neutral-600 dark:text-neutral-300'>
        Already have an account?
        <a href='./' className='text-neutral-950 dark:text-white'>
          &nbsp;Login
        </a>
      </p>
    </>
  );
}
