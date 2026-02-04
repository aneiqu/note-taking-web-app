import { redirect } from "next/navigation";

export function middleware() {
  const isLogged = false;

  if (!isLogged) redirect("/login");
}
