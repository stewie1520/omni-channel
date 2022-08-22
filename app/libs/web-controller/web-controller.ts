import type * as yup from "yup";
import { HttpBadRequestResponse } from "~/models/http-response";
import { injectable } from "inversify";

@injectable()
export abstract class WebController {
  validate(dto: any, schema: yup.AnySchema): Promise<void> {
    return schema.validate(dto).catch((err) => {
      throw new HttpBadRequestResponse(err.message, err.errors);
    });
  }
}
