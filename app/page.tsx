import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function app() {
  const token = (await cookies()).get("session")?.value;

  if (token) {
    redirect("/dashboard");
  } else {
    redirect("/login");
  }
}
