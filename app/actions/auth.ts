import { cookies } from "next/headers";

interface authTypes {
  email: FormDataEntryValue;
  password: FormDataEntryValue;
}

export async function authUser({ email, password }: authTypes) {
  const userCredentialns = {
    email: "qwerty@notes.com",
    password: "12345678",
  };

  const validCredentials =
    userCredentialns.email === email && userCredentialns.password === password;

  if (validCredentials) {
    await createSession();
  }
  return validCredentials;
}

async function createSession() {
  const cookieStore = await cookies();
  const sessionToken = crypto.randomUUID();

  cookieStore.set("session", sessionToken, {
    httpOnly: true,
    path: "/",
    maxAge: 3600,
    sameSite: "lax",
  });
}

export async function destroySession() {
  const cookieStore = await cookies();
  cookieStore.delete("session");
  return true;
}
