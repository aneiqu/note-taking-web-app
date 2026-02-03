import { redirect } from "next/navigation";

export const middleware = () => {
  const isLogged = false;

  if (!isLogged) redirect("/login");
};
