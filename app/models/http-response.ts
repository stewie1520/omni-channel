import { json } from "@remix-run/node";

export abstract class HttpResponse extends Error {
  protected constructor(
    public status: number,
    public message: string,
    public body: any
  ) {
    super(message);
  }

  toJson() {
    return json(
      {
        error: this.message,
        status: this.status,
        body: this.body,
      },
      {
        status: this.status,
      }
    );
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
