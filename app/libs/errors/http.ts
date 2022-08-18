export class HttpValidationError extends Response {
  constructor(payload: any) {
    super(JSON.stringify(payload), {
      status: 400,
      headers: { "Content-Type": "application/json; charset=utf-8" },
    });
  }
}
