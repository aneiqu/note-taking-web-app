import { parseFontKey } from "@/utils/fontTheme";
import { cookies } from "next/headers";
import FontThemeClient from "./FontThemeClient";

export default async function FontPage() {
  const cookieStore = await cookies();
  const initialFont = parseFontKey(cookieStore.get("font")?.value);

  return <FontThemeClient initialFont={initialFont} />;
}
