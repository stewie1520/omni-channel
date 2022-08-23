import { createCookieSessionStorage, redirect } from "@remix-run/node";
import invariant from "tiny-invariant";
import { container } from "~/models/container";
import { StudentService } from "./core/application/service/student.service";

invariant(process.env.SESSION_SECRET, "SESSION_SECRET must be set");

export const sessionStorage = createCookieSessionStorage({
  cookie: {
    name: "__session",
    httpOnly: true,
    path: "/",
    sameSite: "lax",
    secrets: [process.env.SESSION_SECRET],
    secure: process.env.NODE_ENV === "production",
  },
});

const AUTH_SESSION_KEY = "auth_session_id";

export async function getSession(request: Request) {
  const cookie = request.headers.get("Cookie");
  return sessionStorage.getSession(cookie);
}

export async function getStudentId(
  request: Request
): Promise<string | undefined> {
  const session = await getSession(request);
  return session.get(AUTH_SESSION_KEY);
}

export async function getStudent(request: Request) {
  const studentId = await getStudentId(request);
  if (studentId === undefined) return null;
  const student = await container
    .get<StudentService>(StudentService)
    .findById(studentId);

  return student;
}

export async function requireStudentId(
  request: Request,
  redirectTo: string = new URL(request.url).pathname
) {
  const studentId = await getStudentId(request);
  if (!studentId) {
    const searchParams = new URLSearchParams([["redirectTo", redirectTo]]);
    throw redirect(`/sign-in?${searchParams}`);
  }
  return studentId;
}

export async function requireStudent(request: Request) {
  const studentId = await requireStudentId(request);
  const student = await container
    .get<StudentService>(StudentService)
    .findById(studentId);
  if (student) return student;

  throw await logout(request);
}

export async function createStudentSession({
  request,
  userId,
  remember,
  redirectTo,
}: {
  request: Request;
  userId: string;
  remember: boolean;
  redirectTo: string;
}) {
  const session = await getSession(request);
  session.set(AUTH_SESSION_KEY, userId);
  return redirect(redirectTo, {
    headers: {
      "Set-Cookie": await sessionStorage.commitSession(session, {
        maxAge: remember
          ? 60 * 60 * 24 * 7 // 7 days
          : undefined,
      }),
    },
  });
}

export async function logout(request: Request) {
  const session = await getSession(request);
  return redirect("/", {
    headers: {
      "Set-Cookie": await sessionStorage.destroySession(session),
    },
  });
}
