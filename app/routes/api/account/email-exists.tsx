import type { ActionFunction } from "@remix-run/server-runtime";
import { json } from "@remix-run/server-runtime";
import { ensureMethod } from "~/libs/web-controller/ensure-method";
import { container } from "~/models/container";
import { AccountController } from "~/models/user/web/account.controller";

export type ActionRequestData = {
  email: string;
};

export const action: ActionFunction = async ({ request }) => {
  ensureMethod("POST", request);
  const requestData = (await request.json()) as ActionRequestData;

  const exists = await container
    .get<AccountController>(AccountController)
    .checkEmailExists(requestData.email);

  return json({ exists });
};
