import type { ActionFunction } from "@remix-run/server-runtime";
import { json } from "@remix-run/server-runtime";
import { container } from "~/models/container";
import { StudentController } from "~/models/user/web/student.controller";
import { ensureMethod } from "~/libs/web-controller/ensure-method";

export type ActionRequestData = {
  email: string;
};

export const action: ActionFunction = async ({ request }) => {
  ensureMethod("POST", request);
  const requestData = (await request.json()) as ActionRequestData;

  const exists = await container
    .get<StudentController>(StudentController)
    .checkEmailExists(requestData.email);

  return json({ exists });
};
