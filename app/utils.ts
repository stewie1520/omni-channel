import { useMatches } from "@remix-run/react";
import { useMemo } from "react";

import type { Student } from "~/frontend-models/computed-student";
import { ComputedStudent } from "~/frontend-models/computed-student";

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

function isStudent(student: any): student is Student {
  return (
    student &&
    typeof student === "object" &&
    student.firstName &&
    student.lastName
  );
}

function isComputedStudent(student: any): student is ComputedStudent {
  return (
    student &&
    typeof student === "object" &&
    typeof student.fullName === "string"
  );
}

export function useOptionalStudent(): Student | undefined {
  const data = useMatchesData("root");
  if (!data || !isStudent(data.student)) {
    return undefined;
  }

  return data.student;
}

export function useOptionalComputedStudent(): ComputedStudent | undefined {
  const data = useMatchesData("root");

  if (!data || !isStudent(data.student)) {
    return undefined;
  }
  return new ComputedStudent(data.student);
}

export function useStudent(): Student {
  const maybeStudent = useOptionalStudent();
  if (!maybeStudent) {
    throw new Error(
      "No student found in root loader, but student is required by useStudent. If student is optional, try useOptionalStudent instead."
    );
  }
  return maybeStudent;
}

export function useComputedStudent(): ComputedStudent {
  const maybeComputedStudent = useOptionalComputedStudent();
  if (!maybeComputedStudent) {
    throw new Error(
      "No computed student found in root loader, but computed student is required by useComputedStudent. If student is optional, try useOptionalComputedStudent instead."
    );
  }
  return maybeComputedStudent;
}
