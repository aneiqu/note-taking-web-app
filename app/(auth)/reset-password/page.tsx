import InfoIcon from "@/app/assets/icons/icon-info.svg";
import AuthForm from "@/app/components/auth/AuthForm";
import { AuthFormPasswordInput } from "@/app/components/auth/AuthFormInput";
import AuthHeader from "@/app/components/auth/AuthHeader";

export default function ResetPassword() {
  return (
    <>
      <AuthHeader
        title='Reset Your Password'
        description='Choose a new password to secure your account.'
      />
      <AuthForm buttonText='Reset Password'>
        <AuthFormPasswordInput />
        <div className='-mt-2 flex items-center gap-2.5'>
          <InfoIcon className='stroke-neutral-600 dark:stroke-neutral-400' />
          <p className='text-preset-6 text-neutral-600 dark:text-neutral-400'>
            At least 8 characters
          </p>
        </div>
        <AuthFormPasswordInput />
      </AuthForm>
    </>
  );
}
