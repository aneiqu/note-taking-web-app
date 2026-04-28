import { changePassword } from "@/app/actions/auth";
import ChangePasswordFields from "@/app/components/auth/ChangePasswordFields";
import PasswordInput from "@/app/components/auth/PasswordInput";
import ReturnButton from "@/app/components/dashboard/Note/ReturnButton";
import Form from "next/form";
import { cookies } from "next/headers";
import z from "zod";

export default function Theme() {
  async function updatePassword(formData: FormData) {
    "use server";

    const rawData = {
      oldPass: formData.get("currentPassword"),
      newPass: formData.get("newPassword"),
      confirmNewPass: formData.get("confirmNewPassword"),
    };

    const Password = z
      .object({
        oldPass: z.string(),
        newPass: z.string().min(8),
        confirmNewPass: z.string(),
      })
      .refine((data) => data.newPass === data.confirmNewPass, {
        path: ["confirmNewPass"],
        message: "Passwords do not match",
      });
    const parsedData = Password.parse(rawData);
    const result = await changePassword({
      oldPassword: parsedData.oldPass,
      newPassword: parsedData.newPass,
    });

    if (result.ok) {
      const cookieStore = await cookies();
      cookieStore.set(
        "flash",
        JSON.stringify({
          type: "success",
          message: result.message,
        }),
        {
          httpOnly: false,
          maxAge: 10,
        },
      );
    } else {
      const cookieStore = await cookies();
      cookieStore.set(
        "flash",
        JSON.stringify({
          type: "error",
          message: "Something went wrong, try again.",
        }),
        {
          httpOnly: false,
          maxAge: 10,
        },
      );
    }
  }

  return (
    <Form action={updatePassword}>
      <div className='lg:hidden'>
        <ReturnButton noteHref={"/dashboard/settings"} title='Settings' />
      </div>
      <div className='flex flex-col gap-2 mt-3 mb-5'>
        <h2 className='text-preset-1 lg:text-preset-3 dark:text-white'>Change Password</h2>
      </div>
      <div className='flex flex-col gap-4'>
        <div className='flex flex-col gap-6'>
          <div className='flex flex-col gap-1.5'>
            <label
              className='text-preset-4 text-neutral-950 dark:text-neutral-100'
              htmlFor='current-password'
            >
              Old Password
            </label>
            <PasswordInput
              id='current-password'
              name='currentPassword'
              ariaLabel='Old password'
              classes='border rounded-lg px-4 py-3 border-neutral-300 dark:border-neutral-600 w-full'
            />
          </div>
          <ChangePasswordFields />
        </div>
      </div>
      <button
        type='submit'
        className='text-preset-4 px-4 py-3 bg-blue-500 text-white rounded-lg mt-6 justify-self-end flex cursor-pointer hover:bg-blue-700 duration-75'
      >
        Apply Changes
      </button>
    </Form>
  );
}
