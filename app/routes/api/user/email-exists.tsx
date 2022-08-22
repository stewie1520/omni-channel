import type { ActionFunction } from "@remix-run/server-runtime";
import { json } from "@remix-run/server-runtime";
// import { HttpValidationError } from "~/libs/errors/http";
import { container } from "~/models/container";
import { AccountService } from "~/core/application/service/account.service";

export type ActionRequestData = {
  email: string;
};

export const action: ActionFunction = async ({ request }) => {
  if (request.method !== "POST") {
    return new Response("Not Found", { status: 404 });
  }

  const requestData = (await request.json()) as ActionRequestData;
  // const { error, value } = await container.get<UserRepository>(UserRepository)..validate(requestData);
  // if (error) {
  //   return new HttpValidationError(error);
  // }

  const exists = await container.get<AccountService>(AccountService).checkEmailTaken(requestData.email);

  return json({ exists });
};
