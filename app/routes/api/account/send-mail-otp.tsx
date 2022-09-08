import type { ActionFunction } from "@remix-run/server-runtime";
import { json } from "@remix-run/server-runtime";
import { AccountService } from "~/core/application/service/account.service";
import { ensureMethod } from "~/libs/web-controller/ensure-method";
import { container } from "~/models/container";
import { HttpNotFoundResponse } from "~/models/http-response";
import { getAccountId } from "~/session.server";

export type ActionRequestData = {
  email: string;
};

export const action: ActionFunction = async ({ request }) => {
  ensureMethod("POST", request);
  const accountId = await getAccountId(request);
  if (!accountId) {
    throw new HttpNotFoundResponse("Account not found", {});
  }

  const result = await container
    .get<AccountService>(AccountService)
    .sendOTP(accountId);

  return json(result);
};
