import ReturnButton from "@/app/components/dashboard/Note/ReturnButton";
import { parseFontKey } from "@/utils/fontTheme";
import { cookies } from "next/headers";
import FontThemeClient from "./FontThemeClient";

export default async function FontPage() {
  const cookieStore = await cookies();
  const initialFont = parseFontKey(cookieStore.get("font")?.value);

  return (
    <>
      <div className='lg:hidden'>
        <ReturnButton noteHref={"/dashboard/settings"} title='Settings' />
      </div>
      <FontThemeClient initialFont={initialFont} />
    </>
  );
}
