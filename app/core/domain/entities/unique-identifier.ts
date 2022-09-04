import { Identifier } from "./identifier";
import { nanoid } from "nanoid";

export class UniqueIdentifier extends Identifier<string | number> {
  constructor(id?: string | number) {
    super(id || nanoid());
  }

  toString() {
    return this.value.toString();
  }
}
