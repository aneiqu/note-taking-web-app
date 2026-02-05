import { redirect } from "next/navigation";

export function middleware() {
  const isLogged = true;

  if (!isLogged) redirect("/login");
  else redirect("/dashboard");
}
