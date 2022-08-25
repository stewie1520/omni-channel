import { useMatches } from "@remix-run/react";
import { useMemo } from "react";

import type { Account } from "./frontend-models/account";
import type { Student } from "./frontend-models/computed-student";
import { ComputedStudent } from "./frontend-models/computed-student";
import type { EmailAccount } from "./frontend-models/email-account";

const DEFAULT_REDIRECT = "/";

/**
 * This should be used any time the redirect path is user-provided
 * (Like the query string on our login/signup pages). This avoids
 * open-redirect vulnerabilities.
 * @param {string} to The redirect destination
 * @param {string} defaultRedirect The redirect to use if the to is unsafe.
 */
export function safeRedirect(
  to: FormDataEntryValue | string | null | undefined,
  defaultRedirect: string = DEFAULT_REDIRECT
) {
  if (!to || typeof to !== "string") {
    return defaultRedirect;
  }

  if (!to.startsWith("/") || to.startsWith("//")) {
    return defaultRedirect;
  }

  return to;
}

/**
 * This base hook is used in other hooks to quickly search for specific data
 * across all loader data using useMatches.
 * @param {string} id The route id
 * @returns {JSON|undefined} The router data or undefined if not found
 */
export function useMatchesData(
  id: string
): Record<string, unknown> | undefined {
  const matchingRoutes = useMatches();
  const route = useMemo(
    () => matchingRoutes.find((route) => route.id === id),
    [matchingRoutes, id]
  );
  return route?.data;
}

function isAccount(account: any): account is Account {
  return (
    account &&
    typeof account === "object" &&
    account.firstName &&
    account.lastName
  );
}

function isStudent(student: any): student is Student {
  return (
    student &&
    typeof student === "object" &&
    student.firstName &&
    student.lastName &&
    student.account
  );
}

export function isEmailAccount(account: any): account is EmailAccount {
  return typeof account.email === "string" && isAccount(account);
}

export function useOptionalEmailAccount(): EmailAccount | undefined {
  const data = useMatchesData("root");
  if (!data || !isEmailAccount(data.account)) {
    return undefined;
  }

  return data.account;
}

export function useEmailAccount(): EmailAccount {
  const maybeAccount = useOptionalEmailAccount();
  if (!maybeAccount) {
    throw new Error(
      "No email account found in root loader, but account is required by useEmailAccount. If student is optional, try useOptionalEmailAccount instead."
    );
  }
  return maybeAccount;
}

export function useOptionalAccount(): Account | undefined {
  const data = useMatchesData("root");
  if (!data || !isAccount(data.account)) {
    return undefined;
  }

  return data.account;
}

export function useAccount(): Account {
  const maybeAccount = useOptionalAccount();
  if (!maybeAccount) {
    throw new Error(
      "No account found in root loader, but account is required by useAccount. If student is optional, try useOptionalAccount instead."
    );
  }
  return maybeAccount;
}

export function useComputedStudent(): ComputedStudent {
  const data = useMatchesData("root");
  if (!data || !isStudent(data.student)) {
    throw new Error(
      "No student found in root loader, but student is required by useComputedStudent."
    );
  }

  return new ComputedStudent(data.student);
}
