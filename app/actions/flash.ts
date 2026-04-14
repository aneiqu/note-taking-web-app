"use server";

import { cookies } from "next/headers";

export async function clearFlashMessage() {
  const cookieStore = await cookies();
  cookieStore.delete("flash");
}
