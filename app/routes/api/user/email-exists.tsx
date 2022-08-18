import type { ActionFunction } from "@remix-run/server-runtime";
import { json } from "@remix-run/server-runtime";
import { HttpValidationError } from "~/libs/errors/http";
import { checkEmailExists } from "~/models/user/check-email-exists.server";

export type ActionRequestData = {
  email: string;
};

export const action: ActionFunction = async ({ request }) => {
  if (request.method !== "POST") {
    return new Response("Not Found", { status: 404 });
  }

  const requestData = (await request.json()) as ActionRequestData;
  const { error, value } = await checkEmailExists.validate(requestData);
  if (error) {
    console.log("error", error);
    return new HttpValidationError(error);
  }

  const exists = await checkEmailExists(value!);

  return json({ exists });
};
