import { prisma } from "@/lib/prisma";
import bcrypt from "bcrypt";
import { cookies } from "next/headers";
import crypto from "node:crypto";
import { getUserId } from "./notes";

interface LoginTypes {
  email: string;
  password: string;
}

type AuthResult = { ok: true; token: string } | { ok: false; error: string };

async function hashPassword(password: string) {
  return bcrypt.hash(password, 10);
}
export async function validateSession(token: string) {
  const tokenHash = hashSessionToken(token);
  const session = await prisma.session.findUnique({
    where: { tokenHash },
    select: {
      userId: true,
      expiresAt: true,
    },
  });

  if (!session || session.expiresAt < new Date()) {
    throw new Error("Unauthorized");
  }

  return session.userId;
}

function hashSessionToken(token: string) {
  return crypto.createHash("sha256").update(token).digest("hex");
}

export async function createSession(id: string) {
  const token = crypto.randomBytes(32).toString("base64url");
  const hashedToken = hashSessionToken(token);
  await prisma.session.create({
    data: {
      expiresAt: new Date(Date.now() + 60 * 60 * 1000),
      tokenHash: hashedToken,
      userId: id,
    },
  });
  return { ok: true as const, token };
}

export async function validateLogin({ email, password }: LoginTypes): Promise<AuthResult> {
  const user = await prisma.user.findUnique({
    where: { email },
    select: { id: true, passwordHash: true },
  });
  if (!user) return { ok: false as const, error: "Invalid credentials" };

  const validPassword = await bcrypt.compare(password, user.passwordHash);
  if (!validPassword) return { ok: false, error: "Invalid credentials" };

  return await createSession(user.id);
}

export async function createUser({ email, password }: LoginTypes) {
  const existingUser = await prisma.user.findUnique({
    where: { email },
  });

  if (existingUser) return { ok: false as const, error: "Account with this email already exists" };

  const hashedPassword = await hashPassword(password);
  const user = await prisma.user.create({
    data: {
      email: email,
      passwordHash: hashedPassword,
    },
  });

  return await createSession(user.id);
}

export async function destroySession() {
  const cookieStore = await cookies();
  cookieStore.delete("session");
  return true;
}

export async function changePassword({
  oldPassword,
  newPassword,
}: {
  oldPassword: string;
  newPassword: string;
}) {
  const userId = await getUserId();

  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: { id: true, passwordHash: true },
  });
  if (!user) return { ok: false as const, error: "Invalid session" };

  const validPassword = await bcrypt.compare(oldPassword, user.passwordHash);
  if (!validPassword) return { ok: false, error: "Invalid credentials" };

  const hashedPassword = await hashPassword(newPassword);

  await prisma.user.update({
    where: { id: userId },
    data: {
      passwordHash: hashedPassword,
    },
  });

  await destroySession();
  return { ok: true as const, message: "Password updated" };
}
