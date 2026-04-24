import { destroySession } from "@/app/actions/auth";
import LogoutIcon from "@/app/assets/icons/icon-logout.svg";
import Form from "next/form";
import { redirect } from "next/navigation";
import ReturnButton from "../Note/ReturnButton";
import SettingsLinks from "./SettingsLinks";

interface LayoutProps {
  children?: React.ReactNode;
}

async function handleForm() {
  "use server";

  await destroySession();
  redirect("/login");
}

export default function SettingsPageLayout({ children }: LayoutProps) {
  return (
    <div className='text-neutral-950 dark:text-neutral-200 lg:grid lg:grid-cols-12 h-full w-screen px-4 pt-6 lg:px-0 lg:pt-0 lg:w-full dark:bg-neutral-950'>
      <div className=' lg:flex flex-col col-span-3 lg:border-r border-neutral-200 dark:border-neutral-800 gap-2 lg:pt-5 lg:pr-4 lg:pl-8'>
        <h2 className='text-preset-1 dark:text-white pb-4 lg:pb-2 lg:hidden'>Settings</h2>
        <div className='text-preset-4 flex flex-col gap-2'>
          <SettingsLinks />
        </div>
        <hr className='text-neutral-200 dark:text-neutral-800 my-2' />
        <Form action={handleForm}>
          <button type='submit' className='flex items-center gap-2 p-2 cursor-pointer'>
            <LogoutIcon className='dark:**:stroke-neutral-200' />
            <p>Logout</p>
          </button>
        </Form>
      </div>

      <div className='lg:col-span-5 lg:pt-8 lg:pl-8'>{children}</div>
    </div>
  );
}
