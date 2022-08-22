import { HttpNotFoundResponse } from "~/models/http-response";

export const ensureMethod = (method: "POST" | "PATCH" | "PUT" | "GET" | "DELETE", request: Request) => {
  if (request.method !== "POST") {
    throw new HttpNotFoundResponse("Method not allowed", { method: request.method }).toJson();
  }
}
