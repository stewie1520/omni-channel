import { json } from "@remix-run/node";

enum ApplicationCode {
  UNKNOWN = "UNKNOWN",
  SESSION_EXPIRED = "SESSION_EXPIRED",
}

export abstract class HttpResponse extends Error {
  protected constructor(
    public status: number,
    public message: string,
    public body: any,
    public applicationCode: ApplicationCode = ApplicationCode.UNKNOWN
  ) {
    super(message);
  }

  toJson() {
    return json(
      {
        error: this.message,
        status: this.status,
        body: this.body,
        applicationCode: this.applicationCode,
      },
      {
        status: this.status,
      }
    );
  }
}

export class HttpSessionExpired extends HttpResponse {
  constructor() {
    super(401, "Session expired", {}, ApplicationCode.SESSION_EXPIRED);
  }
}

export class HttpNotFoundResponse extends HttpResponse {
  constructor(message: string, body: any) {
    super(404, message, body);
  }
}

export class HttpBadRequestResponse extends HttpResponse {
  constructor(message: string, body: any) {
    super(400, message, body);
  }
}

export class HttpInternalServerErrorResponse extends HttpResponse {
  constructor(message: string, body: any) {
    super(500, message, body);
  }
}
