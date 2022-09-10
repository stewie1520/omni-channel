import { AccountService } from "./core/application/service/account.service";
import { createRedisSessionStorage } from "./libs/redis";
import { redirect } from "@remix-run/node";
import invariant from "tiny-invariant";
import { container } from "~/models/container";

invariant(process.env.SESSION_SECRET, "SESSION_SECRET must be set");
invariant(process.env.REDIS_HOST, "REDIS_HOST must be set");
invariant(process.env.REDIS_PORT, "REDIS_PORT must be set");

const EXPIRATION_DURATION_IN_SECONDS = 30;

const expires = new Date();
expires.setSeconds(expires.getSeconds() + EXPIRATION_DURATION_IN_SECONDS);

export const sessionStorage = createRedisSessionStorage({
  cookie: {
    name: "__session",
    httpOnly: true,
    path: "/",
    sameSite: "lax",
    secrets: [process.env.SESSION_SECRET],
    secure: process.env.NODE_ENV === "production",
    expires,
  },
  options: {
    redisConfig: {
      host: process.env.REDIS_HOST,
      port: parseInt(process.env.REDIS_PORT),
    },
  },
});

const AUTH_SESSION_KEY = "auth_session_id";

export async function getSession(request: Request) {
  const cookie = request.headers.get("Cookie");
  return sessionStorage.getSession(cookie);
}

export async function getAccountId(
  request: Request
): Promise<string | undefined> {
  const session = await getSession(request);
  return session.get(AUTH_SESSION_KEY);
}

export async function getAccount(request: Request) {
  const accountId = await getAccountId(request);
  if (accountId === undefined) return null;
  const account = await container
    .get<AccountService>(AccountService)
    .findById(accountId);

  return account;
}

export async function requireAccountId(
  request: Request,
  redirectTo: string = new URL(request.url).pathname
) {
  const accountId = await getAccountId(request);
  if (!accountId) {
    const searchParams = new URLSearchParams([["redirectTo", redirectTo]]);
    throw redirect(`/sign-in?${searchParams}`);
  }
  return accountId;
}

export async function requireAccount(request: Request) {
  const accountId = await requireAccountId(request);
  const account = await container
    .get<AccountService>(AccountService)
    .findById(accountId);
  if (account) return account;

  throw await logout(request);
}

export async function createAccountSession({
  request,
  accountId,
  remember,
  redirectTo,
}: {
  request: Request;
  accountId: string;
  remember: boolean;
  redirectTo: string;
}) {
  const session = await getSession(request);
  session.set(AUTH_SESSION_KEY, accountId);
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
